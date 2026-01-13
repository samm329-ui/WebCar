'use client';

import { useState, useRef, useEffect } from 'react';
import { FRAME_COUNT, getFrameImage, SCROLL_MULTIPLIER, TEXT_SECTIONS } from '@/config/animation';
import { useToast } from "@/hooks/use-toast";
import { Loader } from './ui/loader';
import { cn } from '@/lib/utils';

const AUTOPLAY_DURATION = 4000; // 4 seconds for the autoplay

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
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [hasAutoplayed, setHasAutoplayed] = useState(true); // Default to true, set to false on client

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const animationFrameId = useRef<number>();
  const currentFrame = useRef(0);
  const targetFrame = useRef(0);

  useEffect(() => {
    // This effect runs only on the client
    setHasAutoplayed(sessionStorage.getItem('heroAutoplayed') === 'true');

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
    if (loading || hasAutoplayed || images.length === 0) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsAutoplaying(true);
      sessionStorage.setItem('heroAutoplayed', 'true');
      setHasAutoplayed(true); // Ensure it doesn't run again in this session

      let startTime: number | null = null;
      const autoplayAnimation = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const autoplayProgress = Math.min(elapsedTime / AUTOPLAY_DURATION, 1);
        
        setProgress(autoplayProgress);

        if (autoplayProgress < 1) {
          animationFrameId.current = requestAnimationFrame(autoplayAnimation);
        } else {
          setIsAutoplaying(false);
          // Set final scroll position
          if(scrollRef.current) {
            const scrollableHeight = scrollRef.current.scrollHeight - window.innerHeight;
            window.scrollTo({ top: scrollableHeight, behavior: 'auto' });
          }
        }
      };
      animationFrameId.current = requestAnimationFrame(autoplayAnimation);
    } else {
      // Not mobile, so we mark autoplay as done for this session anyway
      sessionStorage.setItem('heroAutoplayed', 'true');
      setHasAutoplayed(true);
    }

    return () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    }
  }, [loading, hasAutoplayed, images.length]);


  useEffect(() => {
    if (loading || isAutoplaying) return;

    const handleScroll = () => {
      if (scrollRef.current) {
        const rect = scrollRef.current.getBoundingClientRect();
        const scrollableHeight = scrollRef.current.scrollHeight - window.innerHeight;
        const currentProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
        setProgress(currentProgress);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, isAutoplaying]);

  useEffect(() => {
    if (images.length === 0) return;

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
      // During autoplay, progress is driven by the autoplay animation.
      // Otherwise, it's driven by scroll.
      targetFrame.current = progress * (FRAME_COUNT - 1);
      
      // Smooth the frame transition
      currentFrame.current += (targetFrame.current - currentFrame.current) * 0.1;
      
      const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentFrame.current)));
      
      const img = images[frameIndex];
      if (img) {
          drawCoverImage(context, img);
      }
      animationFrameId.current = requestAnimationFrame(render);
    };

    setCanvasSize();
    // Only render if we have images and are not in a state where another animation loop is running
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    render();

    window.addEventListener('resize', setCanvasSize);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [images, progress, isAutoplaying]);

  const initialFadeOpacity = progress < 0.02 && !isAutoplaying ? 1 - progress / 0.02 : 0;
  
  const firstTextSectionStart = TEXT_SECTIONS[0]?.start ?? 0.05;
  const textActive = progress > firstTextSectionStart;
  const textOverlayOpacity = textActive ? Math.min((progress - firstTextSectionStart) / 0.05, 0.4) : 0;


  return (
    <div ref={scrollRef} style={{ height: `${SCROLL_MULTIPLIER * 100}vh`, overflow: isAutoplaying ? 'hidden' : 'auto' }}>
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
          className="absolute inset-0 z-10 bg-background/50 pointer-events-none"
          style={{ opacity: initialFadeOpacity, transition: 'opacity 0.3s ease-out' }}
        ></div>

         <div 
          className="absolute inset-0 z-5 bg-black/40 pointer-events-none"
          style={{ opacity: textOverlayOpacity, transition: 'opacity 0.5s ease-in-out' }}
        ></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none z-10"></div>


        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {TEXT_SECTIONS.map((section) => (
            <div
              key={section.id}
              className={cn("absolute w-full max-w-4xl p-8 pointer-events-none flex flex-col", section.className)}
              style={{ opacity: calculateOpacity(progress, section.start, section.end) }}
            >
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] leading-none [text-shadow:0_4px_8px_rgba(0,0,0,0.7)]">
                {section.title}
              </h1>
              <p className="mt-4 font-body text-lg md:text-xl text-foreground/80 leading-relaxed tracking-wider max-w-lg [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
                {section.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
