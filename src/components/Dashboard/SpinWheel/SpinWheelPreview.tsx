"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SpinWheel, { SpinWheelHandle } from "@/components/SpinWheel";
import { toast } from "sonner";
import { SpinWheelItem } from "./ItemDialog";

interface SpinWheelPreviewProps {
  items: SpinWheelItem[];
  spinWheelRef: React.RefObject<SpinWheelHandle>;
  onSpinEnd: (winningSegment: any) => void;
}

const SpinWheelPreview: React.FC<SpinWheelPreviewProps> = ({ items, spinWheelRef, onSpinEnd }) => {
  const wheelItems = items.map((item) => ({
    label: item.label,
    color: item.bgColor,
    probability: item.probability,
  }));

  const handleSpinClick = () => {
    if (items.length === 0) {
      toast.error("Please add some items to spin");
      return;
    }
    spinWheelRef.current?.spinWheel();
  };

  return (
    <Card>
      <CardHeader className="font-semibold flex-row justify-between items-center">
        Preview
      </CardHeader>
      <CardContent>
        <SpinWheel
          ref={spinWheelRef}
          items={wheelItems}
          wheelSize={300}
          spinDuration={5000}
          minSpins={3}
          maxSpins={6}
          pointerColor="#e11d48"
          pointerSize={40}
          centerCircleSize={20}
          textColor="white"
          strokeWidth={2}
          strokeColor="white"
          className="my-custom-spinwheel"
          onSpinEnd={onSpinEnd}
        />
        <Button onClick={handleSpinClick} className="mt-4 w-full bg-brand_primary hover:bg-brand_primary">
          Spin
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpinWheelPreview;
