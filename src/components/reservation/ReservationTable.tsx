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

interface ReservationTable {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  children: number;
  extraGuests: number;
  rooms: number;
  totalGuests: number;
  noOfDays: number;
  noOfFoods: number;
  resort: string;
  roomTypes: string[];
  bookingId: string;
  status: string;
  reservationDate: string;
  paymentStatus: string;
  refundPercent: string;
}

const ReservationTable = () => {
  const [search, setSearch] = useState("");

  //sample data
const reservations = [
  {
    id: "1",
    fullName: "John Doe",
    phone: "1234567890",
    email: "john@example.com",
    checkIn: "2025-07-25",
    checkOut: "2025-07-28",
    guests: 2,
    children: 1,
    extraGuests: 0,
    rooms: 1,
    totalGuests: 3,
    noOfDays: 3,
    noOfFoods: 9,
    resort: "Vanavihari",
    roomTypes: ["Bear", "Chital"],
    bookingId: "BK-1234",
    status: "Reserved",
    reservationDate: "2025-07-01",
    paymentStatus: "Paid",
    refundPercent: "50%",
  },
  {
    id: "2",
    fullName: "Alice Smith",
    phone: "9876543210",
    email: "alice@example.com",
    checkIn: "2025-08-10",
    checkOut: "2025-08-13",
    guests: 4,
    children: 2,
    extraGuests: 1,
    rooms: 2,
    totalGuests: 7,
    noOfDays: 3,
    noOfFoods: 21,
    resort: "Jungle Star",
    roomTypes: ["Bulbul", "Woodpecker"],
    bookingId: "BK-1235",
    status: "Reserved",
    reservationDate: "2025-07-15",
    paymentStatus: "Not Paid",
    refundPercent: "0%",
  },
  {
    id: "3",
    fullName: "Ravi Kumar",
    phone: "9123456780",
    email: "ravi.kumar@example.com",
    checkIn: "2025-09-01",
    checkOut: "2025-09-04",
    guests: 1,
    children: 0,
    extraGuests: 0,
    rooms: 1,
    totalGuests: 1,
    noOfDays: 3,
    noOfFoods: 3,
    resort: "Vanavihari",
    roomTypes: ["Chousingha"],
    bookingId: "BK-1236",
    status: "Not Reserved",
    reservationDate: "2025-08-20",
    paymentStatus: "Not Paid",
    refundPercent: "100%",
  },
  {
    id: "4",
    fullName: "Fatima Ali",
    phone: "9988776655",
    email: "fatima@example.com",
    checkIn: "2025-10-15",
    checkOut: "2025-10-18",
    guests: 2,
    children: 1,
    extraGuests: 1,
    rooms: 2,
    totalGuests: 4,
    noOfDays: 3,
    noOfFoods: 12,
    resort: "Jungle Star",
    roomTypes: ["Bear", "Woodpecker"],
    bookingId: "BK-1237",
    status: "Reserved",
    reservationDate: "2025-09-30",
    paymentStatus: "Paid",
    refundPercent: "75%",
  },
  {
    id: "5",
    fullName: "Emma Johnson",
    phone: "8001234567",
    email: "emma.johnson@example.com",
    checkIn: "2025-07-29",
    checkOut: "2025-08-02",
    guests: 3,
    children: 0,
    extraGuests: 1,
    rooms: 2,
    totalGuests: 4,
    noOfDays: 4,
    noOfFoods: 16,
    resort: "Vanavihari",
    roomTypes: ["Bulbul", "Chital"],
    bookingId: "BK-1238",
    status: "Reserved",
    reservationDate: "2025-07-10",
    paymentStatus: "Paid",
    refundPercent: "25%",
  },
  {
    id: "6",
    fullName: "Arjun Mehta",
    phone: "9876102030",
    email: "arjun.mehta@example.com",
    checkIn: "2025-08-20",
    checkOut: "2025-08-24",
    guests: 2,
    children: 0,
    extraGuests: 0,
    rooms: 1,
    totalGuests: 2,
    noOfDays: 4,
    noOfFoods: 8,
    resort: "Jungle Star",
    roomTypes: ["Chousingha"],
    bookingId: "BK-1239",
    status: "Reserved",
    reservationDate: "2025-08-01",
    paymentStatus: "Not Paid",
    refundPercent: "0%",
  },
  {
    id: "7",
    fullName: "Lina Ray",
    phone: "7733445566",
    email: "lina.ray@example.com",
    checkIn: "2025-09-10",
    checkOut: "2025-09-15",
    guests: 5,
    children: 2,
    extraGuests: 0,
    rooms: 3,
    totalGuests: 7,
    noOfDays: 5,
    noOfFoods: 35,
    resort: "Vanavihari",
    roomTypes: ["Bear", "Bulbul", "Woodpecker"],
    bookingId: "BK-1240",
    status: "Not Reserved",
    reservationDate: "2025-08-25",
    paymentStatus: "Not Paid",
    refundPercent: "0%",
  },
  {
    id: "8",
    fullName: "David Lee",
    phone: "9021345678",
    email: "david.lee@example.com",
    checkIn: "2025-07-27",
    checkOut: "2025-07-29",
    guests: 2,
    children: 0,
    extraGuests: 0,
    rooms: 1,
    totalGuests: 2,
    noOfDays: 2,
    noOfFoods: 4,
    resort: "Jungle Star",
    roomTypes: ["Chital"],
    bookingId: "BK-1241",
    status: "Reserved",
    reservationDate: "2025-07-12",
    paymentStatus: "Paid",
    refundPercent: "50%",
  },
  {
    id: "9",
    fullName: "Megha Sharma",
    phone: "9845123456",
    email: "megha.sharma@example.com",
    checkIn: "2025-08-05",
    checkOut: "2025-08-08",
    guests: 3,
    children: 1,
    extraGuests: 0,
    rooms: 2,
    totalGuests: 4,
    noOfDays: 3,
    noOfFoods: 12,
    resort: "Vanavihari",
    roomTypes: ["Chousingha", "Woodpecker"],
    bookingId: "BK-1242",
    status: "Reserved",
    reservationDate: "2025-07-20",
    paymentStatus: "Paid",
    refundPercent: "25%",
  },
  {
    id: "10",
    fullName: "Carlos Mendes",
    phone: "9966778899",
    email: "carlos.m@example.com",
    checkIn: "2025-09-18",
    checkOut: "2025-09-21",
    guests: 1,
    children: 0,
    extraGuests: 0,
    rooms: 1,
    totalGuests: 1,
    noOfDays: 3,
    noOfFoods: 3,
    resort: "Jungle Star",
    roomTypes: ["Bear"],
    bookingId: "BK-1243",
    status: "Not Reserved",
    reservationDate: "2025-08-30",
    paymentStatus: "Not Paid",
    refundPercent: "100%",
  },
];


  const filteredReservations = reservations.filter((r) =>
    r.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Guest Reservations</h1>
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>

        <div className="rounded-lg border overflow-x-auto">
          <Table className="min-w-full text-left">
            <TableHeader>
              <TableRow>
                <TableHead className="px-6">Full Name</TableHead>
                <TableHead className="px-6">Phone</TableHead>
                <TableHead className="px-6">Email</TableHead>
                <TableHead className="px-6">Check In</TableHead>
                <TableHead className="px-6">Check Out</TableHead>
                <TableHead className="px-6">Guests</TableHead>
                <TableHead className="px-6">Children</TableHead>
                <TableHead className="px-6">Extra Guests</TableHead>
                <TableHead className="px-6">Rooms</TableHead>
                <TableHead className="px-6">Total Guests</TableHead>
                <TableHead className="px-6">No. of Days</TableHead>
                <TableHead className="px-6">No. of Foods</TableHead>
                <TableHead className="px-6">Resort</TableHead>
                <TableHead className="px-6">Room Types</TableHead>
                <TableHead className="px-6">Booking ID</TableHead>
                <TableHead className="px-6">Status</TableHead>
                <TableHead className="px-6">Reservation Date</TableHead>
                <TableHead className="px-6">Payment Status</TableHead>
                <TableHead className="px-6">Refund %</TableHead>
                <TableHead className="px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="px-6">{r.fullName}</TableCell>
                  <TableCell className="px-6">{r.phone}</TableCell>
                  <TableCell className="px-6">{r.email}</TableCell>
                  <TableCell className="px-6">{r.checkIn}</TableCell>
                  <TableCell className="px-6">{r.checkOut}</TableCell>
                  <TableCell className="px-6">{r.guests}</TableCell>
                  <TableCell className="px-6">{r.children}</TableCell>
                  <TableCell className="px-6">{r.extraGuests}</TableCell>
                  <TableCell className="px-6">{r.rooms}</TableCell>
                  <TableCell className="px-6">{r.totalGuests}</TableCell>
                  <TableCell className="px-6">{r.noOfDays}</TableCell>
                  <TableCell className="px-6">{r.noOfFoods}</TableCell>
                  <TableCell className="px-6">{r.resort}</TableCell>
                  <TableCell className="px-6">{r.roomTypes.join(", ")}</TableCell>
                  <TableCell className="px-6">{r.bookingId}</TableCell>
                  <TableCell className="px-6">{r.status}</TableCell>
                  <TableCell className="px-6">{r.reservationDate}</TableCell>
                  <TableCell className="px-6">{r.paymentStatus}</TableCell>
                  <TableCell className="px-6">{r.refundPercent}</TableCell>
                  <TableCell className="px-6">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
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

export default ReservationTable;
