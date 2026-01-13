import Image from "next/image";

const About = () => {
    return (
        <section id="about" className="py-24 bg-primary/10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="font-headline text-4xl md:text-5xl tracking-wider mb-6 text-center md:text-left">Precision Engineering. Unmatched Expertise.</h2>
                        <div className="space-y-6 text-foreground/80 leading-relaxed text-center md:text-left">
                            <p>We are not just mechanics; we are engineers and enthusiasts dedicated to unlocking the ultimate potential of every vehicle we touch. Our methodology is built on a foundation of precision, data-driven analysis, and an uncompromising commitment to quality.</p>
                            <p>From our state-of-the-art diagnostic tools to our meticulously calibrated equipment, every aspect of our workshop is designed for one purpose: to deliver unparalleled performance and reliability. We don't believe in guesswork, only in results.</p>
                        </div>
                    </div>
                    <div className="relative aspect-video rounded-lg overflow-hidden order-1 md:order-2">
                        <Image src="https://picsum.photos/seed/a1/1600/900" alt="Workshop interior" fill className="object-cover" data-ai-hint="mechanic workshop" />
                        <div className="absolute inset-0 bg-background/50"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;
