"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {  QrCode } from "lucide-react";
import { Button } from "./ui/button";


interface DataTableProps<Cards, TValue> {
  columns: ColumnDef<Cards, TValue>[];
  data: Cards[];
}
export type Cards = {
  imgHash: string;
  docHash: string;
};

import React from 'react';
import {  QRCode } from 'antd';

const downloadQRCode = (value: string) => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

export const columns: ColumnDef<Cards>[] = [
  {
    accessorKey: "imgHash",
    header: "Image Hash",
  },
  {
    accessorKey: "docHash",
    header: "Document Hash",
  },
  {
    id: "actions",
    cell: ({ row }) => {
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <QrCode className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>QR CODE</DropdownMenuLabel>
            <div id="myqrcode">
    <QRCode value="{`https://fuchsia-definite-fowl-804.mypinata.cloud/ipfs/${row.original.docHash}`}" bgColor="#fff" style={{ marginBottom: 16 }} />
    <Button type="submit"  onClick={() => downloadQRCode(row.original.docHash)}>
      Download
    </Button>
  </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="font-bold text-center" key={headerGroup.id}>
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
                );
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
  );
}
