import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Github, Linkedin, Twitter, Download, ExternalLink } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const [showQR, setShowQR] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:raja@example.com", label: "Email" },
  ];

  const publicProfiles = [
    { name: "HackTheBox", href: "https://hackthebox.com", icon: ExternalLink },
    { name: "TryHackMe", href: "https://tryhackme.com", icon: ExternalLink },
    { name: "VulnHub", href: "https://vulnhub.com", icon: ExternalLink },
  ];

  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Raja
TITLE:Cybersecurity Researcher & Designer
EMAIL:raja@example.com
URL:https://github.com
URL:https://linkedin.com
NOTE:Securing the digital frontier
END:VCARD`;

  const handleDownloadVCard = () => {
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "raja-contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    toast({
      title: "vCard Downloaded",
      description: "Contact card saved successfully",
    });
  };

  const handleNotifyMe = () => {
    toast({
      title: "Notification Sent",
      description: "I'll get back to you soon!",
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Ready to collaborate on innovative cybersecurity solutions
          </p>
        </div>

        <div ref={elementRef} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <Card className="glass-card p-8 max-w-2xl mx-auto">
            <div className="text-center space-y-6">
              <p className="text-lg text-muted-foreground">
                Interested in discussing cybersecurity projects, research opportunities, or potential collaborations? 
                I'd love to hear from you!
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  onClick={handleNotifyMe}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground cyber-glow transition-all duration-300 hover:scale-105"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Notify Me
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleDownloadVCard}
                  className="border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download vCard
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setShowQR(true)}
                  className="border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  Show QR Code
                </Button>
              </div>

              <div className="pt-8 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">Connect with me on</p>
                  <div className="flex gap-4 justify-center">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 cyber-glow"
                          aria-label={link.label}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-4">Public Profiles</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {publicProfiles.map((profile, index) => (
                      <a
                        key={index}
                        href={profile.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105 text-sm"
                      >
                        {profile.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p>© 2025 Raja. Securing the digital frontier, one project at a time.</p>
        </div>
      </div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="p-4 bg-white rounded-lg">
              <QRCodeSVG value={vCardData} size={200} level="H" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan this code with your phone to download contact details
            </p>
            <Button onClick={handleDownloadVCard} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download vCard Instead
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;
