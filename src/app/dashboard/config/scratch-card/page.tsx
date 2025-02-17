"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Upload, X, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import ScratchCard from "@/components/scratchCard";
import ManageItems from "@/components/Dashboard/SpinWheel/ManageItems";
import ItemDialog, { SpinWheelItem } from "@/components/Dashboard/SpinWheel/ItemDialog";

const ScratchCardConfigPage: React.FC = () => {
  // States for items, overlay, editing, winning reward, dialog and scratch card re-mount key
  const [items, setItems] = useState<SpinWheelItem[]>([]);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<SpinWheelItem | null>(null);
  const [winningResult, setWinningResult] = useState<SpinWheelItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scratchKey, setScratchKey] = useState(0);

  // Load saved config from localStorage on mount
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("scratchCardConfig") || "{}");
    if (savedConfig) {
      setItems(savedConfig.items || []);
      setOverlayImage(savedConfig.overlayImage || null);
    }
  }, []);

  // Pre-select reward as soon as items, overlay or scratchKey changes
  useEffect(() => {
    if (items.length > 0) {
      const reward = selectReward();
      setWinningResult(reward);
    }
  }, [items, overlayImage, scratchKey]);

  // Handle add/edit item submission
  const handleDialogSubmit = (newItem: SpinWheelItem) => {
    if (editingItem) {
      setItems((prev) => prev.map((item) => (item.id === newItem.id ? newItem : item)));
      toast.success("Item updated successfully", { style: { background: "#4caf50", color: "#fff" } });
    } else {
      if (items.some((item) => item.label === newItem.label)) {
        toast.error("Item already exists", { style: { background: "#ff4d4d", color: "#fff" } });
        return;
      }
      setItems((prev) => [...prev, newItem]);
      toast.success("Item added successfully", { style: { background: "#4caf50", color: "#fff" } });
    }
    setEditingItem(null);
  };

  // Remove an item with an undo option
  const handleRemoveItem = (index: number) => {
    const item = items[index];
    setItems(items.filter((_, i) => i !== index));
    toast("Item removed", {
      description: `"${item.label}" was removed from the list.`,
      action: {
        label: "Undo",
        onClick: () => setItems((prev) => [...prev.slice(0, index), item, ...prev.slice(index)]),
      },
    });
  };

  // Save configuration to localStorage after validating total probability
  const handleSaveConfig = () => {
    const config = { items, overlayImage };
    const totalProbability = items.reduce((acc, item) => acc + item.probability, 0);
    if (totalProbability !== 100) {
      toast.error("Total probability of all items must equal 100%");
      return;
    }
    localStorage.setItem("scratchCardConfig", JSON.stringify(config));
    toast.success("Configuration Saved");
  };

  // onDragEnd handler to rearrange items via drag-and-drop
  const onDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((prev) => {
        const updated = [...prev];
        const [removed] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, removed);
        return updated;
      });
    },
    [items]
  );

  // Open the edit dialog for a given item
  const handleEditItem = (item: SpinWheelItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  // Handle overlay image upload
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

  // Remove the overlay image
  const handleRemoveOverlay = () => {
    setOverlayImage(null);
    toast.info("Overlay Image Removed");
  };

  // Weighted random selection based on the item's probability.
  // Each item must have a 'probability' field and the total should add up to 100.
  const selectReward = (): SpinWheelItem | null => {
    const randomNumber = Math.random() * 100; // number between 0 and 100
    let cumulative = 0;
    for (const item of items) {
      cumulative += item.probability;
      if (randomNumber < cumulative) {
        return item;
      }
    }
    return null;
  };

  // Reset the scratch card preview and select a new reward
  const handleReset = () => {
    setScratchKey((prev) => prev + 1);
    // (The useEffect will re-run and select a new reward)
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Scratch Card Configuration</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Scratch Card Preview */}
        <Card className="w-full h-fit">
          <CardHeader className="font-semibold">Scratch Card Preview</CardHeader>
          <CardContent className="flex flex-col items-center">
            {overlayImage ? (
              <>
                <ScratchCard
                  key={scratchKey} // forces re-mount on reset
                  coverImage={overlayImage}
                  width={300}
                  height={300}
                  revealPercent={20}
                  brushSize={50}
                  onComplete={() => {
                    if (winningResult) {
                      toast.success(`You won: ${winningResult.label}`);
                    }
                  }}
                  className="w-full h-64"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {winningResult ? (
                      <div className="text-4xl text-center select-none text-brand_primary font-bold">{winningResult.label}</div>
                    ) : (
                      <span className="text-lg">Scratch to reveal your reward!</span>
                    )}
                  </div>
                </ScratchCard>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw size={18} className="mr-2" />
                    Reset
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full h-64 border rounded-md flex items-center justify-center text-gray-500">
                No overlay image uploaded
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Manage Items & Overlay Image */}
        <div className="space-y-6">
          {/* Manage Items */}
          <ManageItems
            items={items}
            onDragEnd={onDragEnd}
            onEdit={handleEditItem}
            onRemove={handleRemoveItem}
            onAdd={() => {
              setEditingItem(null);
              setDialogOpen(true);
            }}
          />
          {/* Overlay Image Upload */}
          <Card className="w-full">
            <CardHeader className="font-semibold">Overlay Image</CardHeader>
            <CardContent>
              {overlayImage ? (
                <div className="relative w-full h-48 border rounded-md overflow-hidden">
                  <img src={overlayImage} alt="Overlay" className="w-full h-full object-contain" />
                  <Button
                    className="absolute top-2 right-2"
                    variant="destructive"
                    size="icon"
                    onClick={handleRemoveOverlay}
                  >
                    <X size={18} />
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
        </div>
      </div>

      {/* Save Configuration Button */}
      <div className="flex justify-end mt-6 sticky bottom-5">
        <Button onClick={handleSaveConfig} size="lg">
          Save Configuration
        </Button>
      </div>
      <ItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingItem ? "Edit Item" : "Add Item"}
        initialData={editingItem || undefined}
        onSubmit={handleDialogSubmit}
      />
    </div>
  );
};

export default ScratchCardConfigPage;
