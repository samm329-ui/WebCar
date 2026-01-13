"use client";

import { useState, useRef, useEffect } from 'react';
import { FRAME_COUNT, getFrameImage, SCROLL_MULTIPLIER, TEXT_SECTIONS } from '@/config/animation';
import { useToast } from "@/hooks/use-toast";
import { Loader } from './ui/loader';
import { cn } from '@/lib/utils';

const calculateOpacity = (progress: number, start: number, end: number): number => {
    if (progress < start || progress > end) return 0;
    
    const sectionDuration = end - start;
    const fadeInDuration = sectionDuration * 0.2;
    const fadeOutDuration = sectionDuration * 0.2;

    const fadeInEnd = start + fadeInDuration;
    const fadeOutStart = end - fadeOutDuration;

    if (progress < fadeInEnd) {
        return (progress - start) / fadeInDuration;
    }

    if (progress > fadeOutStart) {
        return (end - progress) / fadeOutDuration;
    }

    return 1;
};

const drawCoverImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let sx, sy, sWidth, sHeight;

    if (imgRatio > canvasRatio) {
        sHeight = imgHeight;
        sWidth = imgHeight * canvasRatio;
        sx = (imgWidth - sWidth) / 2;
        sy = 0;
    } else {
        sWidth = imgWidth;
        sHeight = imgWidth / canvasRatio;
        sx = 0;
        sy = (imgHeight - sHeight) / 2;
    }
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
}


export default function ScrollHero() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const animationFrameId = useRef<number>();
  const currentFrame = useRef(0);
  const targetFrame = useRef(0);

  useEffect(() => {
    const preloadImages = async () => {
      let loadedCount = 0;
      const imagePromises = Array.from({ length: FRAME_COUNT }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = getFrameImage(i);
          img.onload = () => {
            loadedCount++;
            setLoadProgress(loadedCount / FRAME_COUNT);
            resolve(img);
          };
          img.onerror = () => reject(new Error(`Failed to load image ${i}`));
        });
      });

      try {
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load images", error);
        toast({
          title: "Error",
          description: "Failed to load animation assets. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    preloadImages();
  }, [toast]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const rect = scrollRef.current.getBoundingClientRect();
        const scrollableHeight = scrollRef.current.scrollHeight - window.innerHeight;
        const currentProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
        setProgress(currentProgress);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loading || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;
    
    const setCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    }

    const render = () => {
      targetFrame.current = progress * (FRAME_COUNT - 1);
      currentFrame.current += (targetFrame.current - currentFrame.current) * 0.1;
      const frameIndex = Math.round(currentFrame.current);
      
      const img = images[frameIndex];
      if (img) {
          drawCoverImage(context, img);
      }
      animationFrameId.current = requestAnimationFrame(render);
    };

    setCanvasSize();
    render();

    window.addEventListener('resize', setCanvasSize);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [loading, images, progress]);

  const initialFadeOpacity = Math.max(0, 1 - progress / 0.05);

  return (
    <div ref={scrollRef} style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background">
            <Loader />
            <p className="mt-4 font-headline text-lg tracking-widest">
              Loading Experience...
            </p>
            <div className="w-48 h-1 bg-primary/20 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-foreground rounded-full transition-all duration-300" style={{width: `${loadProgress * 100}%`}}></div>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
        <div 
          className="absolute inset-0 z-10 bg-background/80 pointer-events-none"
          style={{ opacity: initialFadeOpacity, transition: 'opacity 0.3s ease-out' }}
        ></div>
        <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {TEXT_SECTIONS.map((section) => (
            <div
              key={section.id}
              className={cn("absolute w-full max-w-4xl p-8 pointer-events-none flex flex-col justify-center", section.className)}
              style={{ opacity: calculateOpacity(progress, section.start, section.end), transition: 'opacity 0.2s ease-out', top: '50%', transform: 'translateY(-50%)' }}
            >
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] leading-none whitespace-nowrap">
                {section.title}
              </h1>
              <p className="mt-4 font-body text-lg md:text-xl text-foreground/80 leading-relaxed tracking-wider">
                {section.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
