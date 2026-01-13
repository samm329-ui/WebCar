import InfiniteMenu from './InfiniteMenu';

const items = [
    {
      id: "1",
      image: "https://picsum.photos/seed/g1/600/900",
      link: "#",
      title: "Custom Builds",
      description: "Tailored to your vision",
      hint: "car modification"
    },
    {
      id: "2",
      image: "https://picsum.photos/seed/g2/800/800",
      link: "#",
      title: "Engine Tuning",
      description: "Unleashing peak performance",
      hint: "custom engine"
    },
    {
      id: "3",
      image: "https://picsum.photos/seed/g3/700/700",
      link: "#",
      title: "Detailing",
      description: "Pristine, flawless finish",
      hint: "car detailing"
    },
    {
      id: "4",
      image: "https://picsum.photos/seed/g4/800/600",
      link: "#",
      title: "Suspension",
      description: "Precision handling, smooth ride",
      hint: "car suspension"
    },
    {
      id: "5",
      image: "https://picsum.photos/seed/g5/600/800",
      link: "#",
      title: "Interior Work",
      description: "Luxury and comfort redefined",
      hint: "car interior"
    },
    {
      id: "6",
      image: "https://picsum.photos/seed/g6/800/600",
      link: "#",
      title: "Our Workshop",
      description: "Where engineering meets art",
      hint: "auto workshop"
    },
     {
      id: "7",
      image: "https://picsum.photos/seed/g7/600/900",
      link: "#",
      title: "Classic Restorations",
      description: "Bringing history to life",
      hint: "classic car"
    },
    {
      id: "8",
      image: "https://picsum.photos/seed/g8/900/600",
      link: "#",
      title: "Wheel & Tire",
      description: "The foundation of performance",
      hint: "custom wheels"
    }
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-primary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-5xl tracking-wider mb-12">Gallery</h2>
        <div style={{ height: '600px', position: 'relative' }}>
          <InfiniteMenu items={items}/>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
