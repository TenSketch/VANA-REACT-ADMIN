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

  // Debounce search input to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalFilter(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Memoize the cottage data to prevent unnecessary re-renders
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
      description:
        "Luxury villa with private balcony and eco-friendly features",
      roomAmenities: [
        "Air Conditioning",
        "WiFi",
        "Balcony",
        "Safe Deposit Box",
      ],
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

  // Memoize handlers to prevent unnecessary re-renders
  const handleEdit = useCallback((cottageType: CottageType) => {
    console.log("Edit:", cottageType);
  }, []);

  const handleDelete = useCallback((cottageType: CottageType) => {
    console.log("Delete:", cottageType);
  }, []);

  // Memoize columns to prevent unnecessary re-renders
  const columns: ColumnDef<CottageType>[] = useMemo(() => [
    {
      accessorKey: "cottageName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="h-auto p-0 text-xs font-medium"
        >
          Name <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-slate-800 text-xs w-[80px] sm:w-[120px] truncate">
          {row.getValue("cottageName")}
        </div>
      ),
    },
    {
      accessorKey: "resort",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="h-auto p-0 text-xs font-medium"
        >
          Resort <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-600 text-xs w-[70px] sm:w-[100px] truncate">
          {(row.getValue("resort") as string).split(",")[0]}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-slate-600 text-xs w-[90px] sm:w-[150px] line-clamp-2">
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
          <div className="flex flex-wrap gap-0.5 w-[80px] sm:w-[120px]">
            {amenities.slice(0, 1).map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate max-w-[60px]"
              >
                {item}
              </span>
            ))}
            {amenities.length > 1 && (
              <span
                className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600"
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
          <div className="flex gap-0.5 w-[50px]">
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

  // Memoize table configuration for better performance
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
      pagination: { pageSize: 8 }, // Increased for better mobile experience
    },
    // Enable column filters optimization
    enableColumnFilters: true,
    // Enable global filtering optimization
    enableGlobalFilter: true,
    // Disable auto-reset to prevent unnecessary re-renders
    autoResetPageIndex: false,
    autoResetExpanded: false,
  });

  // Debounced filter change handlers for better performance
  const handleGlobalFilterChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleResortFilterChange = useCallback((value: string) => {
    table.getColumn("resort")?.setFilterValue(value === "all" ? "" : value);
  }, [table]);

  return (
    <div className="w-full min-h-screen p-2 sm:p-4 lg:p-6 bg-slate-50">
      <div className="w-full max-w-full mx-auto space-y-3 sm:space-y-4 lg:space-y-6 overflow-hidden">
        <div className="space-y-1 px-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">Cottage Types</h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600">Manage cottages across all resorts</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:gap-3 px-1">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 h-3 w-3 sm:h-4 sm:w-4" />
            <Input
              placeholder="Search..."
              className="pl-7 sm:pl-9 w-full text-sm"
              value={searchInput}
              onChange={(e) => handleGlobalFilterChange(e.target.value)}
            />
          </div>

          <Select
            value={(table.getColumn("resort")?.getFilterValue() as string) ?? ""}
            onValueChange={handleResortFilterChange}
          >
            <SelectTrigger className="w-full sm:w-[180px] lg:w-[200px] text-sm">
              <SelectValue placeholder="Filter resort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resorts</SelectItem>
              <SelectItem value="Jungle Star, Valamuru">Jungle Star</SelectItem>
              <SelectItem value="Vanavihari, Maredumilli">Vanavihari</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full sm:w-auto whitespace-nowrap text-sm px-3">Add New</Button>
        </div>

        {/* Table */}
        <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm mx-1">
          <div className="overflow-x-auto">
            <Table className="w-full table-fixed">
              <TableHeader>
                {table.getHeaderGroups().map((group) => (
                  <TableRow key={group.id} className="bg-slate-50">
                    {group.headers.map((header) => (
                      <TableHead key={header.id} className="px-1 sm:px-2 py-2 text-xs font-medium text-slate-700 whitespace-nowrap">
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
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow 
                      key={row.id} 
                      className={`hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-1 sm:px-2 py-2 text-xs">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-slate-500 py-6 text-xs">
                      No cottage types found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-600 px-1">
          <div className="text-center sm:text-left">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center justify-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-xs px-2 py-1 h-7"
            >
              <ChevronLeft className="w-3 h-3" />
              <span className="hidden sm:inline ml-1">Prev</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-xs px-2 py-1 h-7"
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CottageTable;
