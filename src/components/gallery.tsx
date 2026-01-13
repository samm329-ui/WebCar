import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const galleryImages = [
    { src: "https://picsum.photos/seed/g1/800/600", alt: "Car modification", hint: "car modification" },
    { src: "https://picsum.photos/seed/g2/600/800", alt: "Workshop action shot", hint: "auto workshop" },
    { src: "https://picsum.photos/seed/g3/800/800", alt: "Before and after detailing", hint: "car detailing" },
    { src: "https://picsum.photos/seed/g4/800/600", alt: "Custom engine work", hint: "custom engine" },
    { src: "https://picsum.photos/seed/g5/600/800", alt: "Suspension upgrade", hint: "car suspension" },
    { src: "https://picsum.photos/seed/g6/800/600", alt: "Interior customization", hint: "car interior" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-5xl tracking-wider text-center mb-12">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-lg">
                  <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={image.hint}/>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-4xl bg-transparent border-0">
                <Image src={image.src} alt={image.alt} width={1200} height={900} className="w-full h-auto rounded-lg" data-ai-hint={image.hint}/>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
