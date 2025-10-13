import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Phone, FileText, MessageSquare, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const { elementRef, isVisible } = useScrollAnimation();

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
      content: "+17866273359",
      href: "https://wa.me/1234567890",
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
        <div ref={elementRef} className={`animate-on-scroll ${isVisible ? 'visible' : ''} mb-16`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
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
                        <p className={`text-sm ${card.title === "Download Resume" ? "text-primary" : "text-muted-foreground"}`}>
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
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Send a Message
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-border hover:bg-card transition-all duration-300 hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Call
              </Button>
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
