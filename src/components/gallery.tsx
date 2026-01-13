import Masonry from './masonry';

const items = [
    {
      id: "1",
      img: "https://picsum.photos/seed/g1/600/900",
      url: "#",
      height: 400,
      hint: "car modification"
    },
    {
      id: "2",
      img: "https://picsum.photos/seed/g2/600/750",
      url: "#",
      height: 250,
      hint: "auto workshop"
    },
    {
      id: "3",
      img: "https://picsum.photos/seed/g3/600/800",
      url: "#",
      height: 600,
      hint: "car detailing"
    },
    {
      id: "4",
      img: "https://picsum.photos/seed/g4/800/600",
      url: "#",
      height: 300,
      hint: "custom engine"
    },
    {
      id: "5",
      img: "https://picsum.photos/seed/g5/600/800",
      url: "#",
      height: 500,
      hint: "car suspension"
    },
    {
      id: "6",
      img: "https://picsum.photos/seed/g6/800/600",
      url: "#",
      height: 350,
      hint: "car interior"
    },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-primary/10">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-5xl tracking-wider text-center mb-12">Gallery</h2>
        <Masonry
            items={items}
            scaleOnHover={true}
            blurToFocus={true}
        />
      </div>
    </section>
  );
};

export default Gallery;
