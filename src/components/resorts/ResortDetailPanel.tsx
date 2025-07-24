import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

interface ResortDetailData {
  resortName: string;
  contactPersonName: string;
  contactNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  cityDistrict: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  logo?: string | null;
  website: string;
  foodProviding: string;
  foodDetails: string;
  roomIdPrefix: string;
  extraGuestCharges: string;
  supportNumber: string;
  imageUrl?: string;
}

interface ResortDetailPanelProps {
  resort: ResortDetailData;
  isOpen: boolean;
  onClose: () => void;
}

const ResortDetailPanel = ({ resort, isOpen, onClose }: ResortDetailPanelProps) => {
  if (!isOpen) return null;

  const basicInfoData = [
    { field: "Resort Name", value: resort.resortName },
    { field: "Contact Person Name", value: resort.contactPersonName },
    { field: "Contact Number", value: resort.contactNumber },
    { field: "Email", value: resort.email },
    { field: "Website", value: resort.website },
    { field: "Support Number", value: resort.supportNumber },
    { field: "Room ID Prefix", value: resort.roomIdPrefix },
  ];

  const addressData = [
    { field: "Address Line 1", value: resort.addressLine1 },
    { field: "Address Line 2", value: resort.addressLine2 },
    { field: "City / District", value: resort.cityDistrict },
    { field: "State / Province", value: resort.stateProvince },
    { field: "Postal Code", value: resort.postalCode },
    { field: "Country", value: resort.country },
  ];

  const foodData = [
    { field: "Food Providing", value: resort.foodProviding },
    { field: "Extra Guest Charges", value: resort.extraGuestCharges },
  ];

  const foodDetailsData = [
    { field: "Food Details", value: resort.foodDetails },
  ];

  const infoColumns: ColumnDef<{ field: string; value: string }>[] = [
    {
      accessorKey: "field",
      header: "Field",
      cell: ({ row }) => (
        <div className="font-medium text-slate-700 min-w-[120px]">
          {row.getValue("field")}
        </div>
      ),
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => {
        const value = row.getValue("value") as string;
        const field = row.getValue("field") as string;

        if (field === "Email") {
          return (
            <a
              href={`mailto:${value}`}
              className="text-blue-600 hover:text-blue-800 underline break-all"
            >
              {value}
            </a>
          );
        }

        if (field === "Website") {
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline break-all"
            >
              {value}
            </a>
          );
        }

        return <div className="text-slate-600 break-words">{value}</div>;
      },
    },
  ];

  const textAreaColumns: ColumnDef<{ field: string; value: string }>[] = [
    {
      accessorKey: "field",
      header: "Field",
      cell: ({ row }) => (
        <div className="font-medium text-slate-700 min-w-[120px]">
          {row.getValue("field")}
        </div>
      ),
    },
    {
      accessorKey: "value",
      header: "Content",
      cell: ({ row }) => {
        const value = row.getValue("value") as string;
        return (
          <div className="text-slate-600 whitespace-pre-wrap break-words max-w-full">
            {value}
          </div>
        );
      },
    },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-3/4 lg:w-1/2 bg-white shadow-xl overflow-y-auto border-l border-slate-200">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Resort Details</h2>
            <p className="text-sm text-slate-600">View resort information</p>
          </div>
          <Button variant="outline" size="icon" onClick={onClose} className="p-2">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <SectionHeader title="Basic Information" />
          <DataTable columns={infoColumns} data={basicInfoData} />

          {resort.logo && (
            <div className="flex flex-col space-y-2">
              <h4 className="text-sm font-medium text-slate-700">Resort Logo</h4>
              <div className="border border-slate-300 rounded-lg p-4 bg-slate-50 w-fit">
                <img
                  src={resort.logo}
                  alt="Resort Logo"
                  className="max-w-32 max-h-32 object-contain"
                />
              </div>
            </div>
          )}

          <SectionHeader title="Address Information" />
          <DataTable columns={infoColumns} data={addressData} />

          <SectionHeader title="Food Information" />
          <DataTable columns={infoColumns} data={foodData} />
          <DataTable columns={textAreaColumns} data={foodDetailsData} />
        </div>
      </div>
    </div>
  );
};

export default ResortDetailPanel;

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
    {title}
  </h3>
);

const DataTable = ({
  columns,
  data,
}: {
  columns: ColumnDef<any>[];
  data: any[];
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-3 text-left font-medium text-slate-700">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-100">
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`hover:bg-slate-50 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-slate-25"
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-3 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
