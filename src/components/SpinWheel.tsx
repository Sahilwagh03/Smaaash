import React, {
    useState,
    useRef,
    useCallback,
    useImperativeHandle,
    forwardRef,
  } from 'react';
  
  import { RotateCcw } from 'lucide-react';
  
  interface SpinWheelItem {
    label: string;
    color: string;
    probability: number; // e.g., 10, 20, etc.
  }
  
  interface DisplaySegment extends SpinWheelItem {
    startAngle: number;
    endAngle: number;
  }
  
  export interface SpinWheelProps {
    items?: SpinWheelItem[];
    wheelSize?: number;
    spinDuration?: number;
    minSpins?: number;
    maxSpins?: number;
    pointerColor?: string;
    pointerSize?: number;
    centerCircleSize?: number;
    // fontSize prop removed from direct usage since font size will be computed dynamically.
    textColor?: string;
    strokeWidth?: number;
    strokeColor?: string;
    onSpinStart?: () => void;
    onSpinEnd?: (winningSegment: DisplaySegment) => void;
    className?: string;
  }
  
  // Define an interface for the imperative handle
  export interface SpinWheelHandle {
    spinWheel: () => void;
  }
  
  const SpinWheel = forwardRef<SpinWheelHandle, SpinWheelProps>(
    (
      {
        items = [
          { label: 'Prize 1', color: '#FF6B6B', probability: 20 },
          { label: 'Prize 2', color: '#4ECDC4', probability: 30 },
          { label: 'Prize 3', color: '#45B7D1', probability: 50 },
        ],
        wheelSize = 300,
        spinDuration = 8000,
        minSpins = 5,
        maxSpins = 8,
        pointerColor = '#e11d48',
        pointerSize = 40,
        centerCircleSize = 20,
        textColor = 'white',
        strokeWidth = 1,
        strokeColor = 'white',
        onSpinStart = () => {},
        onSpinEnd = () => {},
        className = '',
      },
      ref
    ) => {
      const [isSpinning, setIsSpinning] = useState<boolean>(false);
      const [rotation, setRotation] = useState<number>(0);
      const wheelRef = useRef<SVGSVGElement | null>(null);
  
      // Calculate equally divided segments for display
      const getDisplaySegments = useCallback((): DisplaySegment[] => {
        const anglePerSegment = 360 / items.length;
        return items.map((item, index) => ({
          ...item,
          startAngle: index * anglePerSegment,
          endAngle: (index + 1) * anglePerSegment,
        }));
      }, [items]);
  
      // Helper function to wrap text into multiple lines if too long.
      // Here, we split words so that no line exceeds maxChars.
      const wrapLabel = (text: string, maxChars: number = 10): string[] => {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';
  
        words.forEach((word) => {
          if ((currentLine + word).length <= maxChars) {
            currentLine += (currentLine ? ' ' : '') + word;
          } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
          }
        });
        if (currentLine) lines.push(currentLine);
        return lines;
      };
  
      // Render the wheel segments as SVG paths and text.
      // We adjust the text rotation so that it always faces toward the center.
      const generateWheel = useCallback(() => {
        const segments = getDisplaySegments();
        const radius = wheelSize / 2;
        const centerX = wheelSize / 2;
        const centerY = wheelSize / 2;
        // Compute the effective font size based on the wheel size.
        // Ratio: 12px when wheelSize is 300px.
        const effectiveFontSize = wheelSize * (12 / 300);
        // Define line height (can be tweaked if needed)
        const lineHeight = effectiveFontSize * 1.2;
  
        return segments.map((segment, index) => {
          const startRadians = (segment.startAngle - 90) * (Math.PI / 180);
          const endRadians = (segment.endAngle - 90) * (Math.PI / 180);
  
          const x1 = centerX + radius * Math.cos(startRadians);
          const y1 = centerY + radius * Math.sin(startRadians);
          const x2 = centerX + radius * Math.cos(endRadians);
          const y2 = centerY + radius * Math.sin(endRadians);
  
          const largeArc = segment.endAngle - segment.startAngle <= 180 ? 0 : 1;
          const path = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');
  
          // Compute the center angle for this segment.
          const textAngle = (segment.startAngle + segment.endAngle) / 2;
          // Position the text at 50% of the radius.
          const textRadians = (textAngle - 90) * (Math.PI / 180);
          const textRadius = radius * 0.5;
          const textX = centerX + textRadius * Math.cos(textRadians);
          const textY = centerY + textRadius * Math.sin(textRadians);
  
          // Calculate text rotation so that the text faces the center.
          let textRotation = textAngle - 90;
          if (textRotation < -90 || textRotation > 90) {
            textRotation = textRotation + 180;
          }
  
          // Wrap the label if it's too long.
          const lines = wrapLabel(segment.label, 10);
  
          return (
            <g key={index}>
              <path
                d={path}
                fill={segment.color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                className="transition-all duration-300 hover:brightness-110"
              />
              <text
                x={textX}
                y={textY}
                fill={textColor}
                fontSize={effectiveFontSize}
                fontWeight="bold"
                textAnchor="middle"
                transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                className="select-none pointer-events-none"
              >
                {lines.map((line, i) => (
                  <tspan
                    key={i}
                    x={textX}
                    dy={i === 0 ? '0' : `${lineHeight}`}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        });
      }, [getDisplaySegments, wheelSize, textColor, strokeColor, strokeWidth]);
  
      // Helper: select a weighted random index based on probability values.
      const weightedRandomIndex = (items: SpinWheelItem[]): number => {
        const total = items.reduce((sum, item) => sum + item.probability, 0);
        const rand = Math.random() * total;
        let sum = 0;
        for (let i = 0; i < items.length; i++) {
          sum += items[i].probability;
          if (rand < sum) return i;
        }
        return items.length - 1;
      };
  
      // Spin function (exposed via ref)
      const spinWheel = () => {
        if (isSpinning) return;
  
        setIsSpinning(true);
        onSpinStart();
  
        // Determine winning segment based on weighted probabilities.
        const winningIndex = weightedRandomIndex(items);
        const segments = getDisplaySegments();
        const winningSegment = segments[winningIndex];
  
        // Calculate the center angle of the winning segment.
        const winningCenter = (winningSegment.startAngle + winningSegment.endAngle) / 2;
        // Adjust final rotation so that the pointer (fixed at the top) lands on the winning segment.
        const spins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
        const finalRotation = spins * 360 + (360 - winningCenter);
  
        const startTime = performance.now();
  
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / spinDuration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentRotation = finalRotation * easeOut;
  
          setRotation(currentRotation);
  
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsSpinning(false);
            onSpinEnd(winningSegment);
          }
        };
  
        requestAnimationFrame(animate);
      };
  
      // Expose the spinWheel function to parent components using the ref.
      useImperativeHandle(ref, () => ({
        spinWheel,
      }));
  
      return (
        <div className={`flex flex-col items-center gap-6 ${className}`}>
          <div className={`relative w-[${wheelSize}px] h-[${wheelSize}px]`}>
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 z-10 pointer-events-none">
              <svg width={pointerSize} height={pointerSize} viewBox="0 0 40 40">
                <filter id="pointerShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3" />
                </filter>
                <path
                  d="M20 36L4 4h32L20 36z"
                  fill={pointerColor}
                  filter="url(#pointerShadow)"
                />
                <path d="M20 30L9 8h22L20 30z" fill={`${pointerColor}22`} />
              </svg>
            </div>
  
            {/* Wheel */}
            <svg
              ref={wheelRef}
              viewBox={`0 0 ${wheelSize} ${wheelSize}`}
              className="w-full h-full transform"
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feOffset dy="2" dx="2" />
                <feComposite
                  in2="SourceAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                  result="shadowDiff"
                />
                <feFlood floodColor="#000" floodOpacity="0.2" />
                <feComposite in2="shadowDiff" operator="in" />
                <feComposite in2="SourceGraphic" operator="over" />
              </filter>
              <g filter="url(#innerShadow)">{generateWheel()}</g>
  
              {/* Center Circle */}
              <circle
                cx={wheelSize / 2}
                cy={wheelSize / 2}
                r={centerCircleSize}
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="2"
                className="filter drop-shadow-lg"
              />
              <circle
                cx={wheelSize / 2}
                cy={wheelSize / 2}
                r={centerCircleSize - 5}
                fill="#007bff"
                className="filter drop-shadow-sm"
              />
            </svg>
          </div>
        </div>
      );
    }
  );
  
  export default SpinWheel;
  