import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface Guest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  registrationDate: string;
  emailVerificationToken: string;
  accessToken: string;
}

const GuestTable = () => {
  const guests: Guest[] = [
    {
      id: "G001",
      fullName: "Arjun Mehta",
      phone: "+91 9876543210",
      email: "arjun@example.com",
      address: "123 Green Street, Hyderabad, Telangana",
      registrationDate: "2025-07-15",
      emailVerificationToken: "verify-123",
      accessToken: "access-abc123"
    },
    {
      id: "G002",
      fullName: "Priya Reddy",
      phone: "+91 9001234567",
      email: "priya@example.com",
      address: "456 Blue Lane, Vijayawada, AP",
      registrationDate: "2025-07-16",
      emailVerificationToken: "verify-456",
      accessToken: "access-def456"
    },
    // (Other guests repeated...)
  ];

  const handleEdit = (guest: Guest) => {
    console.log("Edit guest:", guest);
  };

  const handleDelete = (guest: Guest) => {
    console.log("Delete guest:", guest);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">
            Guest Records
          </h1>
          <p className="text-slate-600">
            List of all registered guests and their information
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="w-full overflow-auto max-h-[500px] border rounded">
            <table className="min-w-[1600px] text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Guest ID</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Full Name</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Phone</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Email</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Address</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Registration Date</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Email Verification Token</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Access Token</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest, index) => (
                  <tr
                    key={guest.id + index}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                    }`}
                  >
                    <td className="py-4 px-6">{guest.id}</td>
                    <td className="py-4 px-6">{guest.fullName}</td>
                    <td className="py-4 px-6">{guest.phone}</td>
                    <td className="py-4 px-6">{guest.email}</td>
                    <td className="py-4 px-6 max-w-xs truncate">{guest.address}</td>
                    <td className="py-4 px-6">{guest.registrationDate}</td>
                    <td className="py-4 px-6">{guest.emailVerificationToken}</td>
                    <td className="py-4 px-6">{guest.accessToken}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(guest)}
                          className="h-8 w-8 p-0 border-slate-300 hover:bg-slate-50"
                        >
                          <Edit2 className="h-4 w-4 text-slate-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(guest)}
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

export default GuestTable;
