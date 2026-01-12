import { PlaceHolderImages } from '@/lib/placeholder-images';

export const FRAME_COUNT = 240;
export const SCROLL_MULTIPLIER = 5; // Determines scroll height: 5 * 100vh

export const getFrameImage = (index: number): string => {
  const imageId = `sequence-${(index + 1).toString().padStart(3, '0')}`;
  const image = PlaceHolderImages.find(img => img.id === imageId);
  return image ? image.imageUrl : '';
};

export type TextSection = {
  id: number;
  start: number;
  end: number;
  title: string;
  subtitle: string;
  className: string;
};

export const TEXT_SECTIONS: TextSection[] = [
  {
    id: 1,
    start: 0.05,
    end: 0.25,
    title: 'Design in Motion',
    subtitle: 'A dynamic visual journey of automotive excellence.',
    className: 'top-1/4 left-1/2 -translate-x-1/2 text-center',
  },
  {
    id: 2,
    start: 0.3,
    end: 0.5,
    title: 'Sculpted by Speed',
    subtitle: 'Every line and curve engineered for performance.',
    className: 'top-1/3 left-12',
  },
  {
    id: 3,
    start: 0.55,
    end: 0.75,
    title: 'The Art of the Drive',
    subtitle: 'Where luxury and power converge.',
    className: 'top-1/2 right-12 text-right',
  },
  {
    id: 4,
    start: 0.8,
    end: 0.98,
    title: 'Experience the Apex',
    subtitle: 'Redefining the boundaries of performance.',
    className: 'bottom-1/4 left-1/2 -translate-x-1/2 text-center',
  },
];
