"use client"
import * as React from "react"
import {
  ColumnDef,
    SortingState,
    getSortedRowModel,
      ColumnFiltersState,
        getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table"

import { Input } from "../components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select"
import { Button } from "../components/ui/Button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
        columnFilters,
    }
  })

  return (
    <div className="rounded-md text-white">
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center">
            <div className="flex items-center py-4">
                <Input
                    placeholder="กรองด้วยชื่อ"
                    value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("firstName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white border-2 border-black text-black"
                />
            </div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="กรองด้วยนามสกุล"
                    value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("lastName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white border-2 border-black text-black"
                />
            </div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="กรองด้วยรหัสสัมภาษณ์"
                    value={(table.getColumn("interviewRefNo")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("interviewRefNo")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white border-2 border-black text-black"
                />
            </div>
            <div className="flex items-center py-4">
                <Select onValueChange={(value) => table.getColumn("major")?.setFilterValue(value)} defaultValue={table.getColumn("major")?.getFilterValue() as string}>
                    <SelectTrigger className="w-[180px] bg-white border-2 border-black text-black">
                        <SelectValue placeholder="กรองด้วยสาขา" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="web_design">Web Design</SelectItem>
                        <SelectItem value="web_content">Web Content</SelectItem>
                        <SelectItem value="web_marketing">Web Marketing</SelectItem>
                        <SelectItem value="web_programming">Web Programming</SelectItem>
                    </SelectContent>
                </Select>
                {table.getColumn("major")?.getFilterValue() as string && (
                    <Button
                        className="h-full cursor-pointer py-3"
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            table.getColumn("major")?.setFilterValue(null)
                        }}
                    >
                        Clear
                    </Button>
                )}
            </div>
        </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
