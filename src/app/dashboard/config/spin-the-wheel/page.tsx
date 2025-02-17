"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SpinWheelPreview from "@/components/Dashboard/SpinWheel/SpinWheelPreview";
import ManageItems from "@/components/Dashboard/SpinWheel/ManageItems";
import ItemDialog, { SpinWheelItem } from "@/components/Dashboard/SpinWheel/ItemDialog";

const SpinWheelConfig: React.FC = () => {
  const [items, setItems] = useState<SpinWheelItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SpinWheelItem | null>(null);
  const [winningResult, setWinningResult] = useState<SpinWheelItem | null>(null);
  const spinWheelRef = useRef<any>(null);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("spinWheelConfig") || "{}");
    if (savedConfig) {
      setItems(savedConfig.items || []);
    }
  }, []);

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

  const handleSaveConfig = () => {
    const totalProbability = items.reduce((acc, item) => acc + item.probability, 0);
    if (totalProbability !== 100) {
      toast.error("Total probability of all items must equal 100%");
      return;
    }
    localStorage.setItem("spinWheelConfig", JSON.stringify({ items }));
    toast.success("Configuration Saved");
  };

  const onDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      // Rearrange items using arrayMove (or your custom logic)
      setItems((prev) => {
        const updated = [...prev];
        const [removed] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, removed);
        return updated;
      });
    },
    [items]
  );

  const handleOnSpinEnd = (winningSegment: any) => {
    const winningItem = items.find((item) => item.label === winningSegment.label);
    if (winningItem) {
      setWinningResult(winningItem);
      toast.success(`Congratulations! You won: ${winningItem.label}`, {
        style: { background: "#4caf50", color: "#fff" },
      });
    } else {
      toast.success(`Congratulations! You won: ${winningSegment.label}`, {
        style: { background: "#4caf50", color: "#fff" },
      });
    }
  };

  const handleEditItem = (item: SpinWheelItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Spin Wheel Configuration</h1>
      <div className="flex gap-6">
        <div className="w-1/2">
          <SpinWheelPreview items={items} spinWheelRef={spinWheelRef} onSpinEnd={handleOnSpinEnd} />
          {winningResult && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">Congratulations! You won: {winningResult.label}</p>
            </div>
          )}
        </div>
        <div className="w-1/2">
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
        </div>
      </div>
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

export default SpinWheelConfig;
