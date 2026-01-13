import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Car, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <div className="text-center md:text-left">
                <h2 className="font-headline text-4xl md:text-5xl tracking-wider">Contact Us</h2>
                <p className="text-foreground/80 mt-2">Get in touch for quotes, services, and inquiries.</p>
            </div>
            
            <div className="space-y-4 text-center md:text-left">
                 <a href="tel:+1234567890" className="flex items-center justify-center md:justify-start gap-3 group">
                    <Phone className="w-5 h-5 text-foreground/80 group-hover:text-accent-foreground transition-colors" />
                    <span className="text-foreground/80 group-hover:text-accent-foreground transition-colors">(123) 456-7890</span>
                </a>
                 <a href="mailto:contact@scrollmotion.com" className="flex items-center justify-center md:justify-start gap-3 group">
                    <Mail className="w-5 h-5 text-foreground/80 group-hover:text-accent-foreground transition-colors" />
                    <span className="text-foreground/80 group-hover:text-accent-foreground transition-colors">contact@scrollmotion.com</span>
                </a>
                <a href="#" className="flex items-center justify-center md:justify-start gap-3 group">
                    <MapPin className="w-5 h-5 text-foreground/80 group-hover:text-accent-foreground transition-colors" />
                    <span className="text-foreground/80 group-hover:text-accent-foreground transition-colors">123 Performance Lane, Velocity City, 45281</span>
                </a>
            </div>

            <div>
                <h3 className="font-headline text-xl tracking-wider text-center md:text-left">Operating Hours</h3>
                <p className="text-foreground/80 text-center md:text-left">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-foreground/80 text-center md:text-left">Sat: 10:00 AM - 4:00 PM</p>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
                <Twitter className="cursor-pointer hover:text-accent-foreground transition-colors"/>
                <Instagram className="cursor-pointer hover:text-accent-foreground transition-colors"/>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <Input placeholder="Name" className="bg-primary/30 border-primary/50 h-12" />
            <Input placeholder="Phone" type="tel" className="bg-primary/30 border-primary/50 h-12" />
            <Input placeholder="Email" type="email" className="bg-primary/30 border-primary/50 h-12" />
            <Input placeholder="Service Type" className="bg-primary/30 border-primary/50 h-12" />
            <Textarea placeholder="Message" className="bg-primary/30 border-primary/50 min-h-32" />
            <Button type="submit" className="font-body font-semibold uppercase tracking-widest text-xs w-full h-12 md:sticky md:bottom-4">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
