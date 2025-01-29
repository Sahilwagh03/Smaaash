'use client';

import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface ScratchCardProps {
  width?: number;
  height?: number;
  coverImage: string;
  fadeOut?: boolean;
  brushSize?: number;
  revealPercent?: number;
  onComplete?: () => void;
  children: React.ReactNode;
  className?:string
}

const ScratchCard: React.FC<ScratchCardProps> = ({ 
  width = 300, 
  height = 300, 
  coverImage,
  fadeOut = true,
  brushSize = 20,
  revealPercent = 50,
  onComplete = () => {},
  children,
  className="" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const fireCelebration = () => {
    // Fire multiple confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 90,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted || !coverImage) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    setCtx(context);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = coverImage;
    
    image.onload = () => {
      context.drawImage(image, 0, 0, width, height);
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (canvas) {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMounted, coverImage, width, height]);

  const getFilledInPixels = (): number => {
    if (!ctx) return 0;
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const total = pixels.length;
    let transparent = 0;

    for (let i = 3; i < total; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    return (transparent / (total / 4)) * 100;
  };

  const getMouse = (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;

    if (clientX === undefined || clientY === undefined) return null;

    return {
      x: (clientX - rect.left) * (width / rect.width),
      y: (clientY - rect.top) * (height / rect.height)
    };
  };

  const scratch = (x: number, y: number): void => {
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();

    const percent = getFilledInPixels();
    if (percent > revealPercent && !isComplete) {
      setIsComplete(true);
      if (fadeOut && canvasRef.current) {
        canvasRef.current.style.transition = 'opacity 0.5s ease';
        canvasRef.current.style.opacity = '0';
      }
      fireCelebration();
      onComplete();
    }
  };

  const handleMouseDown = (e: React.MouseEvent | TouchEvent): void => {
    setIsDrawing(true);
    const pos = getMouse(e as MouseEvent | TouchEvent);
    if (pos) scratch(pos.x, pos.y);
  };

  const handleMouseMove = (e: React.MouseEvent | TouchEvent): void => {
    if (!isDrawing) return;
    const pos = getMouse(e as MouseEvent | TouchEvent);
    if (pos) scratch(pos.x, pos.y);
  };

  const handleMouseUp = (): void => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: TouchEvent): void => {
    e.preventDefault();
    handleMouseDown(e);
  };

  const handleTouchMove = (e: TouchEvent): void => {
    e.preventDefault();
    handleMouseMove(e);
  };

  const handleTouchEnd = (): void => {
    handleMouseUp();
  };

  if (!isMounted) return null;

  return (
    <div 
      ref={containerRef}
      className={cn("relative inline-block rounded-xl overflow-hidden",className)}
      style={{ width, height }}
    >
      <div className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 cursor-pointer rounded-xl"
        onMouseDown={handleMouseDown as any}
        onMouseMove={handleMouseMove as any}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default ScratchCard;