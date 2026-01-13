"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type MasonryItem = {
  id: string | number;
  img: string;
  url: string;
  height: number;
  hint: string;
};

type MasonryProps = {
  items: MasonryItem[];
  columns?: number;
  gap?: number;
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
};

const Masonry: React.FC<MasonryProps> = ({
  items,
  columns: initialColumns = 3,
  gap = 16,
  ease = "easeOut",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 1.05,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const [columns, setColumns] = useState(initialColumns);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(initialColumns);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialColumns]);

  const getAnimationProps = () => {
    switch (animateFrom) {
      case 'top': return { y: -50, opacity: 0 };
      case 'left': return { x: -50, opacity: 0 };
      case 'right': return { x: 50, opacity: 0 };
      case 'bottom':
      default: return { y: 50, opacity: 0 };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants = {
    hidden: getAnimationProps(),
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        ease,
      },
    },
  };

  const hoverEffects = {
    ...(scaleOnHover && { scale: hoverScale }),
    ...(colorShiftOnHover && { filter: 'brightness(1.1)' }),
  };

  const columnsData = Array.from({ length: columns }, () => ({
    items: [] as MasonryItem[],
    height: 0,
  }));

  items.forEach(item => {
    const minHeightColumn = columnsData.reduce((prev, curr) => (curr.height < prev.height ? curr : prev));
    minHeightColumn.items.push(item);
    minHeightColumn.height += item.height + gap;
  });

  return (
    <motion.div
      ref={ref}
      className="grid"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gap}px` }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {columnsData.map((col, i) => (
        <div key={i} className="flex flex-col" style={{ gap: `${gap}px` }}>
          {col.items.map(item => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden rounded-lg group"
              variants={itemVariants}
              whileHover={hoverEffects}
            >
              <motion.div
                className={cn(blurToFocus && "transition-all duration-500 filter blur-sm group-hover:blur-0")}
                style={{ height: `${item.height}px` }}
              >
                <Image
                  src={item.img}
                  alt={item.hint}
                  fill
                  className="object-cover"
                  data-ai-hint={item.hint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default Masonry;
