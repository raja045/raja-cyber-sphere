import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Phone, FileText, MessageSquare, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
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

const Contact = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  // Dialog / OTP state for phone verification
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  // owner's phone (hidden until user verifies)
  const ownerPhone = "+17866273359";
  const [userPhone, setUserPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || '';

  const contactCards = [
    {
      icon: Mail,
      title: "Email",
      content: "sraja456@outlook.com",
      href: "mailto:sraja456@outlook.com",
    },
    {
      icon: Phone,
      title: "Phone / Message",
      content: "Verify to view",
      href: undefined,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      content: "Connect with me",
      href: "https://linkedin.com/in/raja045",
    },
    {
      icon: FileText,
      title: "Download Resume",
      content: "View my experience",
      href: "/resume.pdf",
      download: true,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
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
  {/* Keep contact cards visible by default to avoid them being hidden before the intersection observer fires */}
  <div ref={elementRef} className={`animate-on-scroll visible mb-16`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              // For the Phone / Message card, open an OTP dialog instead of navigating away
              if (card.title === "Phone / Message") {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      // open dialog to enter visitor's phone for OTP
                      setUserPhone("");
                      setIsPhoneDialogOpen(true);
                      setOtp("");
                      setGeneratedOtp(null);
                      setOtpSent(false);
                      setVerificationMessage(null);
                      setIsVerified(false);
                    }}
                    className="group text-left w-full"
                  >
                    <Card className="glass-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                          <p className={`text-sm ${card.download ? "text-primary" : "text-muted-foreground"}`}>
                            {card.content}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </button>
                );
              }

              return (
                <a
                  key={index}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  download={card.download}
                  className="group"
                >
                  <Card className="glass-card p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                        <p className={`text-sm ${card.download ? "text-primary" : "text-muted-foreground"}`}>
                          {card.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>

        {/* Phone OTP Dialog (simulated) */}
        <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify your phone</DialogTitle>
              <DialogDescription>
                Enter your mobile number to receive a one-time PIN. Once you verify your number, the contact's phone will be revealed.
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
                    <p className="text-sm text-muted-foreground">Tap "Send OTP" to receive a PIN (simulated).</p>
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
                  <p className="text-lg font-medium mb-2">Contact's phone number</p>
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
              <a href="mailto:sraja456@outlook.com" className="group">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground transition-all duration-300 hover:scale-105"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Send a Message
                </Button>
              </a>

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
