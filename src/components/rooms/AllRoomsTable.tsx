import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface Room {
  id: string;
  resort: "Jungle Star" | "Vanavihari";
  cottageType: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  weekDayRate: number;
  weekEndRate: number;
  guests: number;
  extraGuests: number;
  bedChargeWeekDay: number;
  bedChargeWeekEnd: number;
}

const roomsData: Room[] = [
  {
    id: "1",
    resort: "Jungle Star",
    cottageType: "Deluxe Cottage",
    roomId: "JS-101",
    roomName: "Bear",
    roomImage: "/images/rooms/bear.jpg",
    weekDayRate: 3000,
    weekEndRate: 3500,
    guests: 2,
    extraGuests: 2,
    bedChargeWeekDay: 500,
    bedChargeWeekEnd: 600,
  },
  {
    id: "2",
    resort: "Jungle Star",
    cottageType: "Luxury Tent",
    roomId: "JS-102",
    roomName: "Chital",
    roomImage: "/images/rooms/chital.jpg",
    weekDayRate: 2800,
    weekEndRate: 3200,
    guests: 2,
    extraGuests: 1,
    bedChargeWeekDay: 450,
    bedChargeWeekEnd: 550,
  },
  {
    id: "3",
    resort: "Vanavihari",
    cottageType: "Executive Cottage",
    roomId: "VV-201",
    roomName: "Bulbul",
    roomImage: "/images/rooms/bulbul.jpg",
    weekDayRate: 3500,
    weekEndRate: 4000,
    guests: 3,
    extraGuests: 2,
    bedChargeWeekDay: 600,
    bedChargeWeekEnd: 700,
  },
  {
    id: "4",
    resort: "Vanavihari",
    cottageType: "Standard Room",
    roomId: "VV-202",
    roomName: "Woodpecker",
    roomImage: "/images/rooms/woodpecker.jpg",
    weekDayRate: 2500,
    weekEndRate: 3000,
    guests: 2,
    extraGuests: 1,
    bedChargeWeekDay: 400,
    bedChargeWeekEnd: 500,
  },
  {
    id: "5",
    resort: "Jungle Star",
    cottageType: "Forest View",
    roomId: "JS-103",
    roomName: "Chousingha",
    roomImage: "/images/rooms/chousingha.jpg",
    weekDayRate: 3200,
    weekEndRate: 3700,
    guests: 2,
    extraGuests: 2,
    bedChargeWeekDay: 550,
    bedChargeWeekEnd: 650,
  },
];

const RoomsTable = () => {
  const [search, setSearch] = useState("");

  const filteredRooms = useMemo(() => {
    return roomsData.filter((room) => {
      const term = search.toLowerCase();
      return (
        room.resort.toLowerCase().includes(term) ||
        room.cottageType.toLowerCase().includes(term) ||
        room.roomId.toLowerCase().includes(term) ||
        room.roomName.toLowerCase().includes(term)
      );
    });
  }, [search]);

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Rooms Table</h2>

      <Input
        type="text"
        placeholder="Search by resort, cottage type, room ID or room name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full max-w-md"
      />

      <div className="rounded-lg border bg-white overflow-auto">
        <Table className="min-w-[1200px] text-left">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Resort</TableHead>
              <TableHead>Cottage Type</TableHead>
              <TableHead>Room ID</TableHead>
              <TableHead>Room Name</TableHead>
              <TableHead>Room Image</TableHead>
              <TableHead>Weekday Rate</TableHead>
              <TableHead>Weekend Rate</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Extra Guests</TableHead>
              <TableHead>Bed Charge (WD)</TableHead>
              <TableHead>Bed Charge (WE)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.resort}</TableCell>
                <TableCell>{room.cottageType}</TableCell>
                <TableCell>{room.roomId}</TableCell>
                <TableCell>{room.roomName}</TableCell>
                <TableCell>
                  <img
                    src={room.roomImage}
                    alt={room.roomName}
                    className="w-16 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell>₹{room.weekDayRate}</TableCell>
                <TableCell>₹{room.weekEndRate}</TableCell>
                <TableCell>{room.guests}</TableCell>
                <TableCell>{room.extraGuests}</TableCell>
                <TableCell>₹{room.bedChargeWeekDay}</TableCell>
                <TableCell>₹{room.bedChargeWeekEnd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RoomsTable;
