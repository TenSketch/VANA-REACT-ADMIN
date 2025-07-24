import { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Edit2,
  Trash2,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CottageType {
  id: string;
  cottageName: string;
  resort: string;
  description: string;
  roomAmenities: string[];
}

const CottageTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalFilter(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const cottageTypes: CottageType[] = useMemo(() => [
    {
      id: "1",
      cottageName: "Deluxe Cottage",
      resort: "Jungle Star, Valamuru",
      description: "Spacious cottage with modern amenities and forest view",
      roomAmenities: ["Air Conditioning", "WiFi", "Television", "Mini Bar"],
    },
    {
      id: "2",
      cottageName: "Premium Villa",
      resort: "Vanavihari, Maredumilli",
      description: "Luxury villa with private balcony and eco-friendly features",
      roomAmenities: ["Air Conditioning", "WiFi", "Balcony", "Safe Deposit Box"],
    },
    {
      id: "3",
      cottageName: "Standard Room",
      resort: "Jungle Star, Valamuru",
      description: "Comfortable accommodation with basic amenities",
      roomAmenities: ["WiFi", "Television", "Hair Dryer"],
    },
    {
      id: "4",
      cottageName: "Eco Cottage",
      resort: "Vanavihari, Maredumilli",
      description: "Environment-friendly cottage with natural materials",
      roomAmenities: ["WiFi", "Balcony", "Room Service"],
    },
  ], []);

  const handleEdit = useCallback((cottageType: CottageType) => {
    console.log("Edit:", cottageType);
  }, []);

  const handleDelete = useCallback((cottageType: CottageType) => {
    console.log("Delete:", cottageType);
  }, []);

  const columns: ColumnDef<CottageType>[] = useMemo(() => [
    {
      accessorKey: "cottageName",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto p-0 text-xs font-medium">
          Name <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-slate-800 text-xs sm:text-sm truncate">
          {row.getValue("cottageName")}
        </div>
      ),
    },
    {
      accessorKey: "resort",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto p-0 text-xs font-medium">
          Resort <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-600 text-xs sm:text-sm truncate">
          {(row.getValue("resort") as string).split(",")[0]}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-slate-600 text-xs sm:text-sm line-clamp-2">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "roomAmenities",
      header: "Amenities",
      cell: ({ row }) => {
        const amenities = row.getValue("roomAmenities") as string[];
        return (
          <div className="flex flex-wrap gap-0.5">
            {amenities.slice(0, 1).map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-1 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-800 truncate max-w-[60px]"
              >
                {item}
              </span>
            ))}
            {amenities.length > 1 && (
              <span
                className="inline-flex items-center px-1 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-600"
                title={amenities.join(", ")}
              >
                +{amenities.length - 1}
              </span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const cottage = row.original;
        return (
          <div className="flex gap-0.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(cottage)}
              className="h-5 w-5 p-0"
            >
              <Edit2 className="h-2.5 w-2.5 text-slate-600" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(cottage)}
              className="h-5 w-5 p-0 border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-2.5 w-2.5" />
            </Button>
          </div>
        );
      },
    },
  ], [handleEdit, handleDelete]);

  const table = useReactTable({
    data: cottageTypes,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    initialState: {
      pagination: { pageSize: 8 },
    },
    enableColumnFilters: true,
    enableGlobalFilter: true,
    autoResetPageIndex: false,
    autoResetExpanded: false,
  });

  const handleGlobalFilterChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleResortFilterChange = useCallback((value: string) => {
    table.getColumn("resort")?.setFilterValue(value === "all" ? "" : value);
  }, [table]);

  return (
    <div className="w-full min-h-screen p-4 bg-slate-50">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-800">Cottage Types</h2>
          <p className="text-sm text-slate-600">Manage cottages across all resorts</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-9"
              value={searchInput}
              onChange={(e) => handleGlobalFilterChange(e.target.value)}
            />
          </div>

          <Select
            value={(table.getColumn("resort")?.getFilterValue() as string) ?? ""}
            onValueChange={handleResortFilterChange}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter resort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resorts</SelectItem>
              <SelectItem value="Jungle Star, Valamuru">Jungle Star</SelectItem>
              <SelectItem value="Vanavihari, Maredumilli">Vanavihari</SelectItem>
            </SelectContent>
          </Select>

          <Button>Add New</Button>
        </div>

        <div className="overflow-x-auto border rounded-lg bg-white">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id}>
                  {group.headers.map((header) => (
                    <TableHead key={header.id} className="text-left text-xs font-semibold text-slate-700">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
                      <TableCell key={cell.id} className="text-left text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6 text-slate-500">
                    No cottage types found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between text-sm text-slate-600">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CottageTable;
