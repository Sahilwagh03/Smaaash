"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Trash, GripVertical } from "lucide-react";
import { TwitterPicker } from "react-color";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const SpinWheelConfig: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [wheelColor, setWheelColor] = useState("#ff0000");
  // Store spinLimit as a string so the input can be edited freely.
  const [spinLimit, setSpinLimit] = useState<string>("5");

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("spinWheelConfig") || "{}");
    if (savedConfig) {
      setItems(savedConfig.items || []);
      setWheelColor(savedConfig.wheelColor || "#ff0000");
      // Convert saved spinLimit to a string.
      setSpinLimit(savedConfig.spinLimit ? String(savedConfig.spinLimit) : "5");
    }
  }, []);

  const handleAddItem = () => {
    if (newItem.trim()) {
      if (items.includes(newItem.trim())) {
        toast.error("Item already exists", {
          style: { background: "#ff4d4d", color: "#fff" },
        });
      } else {
        setItems([...items, newItem.trim()]);
        setNewItem("");
        toast.success("Item added successfully", {
          style: { background: "#4caf50", color: "#fff" },
        });
      }
    }
  };

  const handleRemoveItem = (index: number) => {
    const item = items[index];
    setItems(items.filter((_, i) => i !== index));
    toast("Item removed", {
      description: `"${item}" was removed from the list.`,
      action: {
        label: "Undo",
        onClick: () => setItems((prev) => [...prev.slice(0, index), item, ...prev.slice(index)]),
      },
    });
  };

  const handleSaveConfig = () => {
    const config = {
      items,
      wheelColor,
      // Convert the spinLimit string to a number before saving.
      spinLimit: Number(spinLimit),
    };
    localStorage.setItem("spinWheelConfig", JSON.stringify(config));
    toast.success("Configuration Saved");
  };

  const onDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    },
    [items]
  );

  // Handler to allow free editing and prevent unwanted leading zeros.
  const handleSpinLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 1 && value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }
    setSpinLimit(value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Spin Wheel Configuration</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Item Management */}
        <Card className="w-full">
          <CardHeader className="font-semibold">Manage Items</CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter item label"
                className="flex-grow"
              />
              <Button onClick={handleAddItem}>Add</Button>
            </div>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <SortableItem key={item} id={item}>
                      <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <div className="flex items-center gap-2">
                          <GripVertical className="cursor-grab" />
                          <h4 className="text-lg">{item}</h4>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(index)}>
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

        {/* Wheel Customization */}
        <Card className="w-full">
          <CardHeader className="font-semibold">Wheel Customization</CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="mb-2 font-medium">Wheel Color</p>
                <TwitterPicker color={wheelColor} onChange={(color) => setWheelColor(color.hex)} />
              </div>
              <div>
                <label className="block mb-2 font-medium">Spin Limit</label>
                <Input type="number" value={spinLimit} onChange={handleSpinLimitChange} />
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

export default SpinWheelConfig;
