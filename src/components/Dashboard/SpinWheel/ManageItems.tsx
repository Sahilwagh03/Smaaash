"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { Button } from "@/components/ui/button";
import { Trash, GripVertical, Edit } from "lucide-react";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { SpinWheelItem } from "./ItemDialog";

interface ManageItemsProps {
  items: SpinWheelItem[];
  onDragEnd: (event: any) => void;
  onEdit: (item: SpinWheelItem) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}

const ManageItems: React.FC<ManageItemsProps> = ({ items, onDragEnd, onEdit, onRemove, onAdd }) => {
  return (
    <Card>
      <CardHeader className="font-semibold flex-row justify-between items-center">
        Manage Items
        <div className="flex justify-end">
          <Button onClick={onAdd}>Add Item</Button>
        </div>
      </CardHeader>
      <CardContent>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          modifiers={[restrictToParentElement]} // Added modifier to restrict dragging within the card.
        >
          <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((item, index) => (
                <SortableItem key={item.id} id={item.id}>
                  {(dragListeners) => (
                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <div className="h-14 flex items-center rounded" style={{ backgroundColor: item.bgColor }}>
                          <GripVertical {...dragListeners} className="cursor-grab" />
                        </div>
                        <div>
                          <h4 className="text-lg p-1 select-none">{item.label}</h4>
                          <p className="text-sm text-gray-600 p-1 select-none">
                            Voucher: {item.voucherCode} | Coins: {item.smaaashCoins} | Prob: {item.probability}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => onEdit(item)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => onRemove(index)}>
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
  );
};

export default ManageItems;
