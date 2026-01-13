import { Car, Twitter, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-primary/20 py-12">
            <div className="container mx-auto px-4 text-center text-foreground/60">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <Car />
                    <span className="font-headline text-xl tracking-widest">ScrollMotion</span>
                </div>
                <div className="flex justify-center gap-6 mb-6 font-body text-sm">
                    <a href="#services-products" className="hover:text-foreground">Services</a>
                    <a href="#gallery" className="hover:text-foreground">Gallery</a>
                    <a href="#about" className="hover:text-foreground">About</a>
                    <a href="#contact" className="hover:text-foreground">Contact</a>
                </div>
                <div className="flex justify-center gap-4 mb-8">
                     <Twitter className="cursor-pointer hover:text-foreground transition-colors"/>
                     <Instagram className="cursor-pointer hover:text-foreground transition-colors"/>
                </div>
                <div className="text-xs space-x-4">
                    <span>© {new Date().getFullYear()} ScrollMotion Automotive. All Rights Reserved.</span>
                    <a href="#" className="hover:text-foreground">Privacy Policy</a>
                    <a href="#" className="hover:text-foreground">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
