"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type CandidateColumn = {
    firstName: string
    lastName: string
    interviewRefNo: string
    major: "web_design" | "web_programming" | "web_marketing" | "web_content"
}

export const columns: ColumnDef<CandidateColumn>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <button
        className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ชื่อจริง
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <button
        className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          นามสกุล
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
  },
  {
    accessorKey: "interviewRefNo",
    header: "รหัสสัมภาษณ์",
  },
  {
    accessorKey: "major",
    header: "สาขา",
  }
]
