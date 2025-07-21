import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface Amenity {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

const AllRoomAmenitiesTable = () => {
  const amenities: Amenity[] = [
    { id: "1", name: "Air Conditioning", description: "Climate control system", isActive: true },
    { id: "2", name: "WiFi", description: "High-speed internet access", isActive: true },
    { id: "3", name: "Television", description: "Flat-screen TV with cable channels", isActive: true },
    { id: "4", name: "Mini Bar", description: "Refrigerated mini bar with beverages", isActive: true },
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

  const handleEdit = (amenity: Amenity) => {
    console.log("Edit amenity:", amenity);
  };

  const handleDelete = (amenity: Amenity) => {
    console.log("Delete amenity:", amenity);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Room Amenities</h1>
          <p className="text-slate-600">List of all room amenities</p>
        </div>

        {/* Table Wrapper */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="overflow-x-auto">
            {/* 👇 Change height here by updating max-h-[Xpx] */}
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                  <tr>
                    <th className="py-4 px-6 font-medium text-slate-700">Amenity Name</th>
                    <th className="py-4 px-6 font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {amenities.map((amenity, index) => (
                    <tr
                      key={amenity.id + index}
                      className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-25"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{amenity.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoomAmenitiesTable;
