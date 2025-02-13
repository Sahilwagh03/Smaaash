"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Booking[] = [
  {
    id: "b1",
    name: "John Doe",
    phone: "9876543210",
    bookingType: "Bowling",
    amountPaid: 500,
    paymentStatus: "success",
  },
  {
    id: "b2",
    name: "Alice Smith",
    phone: "9123456789",
    bookingType: "Go-Karting",
    amountPaid: 1200,
    paymentStatus: "pending",
  },
  {
    id: "b3",
    name: "Robert Brown",
    phone: "9012345678",
    bookingType: "VR",
    amountPaid: 800,
    paymentStatus: "failed",
  },
]

export type Booking = {
  id: string
  name: string
  phone: string
  bookingType: "Bowling" | "Cricket" | "VR" | "Go-Karting"
  amountPaid: number
  paymentStatus: "pending" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "name",
    header: "Booking Name",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "bookingType",
    header: "Booking Type",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
    cell: ({ row }) => <div className="text-right">₹{row.getValue("amountPaid")}</div>,
  },
]

export function BookingTable() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { columnFilters },
  })

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Search Name or Phone..."
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter Booking Type <ChevronDown /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {["Bowling", "Cricket", "VR", "Go-Karting"].map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={table.getColumn("bookingType")?.getFilterValue() === type}
                onCheckedChange={(value) =>
                  table.getColumn("bookingType")?.setFilterValue(value ? type : "")
                }
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}