import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface CottageType {
  id: string;
  cottageName: string;
  resort: string;
  description: string;
  roomAmenities: string[];
}

const CottageTable = () => {
  // Sample cottage types data - in real app, this would come from API
  const cottageTypes: CottageType[] = [
    {
      id: "1",
      cottageName: "Deluxe Cottage",
      resort: "Jungle Star, Valamuru",
      description: "Spacious cottage with modern amenities and forest view",
      roomAmenities: ["Air Conditioning", "WiFi", "Television", "Mini Bar"]
    },
    {
      id: "2",
      cottageName: "Premium Villa",
      resort: "Vanavihari, Maredumilli",
      description: "Luxury villa with private balcony and eco-friendly features",
      roomAmenities: ["Air Conditioning", "WiFi", "Balcony", "Safe Deposit Box"]
    },
    {
      id: "3",
      cottageName: "Standard Room",
      resort: "Jungle Star, Valamuru",
      description: "Comfortable accommodation with basic amenities",
      roomAmenities: ["WiFi", "Television", "Hair Dryer"]
    },
    {
      id: "4",
      cottageName: "Eco Cottage",
      resort: "Vanavihari, Maredumilli",
      description: "Environment-friendly cottage with natural materials",
      roomAmenities: ["WiFi", "Balcony", "Room Service"]
    },
    {
      id: "5",
      cottageName: "Family Suite",
      resort: "Jungle Star, Valamuru",
      description: "Large suite perfect for families with multiple rooms",
      roomAmenities: ["Air Conditioning", "WiFi", "Television", "Mini Bar", "Safe Deposit Box"]
    },
    {
      id: "4",
      cottageName: "Eco Cottage",
      resort: "Vanavihari, Maredumilli",
      description: "Environment-friendly cottage with natural materials",
      roomAmenities: ["WiFi", "Balcony", "Room Service"]
    },
    {
      id: "4",
      cottageName: "Eco Cottage",
      resort: "Vanavihari, Maredumilli",
      description: "Environment-friendly cottage with natural materials",
      roomAmenities: ["WiFi", "Balcony", "Room Service"]
    },
    {
      id: "4",
      cottageName: "Eco Cottage",
      resort: "Vanavihari, Maredumilli",
      description: "Environment-friendly cottage with natural materials",
      roomAmenities: ["WiFi", "Balcony", "Room Service"]
    }

  ];

  const handleEdit = (cottageType: CottageType) => {
    console.log("Edit cottage type:", cottageType);
    // Handle edit logic here
  };

  const handleDelete = (cottageType: CottageType) => {
    console.log("Delete cottage type:", cottageType);
    // Handle delete logic here
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">
            Cottage Types
          </h1>
          <p className="text-slate-600">
            List of all cottage types and their details
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Cottage Name</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Select Resort</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Cottage Type Description</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Room Amenities</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cottageTypes.map((cottageType, index) => (
                  <tr 
                    key={cottageType.id} 
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-800">{cottageType.cottageName}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-600">{cottageType.resort}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-600 max-w-xs">
                        {cottageType.description}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {cottageType.roomAmenities.map((amenity, amenityIndex) => (
                          <span 
                            key={amenityIndex}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(cottageType)}
                          className="h-8 w-8 p-0 border-slate-300 hover:bg-slate-50"
                        >
                          <Edit2 className="h-4 w-4 text-slate-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(cottageType)}
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
  );
};

export default CottageTable;
