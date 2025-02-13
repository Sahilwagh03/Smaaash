"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Trash, GripVertical, Upload, XCircle } from "lucide-react";
import { TwitterPicker } from "react-color";
import { toast } from "sonner";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const ScratchCardConfigPage: React.FC = () => {
  const [prizes, setPrizes] = useState<string[]>([]);
  const [newPrize, setNewPrize] = useState("");
  const [themeColor, setThemeColor] = useState("#3498db");
  // Store scratchPercentage as string so the user can edit it freely.
  const [scratchPercentage, setScratchPercentage] = useState<string>("70");
  const [overlayImage, setOverlayImage] = useState<string | null>(null);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("scratchCardConfig") || "{}");
    if (savedConfig) {
      setPrizes(savedConfig.prizes || []);
      setThemeColor(savedConfig.themeColor || "#3498db");
      // Convert saved scratchPercentage to a string
      setScratchPercentage(savedConfig.scratchPercentage ? String(savedConfig.scratchPercentage) : "70");
      setOverlayImage(savedConfig.overlayImage || null);
    }
  }, []);

  const handleAddPrize = () => {
    if (newPrize.trim()) {
      if (prizes.includes(newPrize.trim())) {
        toast.error("Prize already exists", { style: { background: "#ff4d4d", color: "#fff" } });
      } else {
        setPrizes([...prizes, newPrize.trim()]);
        setNewPrize("");
        toast.success("Prize added successfully", { style: { background: "#4caf50", color: "#fff" } });
      }
    }
  };

  const handleRemovePrize = (index: number) => {
    const prize = prizes[index];
    setPrizes(prizes.filter((_, i) => i !== index));
    toast("Prize removed", {
      description: `"${prize}" was removed from the list.`,
      action: {
        label: "Undo",
        onClick: () => setPrizes((prev) => [...prev.slice(0, index), prize, ...prev.slice(index)]),
      },
    });
  };

  const handleSaveConfig = () => {
    const config = {
      prizes,
      themeColor,
      // Convert the scratchPercentage string to a number before saving
      scratchPercentage: Number(scratchPercentage),
      overlayImage,
    };
    localStorage.setItem("scratchCardConfig", JSON.stringify(config));
    toast.success("Configuration Saved", { style: { background: "#007bff", color: "#fff" } });
  };

  const onDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = prizes.indexOf(active.id);
      const newIndex = prizes.indexOf(over.id);
      setPrizes((prev) => arrayMove(prev, oldIndex, newIndex));
    },
    [prizes]
  );

  const handleOverlayUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOverlayImage(reader.result as string);
        toast.success("Overlay Image Uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveOverlay = () => {
    setOverlayImage(null);
    toast.info("Overlay Image Removed");
  };

  // Allow user to type freely, removing leading zeros if necessary.
  const handleScratchPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 1 && value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }
    setScratchPercentage(value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Scratch Card Configuration</h1>

      {/* Overlay Image Upload Section */}
      <Card className="w-full mb-6">
        <CardHeader className="font-semibold">Overlay Image</CardHeader>
        <CardContent>
          {overlayImage ? (
            <div className="relative w-full h-48 border rounded-md overflow-hidden">
              <img src={overlayImage} alt="Overlay" className="w-full h-full object-cover" />
              <Button
                className="absolute top-2 right-2"
                variant="destructive"
                size="icon"
                onClick={handleRemoveOverlay}
              >
                <XCircle size={18} />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:bg-gray-50">
              <Upload size={32} className="text-gray-500 mb-2" />
              <span className="text-gray-500">Click or drag to upload an overlay image</span>
              <span className="text-xs text-gray-400">Supported formats: PNG, JPG, JPEG</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleOverlayUpload} />
            </label>
          )}
        </CardContent>
      </Card>

      {/* Grid with Prize Management and Scratch Card Customization */}
      <div className="grid grid-cols-2 gap-6">
        {/* Prize Management */}
        <Card className="w-full">
          <CardHeader className="font-semibold">Manage Prizes</CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newPrize}
                onChange={(e) => setNewPrize(e.target.value)}
                placeholder="Enter prize name"
                className="flex-grow"
              />
              <Button onClick={handleAddPrize}>Add</Button>
            </div>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={prizes} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {prizes.map((prize, index) => (
                    <SortableItem key={prize} id={prize}>
                      <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <div className="flex items-center gap-2">
                          <GripVertical className="cursor-grab" />
                          <h4 className="text-lg">{prize}</h4>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => handleRemovePrize(index)}>
                          <Trash size={16} />
                        </Button>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>

        {/* Scratch Card Customization */}
        <Card className="w-full">
          <CardHeader className="font-semibold">Scratch Card Customization</CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="mb-2 font-medium">Theme Color</p>
                <TwitterPicker color={themeColor} onChange={(color) => setThemeColor(color.hex)} />
              </div>
              <div>
                <label className="block mb-2 font-medium">Scratch Percentage</label>
                <Input
                  type="number"
                  value={scratchPercentage}
                  onChange={handleScratchPercentageChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Configuration Button */}
      <div className="flex justify-end mt-6 sticky bottom-5">
        <Button onClick={handleSaveConfig} size="lg">
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default ScratchCardConfigPage;
