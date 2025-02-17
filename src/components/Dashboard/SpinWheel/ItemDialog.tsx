"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TwitterPicker } from "react-color";
import { toast } from "sonner";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the type for each spin wheel item.
export interface SpinWheelItem {
  id: string;
  label: string;
  voucherCode: string;
  smaaashCoins: number;
  probability: number;
  bgColor: string;
  rewardType: "voucher" | "smaaashCoins";
}

// Zod schema for validating an item.
// Here we include rewardType and conditionally require either voucherCode or smaaashCoins.
const spinWheelItemSchema = z
  .object({
    label: z.string().nonempty("Label is required"),
    voucherCode: z.string(),
    smaaashCoins: z.number().min(0, "Smaaash Coins must be a non-negative number"),
    probability: z
      .number()
      .min(0, "Probability must be at least 0")
      .max(100, "Probability cannot exceed 100"),
    bgColor: z.string(),
    rewardType: z.enum(["voucher", "smaaashCoins"]),
  })
  .refine(
    (data) => data.rewardType === "voucher" ? data.voucherCode.trim() !== "" : true,
    { message: "Voucher Code is required when reward type is voucher", path: ["voucherCode"] }
  );

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
  // Set initial reward type based on initialData (defaulting to voucher)
  const initialRewardType = initialData?.rewardType || (initialData?.voucherCode ? "voucher" : "smaaashCoins");

  const [rewardType, setRewardType] = useState<"voucher" | "smaaashCoins">(initialRewardType);
  const [label, setLabel] = useState(initialData?.label || "");
  const [voucherCode, setVoucherCode] = useState(initialData?.voucherCode || "");
  const [smaaashCoins, setSmaaashCoins] = useState(
    initialData?.smaaashCoins !== undefined ? initialData.smaaashCoins.toString() : "0"
  );
  const [probability, setProbability] = useState(
    initialData?.probability !== undefined ? initialData.probability.toString() : "0"
  );
  const [bgColor, setBgColor] = useState(initialData?.bgColor || "#ffffff");

  useEffect(() => {
    setLabel(initialData?.label || "");
    setVoucherCode(initialData?.voucherCode || "");
    setSmaaashCoins(initialData?.smaaashCoins?.toString() || "0");
    setProbability(initialData?.probability?.toString() || "0");
    setBgColor(initialData?.bgColor || "#ffffff");
    setRewardType(
      initialData?.rewardType ||
        (initialData?.voucherCode ? "voucher" : "smaaashCoins")
    );
  }, [initialData]);

  const handleSubmit = () => {
    // Depending on rewardType, clear the unused field.
    const rawData = {
      label: label.trim(),
      voucherCode: rewardType === "voucher" ? voucherCode.trim() : "",
      smaaashCoins: rewardType === "smaaashCoins" ? Number(smaaashCoins) : 0,
      probability: Number(probability),
      bgColor,
      rewardType,
    };

    try {
      const validatedData = spinWheelItemSchema.parse(rawData);
      const newItem: SpinWheelItem = { id: initialData?.id || String(Date.now()), ...validatedData };
      onSubmit(newItem);
      onOpenChange(false);
      // Clear form fields
      setLabel("");
      setVoucherCode("");
      setSmaaashCoins("0");
      setProbability("0");
      setBgColor("#ffffff");
      setRewardType("voucher");
    } catch (error) {
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
            <Input placeholder="Enter item label" value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          {/* Select for Reward Type */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Reward Type</label>
            <Select value={rewardType} onValueChange={(value: "voucher" | "smaaashCoins") => setRewardType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select reward type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voucher">Voucher</SelectItem>
                <SelectItem value="smaaashCoins">Smaaash Coins</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Conditionally render the input field based on reward type */}
          {rewardType === "voucher" ? (
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Voucher Code</label>
              <Input placeholder="Enter voucher code" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Smaaash Coins</label>
              <Input placeholder="Enter smaaash coins" type="number" value={smaaashCoins} onChange={(e) => setSmaaashCoins(e.target.value)} />
            </div>
          )}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Probability (%)</label>
            <Input placeholder="Enter probability" type="number" value={probability} onChange={(e) => setProbability(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Background Color</label>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md border border-gray-300" style={{ backgroundColor: bgColor }} />
              <TwitterPicker color={bgColor} onChangeComplete={(color) => setBgColor(color.hex)} />
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDialog;
