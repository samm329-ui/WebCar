import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wrench, Zap, Car, Gauge, Sparkles } from "lucide-react";

const services = [
    { title: 'Maintenance', icon: Wrench },
    { title: 'Performance Tuning', icon: Zap },
    { title: 'Custom Modifications', icon: Car },
    { title: 'Diagnostics', icon: Gauge },
    { title: 'Detailing', icon: Sparkles },
];

const Services = () => {
    return (
        <section id="services-products" className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
                        <h2 className="font-headline text-4xl md:text-5xl tracking-wider">OUR SERVICES & PRODUCTS</h2>
                        <p className="text-foreground/80 leading-relaxed max-w-lg">
                            Engineered for peak performance and reliability. We provide a comprehensive range of services, from routine maintenance to bespoke modifications, ensuring your vehicle operates at its absolute best. Precision is our promise.
                        </p>
                        <Button className="font-body font-semibold uppercase tracking-widest text-xs w-fit">View All Services</Button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service) => (
                            <Card key={service.title} className="bg-primary/30 border-primary/50 text-center flex flex-col justify-center items-center p-4 md:p-6 aspect-square transition-all hover:bg-primary/50 hover:-translate-y-1">
                                <CardHeader className="p-0">
                                    <service.icon className="mx-auto h-6 w-6 md:h-8 md:w-8 text-foreground" />
                                </CardHeader>
                                <CardContent className="p-0 mt-3 md:mt-4">
                                    <CardTitle className="font-body text-xs md:text-sm font-medium tracking-wide">{service.title}</CardTitle>
                                </CardContent>
                            </Card>
                        ))}
                         <Card className="bg-primary/30 border-primary/50 text-center flex flex-col justify-center items-center p-4 md:p-6 aspect-square transition-all hover:bg-primary/50 hover:-translate-y-1 col-span-2 lg:col-span-3">
                                <CardHeader className="p-0">
                                   
                                </CardHeader>
                                <CardContent className="p-0 mt-3 md:mt-4">
                                    <CardTitle className="font-body text-xs md:text-sm font-medium tracking-wide">And much more...</CardTitle>
                                </CardContent>
                            </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services;
