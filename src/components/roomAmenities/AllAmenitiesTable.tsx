import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";

interface Amenity {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

const AllRoomAmenitiesTable = () => {
  const [search, setSearch] = useState("");

  const amenities: Amenity[] = [
    { id: "1", name: "Air Conditioning", description: "Climate control system", isActive: true },
    { id: "2", name: "WiFi", description: "High-speed internet access", isActive: true },
    { id: "3", name: "Television", description: "Flat-screen TV with cable channels", isActive: true },
    { id: "5", name: "Safe Deposit Box", description: "In-room security safe", isActive: true },
    { id: "6", name: "Hair Dryer", description: "Electric hair dryer", isActive: false },
    { id: "7", name: "Balcony", description: "Private balcony with outdoor seating", isActive: true },
    { id: "8", name: "Room Service", description: "24/7 room service available", isActive: true },
    { id: "9", name: "Desk", description: "Writing desk and chair", isActive: true },
    { id: "10", name: "Coffee Maker", description: "In-room coffee and tea setup", isActive: true },
    { id: "11", name: "Iron", description: "Iron and ironing board", isActive: true },
    { id: "12", name: "Slippers", description: "Complimentary slippers", isActive: true },
    { id: "13", name: "Toiletries", description: "Basic toiletries provided", isActive: true },
    { id: "14", name: "Towels", description: "Fresh towels daily", isActive: true },
    { id: "15", name: "Fan", description: "Ceiling or pedestal fan", isActive: true },
  ];

  const filteredAmenities = amenities.filter((amenity) =>
    amenity.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (amenity: Amenity) => {
    console.log("Edit amenity:", amenity);
  };

  const handleDelete = (amenity: Amenity) => {
    console.log("Delete amenity:", amenity);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Room Amenities</h1>
          <Input
            placeholder="Search amenities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>

        <div className="rounded-lg border bg-white">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3 text-left">Amenity Name</TableHead>
                <TableHead className="px-6 py-3 text-left">Description</TableHead>
                <TableHead className="px-6 py-3 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAmenities.map((amenity) => (
                <TableRow key={amenity.id}>
                  <TableCell className="px-6 py-4 text-left font-medium text-slate-800">{amenity.name}</TableCell>
                  <TableCell className="px-6 py-4 text-left text-slate-700">{amenity.description}</TableCell>
                  <TableCell className="px-6 py-4 text-left">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(amenity)}
                        className="h-8 w-8 p-0 border-slate-300 hover:bg-slate-50"
                      >
                        <Edit2 className="h-4 w-4 text-slate-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(amenity)}
                        className="h-8 w-8 p-0 border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllRoomAmenitiesTable;
