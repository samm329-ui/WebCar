import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Car, Twitter, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <div>
                <h2 className="font-headline text-5xl tracking-wider">Contact Us</h2>
                <p className="text-foreground/80 mt-2">Get in touch for quotes, services, and inquiries.</p>
            </div>
            <div>
                <h3 className="font-headline text-xl tracking-wider">Operating Hours</h3>
                <p className="text-foreground/80">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-foreground/80">Sat: 10:00 AM - 4:00 PM</p>
            </div>
             <div>
                <h3 className="font-headline text-xl tracking-wider">Address</h3>
                <p className="text-foreground/80">123 Performance Lane, Velocity City, 45281</p>
            </div>
            <div className="flex gap-4">
                <Twitter className="cursor-pointer hover:text-accent-foreground transition-colors"/>
                <Instagram className="cursor-pointer hover:text-accent-foreground transition-colors"/>
                <Car className="cursor-pointer hover:text-accent-foreground transition-colors"/>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <Input placeholder="Name" className="bg-primary/30 border-primary/50" />
            <Input placeholder="Phone" type="tel" className="bg-primary/30 border-primary/50" />
            <Input placeholder="Email" type="email" className="bg-primary/30 border-primary/50" />
            <Input placeholder="Service Type" className="bg-primary/30 border-primary/50" />
            <Textarea placeholder="Message" className="bg-primary/30 border-primary/50 min-h-32" />
            <Button type="submit" className="font-body font-semibold uppercase tracking-widest text-xs w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
