"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, MoreHorizontal, ChevronDown, TrendingUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// ShadCN UI Components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// ShadCN DatePicker Components
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Import ShadCN Chart components
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// TanStack React Table Imports
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import { toast } from "sonner";

// ---------------------------------------------------------------------------
// DatePickerVoucher Component
// ---------------------------------------------------------------------------
type DatePickerVoucherProps = {
  value: string;
  onChange: (dateString: string) => void;
};

function DatePickerVoucher({ value, onChange }: DatePickerVoucherProps) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date>();
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// ---------------------------------------------------------------------------
// Define the Voucher type and dummy data
// ---------------------------------------------------------------------------
type Voucher = {
  id: string;
  code: string;
  discount: string;
  expiry: string;
  usageCount: number;
};

const dummyVouchers: Voucher[] = [
  { id: "1", code: "WELCOME10", discount: "10%", expiry: "2025-12-31", usageCount: 50 },
  { id: "2", code: "SUMMER20", discount: "20%", expiry: "2023-08-31", usageCount: 30 },
  { id: "3", code: "FALL15", discount: "15%", expiry: "2024-10-15", usageCount: 70 },
  { id: "4", code: "SPRING25", discount: "25%", expiry: "2023-04-30", usageCount: 20 },
];

// ---------------------------------------------------------------------------
// Chart configuration (similar to the reference code)
// ---------------------------------------------------------------------------
const chartConfig: ChartConfig = {
  desktop: {
    label: "Usage Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// ---------------------------------------------------------------------------
// Main VouchersPage Component
// ---------------------------------------------------------------------------
export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>(dummyVouchers);
  const [openDialog, setOpenDialog] = useState(false);
  const [voucherForm, setVoucherForm] = useState<{
    id?: string;
    code: string;
    discount: string;
    expiry: string;
  }>({
    code: "",
    discount: "",
    expiry: "",
  });

  // Table state management
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Define table columns (with action handlers in scope)
  const voucherColumns: ColumnDef<Voucher>[] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "discount",
      header: "Discount",
    },
    {
      accessorKey: "expiry",
      header: "Expiry Date",
    },
    {
      accessorKey: "usageCount",
      header: () => <div className="text-right">Usage Count</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue("usageCount")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const voucher = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEditVoucher(voucher)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteVoucher(voucher.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Create table instance using TanStack React Table
  const table = useReactTable({
    data: vouchers,
    columns: voucherColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Prepare chart data for the chart card
  const chartData = vouchers.map((v) => ({
    code: v.code,
    usageCount: v.usageCount,
  }));

  // Handlers for voucher CRUD operations
  const handleAddVoucher = () => {
    setVoucherForm({ code: "", discount: "", expiry: "" });
    setOpenDialog(true);
  };

  const handleEditVoucher = (voucher: Voucher) => {
    setVoucherForm({
      id: voucher.id,
      code: voucher.code,
      discount: voucher.discount,
      expiry: voucher.expiry,
    });
    setOpenDialog(true);
  };

  const handleDeleteVoucher = (id: string) => {
    setVouchers((prev) => prev.filter((v) => v.id !== id));
    toast.success("Voucher deleted.");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherForm.id) {
      // Update voucher
      setVouchers((prev) =>
        prev.map((v) =>
          v.id === voucherForm.id
            ? { ...v, ...voucherForm, usageCount: v.usageCount }
            : v
        )
      );
      toast.success("Voucher updated.");
    } else {
      // Add new voucher (generate a new id and default usageCount)
      const newVoucher: Voucher = {
        id: Date.now().toString(),
        code: voucherForm.code,
        discount: voucherForm.discount,
        expiry: voucherForm.expiry,
        usageCount: 0,
      };
      setVouchers((prev) => [...prev, newVoucher]);
      toast.success("Voucher added.");
    }
    setOpenDialog(false);
  };

  const handleFormCancel = () => {
    setOpenDialog(false);
    setVoucherForm({ code: "", discount: "", expiry: "" });
  };

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-3xl font-bold">Vouchers</h1>

      {/* Controls above the table */}
      <div className="flex items-center justify-end gap-2">
        <div className="flex items-center">
          <Input
            placeholder="Filter codes..."
            value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("code")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAddVoucher}>
              <Plus className="h-4 w-4" />
              Add Voucher
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {voucherForm.id ? "Edit Voucher" : "Add Voucher"}
              </DialogTitle>
              <DialogDescription>
                {voucherForm.id
                  ? "Update the voucher details."
                  : "Fill in the details to add a new voucher."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Code
                </Label>
                <Input
                  value={voucherForm.code}
                  onChange={(e) =>
                    setVoucherForm((prev) => ({ ...prev, code: e.target.value }))
                  }
                  placeholder="Voucher code"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount
                </Label>
                <Input
                  value={voucherForm.discount}
                  onChange={(e) =>
                    setVoucherForm((prev) => ({ ...prev, discount: e.target.value }))
                  }
                  placeholder="e.g., 10%"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </Label>
                {/* Use the custom DatePickerVoucher for date selection */}
                <DatePickerVoucher
                  value={voucherForm.expiry}
                  onChange={(newDate) =>
                    setVoucherForm((prev) => ({ ...prev, expiry: newDate }))
                  }
                />
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleFormCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {voucherForm.id ? "Update Voucher" : "Add Voucher"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={voucherColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        <Card>
          <CardHeader>
            <CardTitle>Voucher Usage Chart</CardTitle>
            <CardDescription>Overview of voucher usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="code"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="usageCount" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>Cumulative voucher usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="code"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="usageCount"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-2)/.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
