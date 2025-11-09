import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const MAX_SUBMISSIONS_PER_HOUR = 3;
const RATE_LIMIT_WINDOW_HOURS = 1;

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactRequest = await req.json();

    console.log("Received contact form submission:", { name, email });

    // Initialize Supabase client with service role key for rate limiting
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit - count submissions from this email in the last hour
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
    
    const { data: recentSubmissions, error: countError } = await supabase
      .from("contact_submissions")
      .select("id")
      .eq("email", email)
      .gte("submitted_at", oneHourAgo);

    if (countError) {
      console.error("Error checking rate limit:", countError);
      throw new Error("Failed to verify submission eligibility");
    }

    if (recentSubmissions && recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
      console.log(`Rate limit exceeded for email: ${email}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Too many submissions. Please try again later. Limit: ${MAX_SUBMISSIONS_PER_HOUR} submissions per hour.` 
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Get client info for logging
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Send email to the owner
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["sraja456@outlook.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This message was sent from your portfolio contact form.</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Track this submission for rate limiting
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        email,
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (insertError) {
      console.error("Error tracking submission:", insertError);
      // Don't fail the request if tracking fails
    }

    // Clean up old submissions (fire and forget)
    supabase.rpc("cleanup_old_contact_submissions").then(() => {
      console.log("Cleaned up old contact submissions");
    });

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
