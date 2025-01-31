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
  className?: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  width = 300,
  height = 300,
  coverImage,
  fadeOut = true,
  brushSize = 20,
  revealPercent = 20, // Changed from 50 to 30
  onComplete = () => {},
  children,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const lastPointRef = useRef<{ x: number, y: number } | null>(null);

  const fireCelebration = () => {
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    setCtx(context);

    // Load cover image
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = coverImage;
    image.onload = () => {
      context.drawImage(image, 0, 0, width, height);
    };

    return () => {
      setCtx(null);
    };
  }, [coverImage, width, height]);

  const getFilledInPixels = () => {
    if (!ctx) return 0;
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    return (transparent / (pixels.length / 4)) * 100;
  };

  const scratch = (x: number, y: number) => {
    if (!ctx || !isDrawing) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.lineWidth = brushSize;
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    lastPointRef.current = { x, y };

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

  const getPosition = (event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in event) {
      const touch = event.touches[0];
      if (!touch) return null;
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    }

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDrawing(true);
    const position = getPosition(event as any);
    if (position) {
      lastPointRef.current = position;
      scratch(position.x, position.y);
    }
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const position = getPosition(event as any);
    if (position) {
      scratch(position.x, position.y);
    }
  };

  const handleEnd = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  return (
    <div
      className={cn("relative inline-block rounded-xl overflow-hidden", className)}
      style={{ width, height }}
    >
      <div className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 touch-none select-none rounded-xl"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      />
    </div>
  );
};

export default ScratchCard;