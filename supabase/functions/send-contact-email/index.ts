import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Security headers
const securityHeaders = {
  ...corsHeaders,
  "Content-Security-Policy": "default-src 'self'",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
};

// Rate limiting configuration
const MAX_SUBMISSIONS_PER_HOUR = 3;
const MAX_SUBMISSIONS_PER_IP_HOUR = 5; // Slightly higher for IP (multiple people behind same IP)
const RATE_LIMIT_WINDOW_HOURS = 1;

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .substring(0, 2000); // Max length limit
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: securityHeaders });
  }

  try {
    const { name, email, message, website }: ContactRequest = await req.json();

    // Honeypot check - if filled, it's likely a bot
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered - potential bot submission");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid submission" 
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...securityHeaders,
          },
        }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = sanitizeInput(message);

    // Basic validation
    if (!sanitizedName || sanitizedName.length < 1 || sanitizedName.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid name" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...securityHeaders },
        }
      );
    }

    if (!sanitizedEmail || !sanitizedEmail.includes("@") || sanitizedEmail.length > 255) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...securityHeaders },
        }
      );
    }

    if (!sanitizedMessage || sanitizedMessage.length < 10 || sanitizedMessage.length > 2000) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid message length" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...securityHeaders },
        }
      );
    }

    console.log("Received contact form submission:", { name: sanitizedName, email: sanitizedEmail });

    // Initialize Supabase client with service role key for rate limiting
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client info for logging
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Check rate limit - count submissions from this email in the last hour
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
    
    const { data: recentEmailSubmissions, error: emailCountError } = await supabase
      .from("contact_submissions")
      .select("id")
      .eq("email", sanitizedEmail)
      .gte("submitted_at", oneHourAgo);

    if (emailCountError) {
      console.error("Error checking email rate limit:", emailCountError);
      return new Response(
        JSON.stringify({ success: false, error: "Service temporarily unavailable" }),
        {
          status: 503,
          headers: { "Content-Type": "application/json", ...securityHeaders },
        }
      );
    }

    if (recentEmailSubmissions && recentEmailSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
      console.log(`Email rate limit exceeded: ${sanitizedEmail}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Too many submissions. Please try again later.` 
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...securityHeaders,
          },
        }
      );
    }

    // Check IP-based rate limit
    const { data: recentIpSubmissions, error: ipCountError } = await supabase
      .from("contact_submissions")
      .select("id")
      .eq("ip_address", ipAddress)
      .gte("submitted_at", oneHourAgo);

    if (ipCountError) {
      console.error("Error checking IP rate limit:", ipCountError);
      return new Response(
        JSON.stringify({ success: false, error: "Service temporarily unavailable" }),
        {
          status: 503,
          headers: { "Content-Type": "application/json", ...securityHeaders },
        }
      );
    }

    if (recentIpSubmissions && recentIpSubmissions.length >= MAX_SUBMISSIONS_PER_IP_HOUR) {
      console.log(`IP rate limit exceeded: ${ipAddress}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Too many submissions from your network. Please try again later.` 
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...securityHeaders,
          },
        }
      );
    }

    // Send email to the owner
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["sraja456@outlook.com"],
      replyTo: sanitizedEmail,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This message was sent from your portfolio contact form.</p>
        <p style="color: #666; font-size: 12px;">IP: ${ipAddress}</p>
      `,
    });

    console.log("Email sent successfully");

    // Track this submission for rate limiting
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        email: sanitizedEmail,
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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...securityHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    // Don't expose internal error details to users
    return new Response(
      JSON.stringify({ success: false, error: "Service temporarily unavailable. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...securityHeaders },
      }
    );
  }
};

serve(handler);
