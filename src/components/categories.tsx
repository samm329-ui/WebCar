'use client';
import { Card, CardTitle } from "./ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from "react";


const categories = [
    "Maintenance Service Parts", "Filters", "Windscreen Cleaning System", "Car Accessories",
    "Lighting", "Control Cables", "Brake System", "Bearings", "Clutch System",
    "Electric Components", "Engine", "Engine Cooling System", "Exhaust System",
    "Air Conditioning", "Fuel Supply System", "Gaskets and Sealing Rings",
    "Ignition and Glowplug System", "Interior and Comfort", "Body", "Oils and Fluids",
    "Pipes and Hoses", "Repair Kits", "Sensors, Relays and Control Units", "Steering",
    "Suspension and Arms", "Towbar Parts", "Transmission", "Trims", "Tyres and Alloys", "Universal"
];

const Categories = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi]);

    return (
        <section id="categories" className="py-24 bg-primary/10">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-5xl tracking-wider text-center mb-12">Product Categories</h2>
                
                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {categories.map(category => (
                        <Card key={category} className="bg-primary/30 border-primary/50 h-32 flex items-center justify-center p-4 transition-all hover:outline hover:outline-accent hover:-translate-y-1 cursor-pointer">
                            <CardTitle className="font-body text-sm font-medium tracking-wide text-center">{category}</CardTitle>
                        </Card>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {categories.map(category => (
                                <div key={category} className="flex-grow-0 flex-shrink-0 basis-1/2 sm:basis-1/3 pl-4">
                                     <Card className="bg-primary/30 border-primary/50 h-32 flex items-center justify-center p-4">
                                        <CardTitle className="font-body text-sm font-medium tracking-wide text-center">{category}</CardTitle>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={scrollPrev}><ChevronLeft /></button>
                        <button onClick={scrollNext}><ChevronRight /></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Categories;
