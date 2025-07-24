import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
      accessToken: "access-abc123",
    },
    {
      id: "G002",
      fullName: "Priya Reddy",
      phone: "+91 9001234567",
      email: "priya@example.com",
      address: "456 Blue Lane, Vijayawada, AP",
      registrationDate: "2025-07-16",
      emailVerificationToken: "verify-456",
      accessToken: "access-def456",
    },
    {
      id: "G003",
      fullName: "Vikram Singh",
      phone: "+91 9810012312",
      email: "vikram@example.com",
      address: "789 Sunset Blvd, Bengaluru, Karnataka",
      registrationDate: "2025-07-17",
      emailVerificationToken: "verify-789",
      accessToken: "access-ghi789",
    },
    // Add more guests...
  ];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const filteredGuests = useMemo(() => {
    return guests.filter(
      (guest) =>
        guest.fullName.toLowerCase().includes(search.toLowerCase()) ||
        guest.email.toLowerCase().includes(search.toLowerCase()) ||
        guest.phone.includes(search)
    );
  }, [search, guests]);

  const paginatedGuests = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredGuests.slice(start, start + rowsPerPage);
  }, [filteredGuests, page]);

  const totalPages = Math.ceil(filteredGuests.length / rowsPerPage);

  const handleEdit = (guest: Guest) => {
    console.log("Edit guest:", guest);
  };

  const handleDelete = (guest: Guest) => {
    console.log("Delete guest:", guest);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-slate-800 mb-1">
            Guest Records
          </h1>
          <p className="text-slate-600 mb-4">
            List of all registered guests and their details.
          </p>
          <Input
            placeholder="Search by name, email, or phone"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-sm"
          />
        </div>

        <div className="overflow-auto rounded border bg-white">
          <Table className="min-w-[1200px]">
            <TableHeader>
              <TableRow>
                <TableHead>Guest ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Reg. Date</TableHead>
                <TableHead>Email Token</TableHead>
                <TableHead>Access Token</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.id}</TableCell>
                  <TableCell>{guest.fullName}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{guest.address}</TableCell>
                  <TableCell>{guest.registrationDate}</TableCell>
                  <TableCell>{guest.emailVerificationToken}</TableCell>
                  <TableCell>{guest.accessToken}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(guest)}
                      >
                        <Edit2 className="h-4 w-4 text-slate-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(guest)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedGuests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-slate-500">
                    No guests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuestTable;
