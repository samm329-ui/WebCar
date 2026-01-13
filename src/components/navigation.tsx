"use client";
import { useState, useEffect } from 'react';
import { Search, Car, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { Input } from './ui/input';

const NAV_LINKS = ["Services & Products", "Gallery", "About", "Contact"];

const SearchModal = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="icon">
        <Search />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[625px] bg-background/80 backdrop-blur-sm border-primary/50 !rounded-lg">
        <div className="p-4">
            <h2 className="font-headline text-2xl tracking-wider mb-4">Advanced Search</h2>
            <Input
              placeholder="Search parts, services, categories…"
              className="bg-primary/50 border-primary/80 placeholder:text-foreground/60"
            />
            <div className="mt-4 flex gap-4">
              <Button variant="outline" className="flex-1">Category</Button>
              <Button variant="outline" className="flex-1">Vehicle Type</Button>
              <Button variant="outline" className="flex-1">Brand</Button>
            </div>
        </div>
    </DialogContent>
  </Dialog>
);

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
       <Button variant="ghost" size="icon" className="md:hidden">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="bg-background/90 backdrop-blur-sm border-primary/50">
        <div className="flex flex-col items-center justify-center h-full gap-8">
            {NAV_LINKS.map(link => (
                <SheetClose key={link} asChild>
                    <a href={`#${link.toLowerCase().replace(/ & /g, '-')}`} className="font-body text-xl uppercase tracking-widest hover:text-foreground/80 transition-colors">{link}</a>
                </SheetClose>
            ))}
        </div>
    </SheetContent>
  </Sheet>
)


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-sm shadow-md",
      isScrolled ? "h-16" : "h-20"
    )}>
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
            <Car className="text-foreground" size={isScrolled ? 24 : 28} />
            <span className={cn("font-headline text-xl md:text-2xl tracking-widest transition-all", isScrolled ? "text-xl": "text-2xl")}>ScrollMotion</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
                <a key={link} href={`#${link.toLowerCase().replace(/ & /g, '-')}`} className="font-body text-sm uppercase tracking-widest hover:text-foreground/80 transition-colors">{link}</a>
            ))}
        </div>
        <div className="flex items-center gap-2">
            <SearchModal />
            <Button size={isScrolled ? "sm" : "default"} className="font-body font-semibold uppercase tracking-widest text-xs hidden md:inline-flex">Get Quote</Button>
            <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
