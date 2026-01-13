'use client';
import { Card, CardTitle } from "./ui/card";

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
    return (
        <section id="categories" className="py-24 bg-primary/10">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-4xl md:text-5xl tracking-wider text-center mb-12">Product Categories</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {categories.map(category => (
                        <Card key={category} className="bg-primary/30 border-primary/50 h-32 flex items-center justify-center p-4 transition-all hover:outline hover:outline-accent hover:-translate-y-1 cursor-pointer">
                            <CardTitle className="font-body text-sm font-medium tracking-wide text-center">{category}</CardTitle>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories;
