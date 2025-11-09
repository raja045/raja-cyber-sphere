import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Phone, CreditCard, MessageSquare, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import { MapPin, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef } = useScrollAnimation();

  // OTP state
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const ownerPhone = "+17866273359";
  const [userPhone, setUserPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || '';

  // Business card state
  const [isBusinessCardOpen, setIsBusinessCardOpen] = useState(false);
  const businessCardRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { toast } = useToast();

  // Contact form validation schema with enhanced security
  const contactFormSchema = z.object({
    name: z.string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
    email: z.string()
      .trim()
      .email("Invalid email address")
      .max(255, "Email must be less than 255 characters"),
    message: z.string()
      .trim()
      .min(10, "Message must be at least 10 characters")
      .max(2000, "Message must be less than 2000 characters"),
    website: z.string().max(0).optional(), // Honeypot field - must be empty
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "", // Honeypot field
    },
  });

  const onSubmitContactForm = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: values.name,
          email: values.email,
          message: values.message,
          website: values.website, // Include honeypot for bot detection
        },
      });

      if (error) {
        // Check if it's a rate limit error
        if (error.message?.includes("Too many submissions") || error.message?.includes("Rate limit")) {
          throw new Error("You've reached the submission limit. Please try again later.");
        }
        throw error;
      }

      // Check if the response indicates rate limiting or other errors
      if (data && !data.success) {
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      form.reset();
      setIsContactFormOpen(false);
    } catch (error: any) {
      console.error("Error sending message:", error);
      
      // Show user-friendly error messages
      const errorMessage = error.message?.includes("Too many submissions") || 
                          error.message?.includes("submission limit") ||
                          error.message?.includes("Rate limit")
        ? error.message
        : "Failed to send message. Please try again or email me directly.";
      
      toast({
        title: "Unable to send message",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const downloadBusinessCard = async () => {
    if (businessCardRef.current) {
      const canvas = await html2canvas(businessCardRef.current, {
        scale: 2,
        backgroundColor: '#000000',
      });
      const link = document.createElement('a');
      link.download = 'raja-business-card.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Raja Sekhar
TITLE:Cybersecurity & Platform Engineering Expert
EMAIL:sraja456@outlook.com
TEL:+17866273359
URL:${window.location.origin}
URL;type=LinkedIn:https://linkedin.com/in/raja045
END:VCARD`;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div ref={titleRef} className={`text-center mb-16 animate-on-scroll ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss platform engineering solutions? I'd love to hear about your
            infrastructure challenges and explore how we can build something scalable
            together.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div ref={elementRef} className="animate-on-scroll visible mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Email Card */}
            <a href="mailto:sraja456@outlook.com" className="group">
              <Card className="glass-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">sraja456@outlook.com</p>
                  </div>
                </div>
              </Card>
            </a>

            {/* Phone Card */}
            <button
              onClick={() => {
                setUserPhone("");
                setIsPhoneDialogOpen(true);
                setOtp("");
                setOtpSent(false);
                setVerificationMessage(null);
                setIsVerified(false);
              }}
              className="group text-left w-full"
            >
              <Card className="glass-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Phone / Message</h3>
                    <p className="text-sm text-muted-foreground">Verify to view</p>
                  </div>
                </div>
              </Card>
            </button>

            {/* LinkedIn Card */}
            <a href="https://linkedin.com/in/raja045" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="glass-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">Connect with me</p>
                  </div>
                </div>
              </Card>
            </a>

            {/* Business Card */}
            <button
              onClick={() => setIsBusinessCardOpen(true)}
              className="group text-left w-full"
            >
              <Card className="glass-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Business Card</h3>
                    <p className="text-sm text-primary">Save my contact</p>
                  </div>
                </div>
              </Card>
            </button>
          </div>
        </div>

        {/* Phone OTP Dialog */}
        <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify your phone</DialogTitle>
              <DialogDescription>
                Enter your mobile number to receive a one-time PIN. Once you verify your number, the contact phone will be revealed.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              {!isVerified ? (
                <>
                  <Input
                    placeholder="Your mobile number (e.g. +1234567890)"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />

                  {!otpSent ? (
                    <p className="text-sm text-muted-foreground">Tap Send OTP to receive a PIN (simulated).</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">An OTP has been sent to {userPhone}.</p>
                  )}

                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  {verificationMessage && (
                    <p className="text-sm">{verificationMessage}</p>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Contact phone number</p>
                  <p className="text-xl font-semibold mb-4">{ownerPhone}</p>
                  <div className="flex justify-center gap-2">
                    <Button size="sm" onClick={() => { navigator.clipboard?.writeText(ownerPhone); setVerificationMessage('Number copied to clipboard'); }}>
                      Copy
                    </Button>
                    <a href={`https://wa.me/${ownerPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline">Open WhatsApp</Button>
                    </a>
                  </div>
                  {verificationMessage && <p className="mt-2 text-sm">{verificationMessage}</p>}
                </div>
              )}
            </div>

            <DialogFooter>
              <div className="flex items-center gap-2">
                {!isVerified && (
                  <>
                    <Button
                      size="sm"
                      onClick={async () => {
                        if (!userPhone) {
                          setVerificationMessage('Please enter your mobile number first.');
                          return;
                        }
                        try {
                          const res = await fetch(`${API_BASE}/api/send-otp`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ phone: userPhone }),
                          });
                          const data = await res.json();
                          if (!res.ok) throw new Error(data?.error || 'Failed to send OTP');
                          setOtpSent(true);
                          setVerificationMessage('OTP sent. Please check your SMS.');
                        } catch (err: any) {
                          setVerificationMessage(err.message || 'Failed to send OTP');
                        }
                      }}
                    >
                      Send OTP
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        if (!otpSent) {
                          setVerificationMessage('Please send an OTP first.');
                          return;
                        }
                        try {
                          const res = await fetch(`${API_BASE}/api/verify-otp`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ phone: userPhone, code: otp }),
                          });
                          const data = await res.json();
                          if (!res.ok) throw new Error(data?.error || 'Invalid OTP');
                          setVerificationMessage('Phone verified successfully!');
                          setIsVerified(true);
                        } catch (err: any) {
                          setVerificationMessage(err.message || 'Invalid OTP');
                        }
                      }}
                    >
                      Verify
                    </Button>
                  </>
                )}
              </div>
              <DialogClose asChild>
                <Button size="sm" variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Business Card Dialog */}
        <Dialog open={isBusinessCardOpen} onOpenChange={setIsBusinessCardOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Business Card</DialogTitle>
              <DialogDescription>
                Download my business card or scan the QR code on your mobile device
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Business Card Preview */}
              <div ref={businessCardRef}>
                <Card className="bg-gradient-to-br from-card via-card to-primary/5 p-8 border-2 border-primary/20">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Raja Sekhar
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                      Cybersecurity & Platform Engineering Expert
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-3" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">sraja456@outlook.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Blog</p>
                        <p className="font-medium">medium.com/@nakamotosecurity</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">LinkedIn</p>
                        <p className="font-medium">linkedin.com/in/raja045</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <p className="font-medium">rajareddy.site</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">Miami, Florida.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground italic">
                      Securing the digital frontier, one project at a time.
                    </p>
                  </div>
                </Card>
              </div>

              {/* QR Code for Mobile */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG 
                    value={vCardData}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Scan with your phone to save contact
                </p>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button onClick={downloadBusinessCard} className="w-full sm:w-auto">
                Download as Image
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-auto">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Contact Form Dialog */}
        <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send me a message</DialogTitle>
              <DialogDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitContactForm)} className="space-y-4">
                {/* Honeypot field - hidden from users but visible to bots */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          autoComplete="off"
                          tabIndex={-1}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project or inquiry..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Call to Action Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Card className="glass-card p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setIsContactFormOpen(true)}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Send a Message
              </Button>

              <a
                href="https://cal.com/raja045"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-card transition-all duration-300 hover:scale-105"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Call
                </Button>
              </a>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p>© 2025 Raja. Securing the digital frontier, one project at a time.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
