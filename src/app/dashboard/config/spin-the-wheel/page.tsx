"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Trash, GripVertical, Edit } from "lucide-react";
import { TwitterPicker } from "react-color";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import SpinWheel, { SpinWheelHandle } from "@/components/SpinWheel";
import { z } from "zod"; // <-- Import Zod

// Define the type for each spin wheel item.
export interface SpinWheelItem {
  id: string;
  label: string;
  voucherCode: string;
  smaaashCoins: number;
  probability: number; // e.g., 10, 20, etc.
  bgColor: string;
}

// Define a Zod schema for validation of the spin wheel item fields.
const spinWheelItemSchema = z.object({
  label: z.string().nonempty("Label is required"),
  voucherCode: z.string(), // optional or required as needed
  smaaashCoins: z.number().min(0, "Smaaash Coins must be a non-negative number"),
  probability: z
    .number()
    .min(0, "Probability must be at least 0")
    .max(100, "Probability cannot exceed 100"),
  bgColor: z.string(),
});

interface SortableItemProps {
  id: string;
  // Use a render prop so we can pass drag listeners only to the handle.
  children: (
    dragListeners: ReturnType<typeof useSortable>["listeners"]
  ) => React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children(listeners)}
    </div>
  );
};

interface ItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (item: SpinWheelItem) => void;
  initialData?: Partial<SpinWheelItem>;
  title: string;
}

const ItemDialog: React.FC<ItemDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
}) => {
  const [label, setLabel] = useState(initialData?.label || "");
  const [voucherCode, setVoucherCode] = useState(initialData?.voucherCode || "");
  const [smaaashCoins, setSmaaashCoins] = useState(
    initialData?.smaaashCoins?.toString() || "0"
  );
  const [probability, setProbability] = useState(
    initialData?.probability?.toString() || "0"
  );
  const [bgColor, setBgColor] = useState(initialData?.bgColor || "#ffffff");

  useEffect(() => {
    setLabel(initialData?.label || "");
    setVoucherCode(initialData?.voucherCode || "");
    setSmaaashCoins(initialData?.smaaashCoins?.toString() || "0");
    setProbability(initialData?.probability?.toString() || "0");
    setBgColor(initialData?.bgColor || "#ffffff");
  }, [initialData]);

  const handleSubmit = () => {
    // Prepare raw data (note: converting number fields from string)
    const rawData = {
      label: label.trim(),
      voucherCode: voucherCode.trim(),
      smaaashCoins: Number(smaaashCoins),
      probability: Number(probability),
      bgColor,
    };

    try {
      // Validate using Zod. If any field is invalid, an error is thrown.
      const validatedData = spinWheelItemSchema.parse(rawData);
      const newItem: SpinWheelItem = {
        id: initialData?.id || String(Date.now()),
        ...validatedData,
      };

      onSubmit(newItem);
      onOpenChange(false);

      // Clear the dialog fields
      setLabel("");
      setVoucherCode("");
      setSmaaashCoins("0");
      setProbability("0");
      setBgColor("#ffffff");
    } catch (error) {
      // Display all validation errors.
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error("Validation failed");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Item Label</label>
            <Input
              placeholder="Enter item label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Voucher Code</label>
            <Input
              placeholder="Enter voucher code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Smaaash Coins</label>
            <Input
              placeholder="Enter smaaash coins"
              type="number"
              value={smaaashCoins}
              onChange={(e) => setSmaaashCoins(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Probability (%)</label>
            <Input
              placeholder="Enter probability"
              type="number"
              value={probability}
              onChange={(e) => setProbability(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Background Color</label>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-md border border-gray-300"
                style={{ backgroundColor: bgColor }}
              />
              <TwitterPicker
                color={bgColor}
                onChangeComplete={(color) => setBgColor(color.hex)}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SpinWheelConfig: React.FC = () => {
  const [items, setItems] = useState<SpinWheelItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SpinWheelItem | null>(null);
  // New state to hold the winning result
  const [winningResult, setWinningResult] = useState<SpinWheelItem | null>(null);

  // Create a ref to access SpinWheel's imperative handle.
  const spinWheelRef = useRef<SpinWheelHandle>(null);

  useEffect(() => {
    const savedConfig = JSON.parse(
      localStorage.getItem("spinWheelConfig") || "{}"
    );
    if (savedConfig) {
      setItems(savedConfig.items || []);
    }
  }, []);

  const handleDialogSubmit = (newItem: SpinWheelItem) => {
    if (editingItem) {
      // Update existing item
      setItems((prev) =>
        prev.map((item) => (item.id === newItem.id ? newItem : item))
      );
      toast.success("Item updated successfully", {
        style: { background: "#4caf50", color: "#fff" },
      });
    } else {
      // Check if an item with the same label already exists.
      if (items.some((item) => item.label === newItem.label)) {
        toast.error("Item already exists", {
          style: { background: "#ff4d4d", color: "#fff" },
        });
        return;
      }
      setItems((prev) => [...prev, newItem]);
      toast.success("Item added successfully", {
        style: { background: "#4caf50", color: "#fff" },
      });
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
        onClick: () =>
          setItems((prev) => [
            ...prev.slice(0, index),
            item,
            ...prev.slice(index),
          ]),
      },
    });
  };

  // Before saving, validate that the sum of probabilities equals 100.
  const handleSaveConfig = () => {
    const totalProbability = items.reduce(
      (acc, item) => acc + item.probability,
      0
    );
    if (totalProbability !== 100) {
      toast.error("Total probability of all items must equal 100%");
      return;
    }
    const config = { items };
    localStorage.setItem("spinWheelConfig", JSON.stringify(config));
    toast.success("Configuration Saved");
  };

  const onDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    },
    [items]
  );

  // Map managed items into the format required by SpinWheel.
  const wheelItems = items.map((item) => ({
    label: item.label,
    color: item.bgColor,
    probability: item.probability,
  }));

  // Update the spin handler to trigger the spin via the ref.
  const handleSpinClick = () => {
    if (items.length === 0) {
      toast.error("Please add some items to spin");
      return;
    }
    spinWheelRef.current?.spinWheel();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Spin Wheel Configuration</h1>
      <div className="flex gap-6">
        {/* Left Column: Spin Wheel Preview */}
        <div className="w-1/2">
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
                onSpinEnd={(winningSegment) => {
                  // Find the full winning item using the label (assumes labels are unique)
                  const winningItem = items.find(
                    (item) => item.label === winningSegment.label
                  );
                  if (winningItem) {
                    setWinningResult(winningItem);
                    toast.success(
                      `Congratulations! You won: ${winningItem.label}`,
                      {
                        style: { background: "#4caf50", color: "#fff" },
                      }
                    );
                  } else {
                    toast.success(
                      `Congratulations! You won: ${winningSegment.label}`,
                      {
                        style: { background: "#4caf50", color: "#fff" },
                      }
                    );
                  }
                }}
              />
              <Button
                onClick={handleSpinClick}
                className="mt-4 w-full bg-brand_primary hover:bg-brand_primary"
              >
                Spin
              </Button>
              {/* Show winning result text below the Spin button */}
              {winningResult && (
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">
                    Congratulations! You won: {winningResult.label}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Right Column: Manage Items Card */}
        <div className="w-1/2">
          <Card>
            <CardHeader className="font-semibold flex-row justify-between items-center">
              Manage Items
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setEditingItem(null);
                    setDialogOpen(true);
                  }}
                >
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={items.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <SortableItem key={item.id} id={item.id}>
                        {(dragListeners) => (
                          <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-14 flex items-center rounded"
                                style={{ backgroundColor: item.bgColor }}
                              >
                                <GripVertical
                                  {...dragListeners}
                                  className="cursor-grab"
                                />
                              </div>
                              <div>
                                <h4 className="text-lg p-1">{item.label}</h4>
                                <p className="text-sm text-gray-600">
                                  Voucher: {item.voucherCode} | Coins:{" "}
                                  {item.smaaashCoins} | Prob: {item.probability}%
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setEditingItem(item);
                                  setDialogOpen(true);
                                }}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleRemoveItem(index)}
                              >
                                <Trash size={16} />
                              </Button>
                            </div>
                          </div>
                        )}
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
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
      {/* Item dialog for adding/editing */}
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
