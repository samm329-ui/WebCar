import { PlaceHolderImages } from '@/lib/placeholder-images';

export const FRAME_COUNT = 148;
export const SCROLL_MULTIPLIER = 5; // Determines scroll height: 5 * 100vh

export const getFrameImage = (index: number): string => {
  const imageId = `sequence-${index.toString().padStart(4, '0')}`;
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
    title: 'Precision in Motion',
    subtitle: 'Experience seamless animation driven by your scroll.',
    className: 'top-1/4 left-1/2 -translate-x-1/2 text-center',
  },
  {
    id: 2,
    start: 0.3,
    end: 0.5,
    title: 'Engineered for Performance',
    subtitle: 'High-performance canvas rendering ensures a smooth journey.',
    className: 'top-1/3 left-12',
  },
  {
    id: 3,
    start: 0.55,
    end: 0.75,
    title: 'A Story in Every Frame',
    subtitle: 'Unveiling details with every pixel.',
    className: 'top-1/2 right-12 text-right',
  },
  {
    id: 4,
    start: 0.8,
    end: 0.98,
    title: 'ScrollMotion Hero',
    subtitle: 'Redefining interactive web experiences.',
    className: 'bottom-1/4 left-1/2 -translate-x-1/2 text-center',
  },
];
