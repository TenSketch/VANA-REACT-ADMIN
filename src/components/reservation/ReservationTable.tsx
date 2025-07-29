import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol-dt";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";
import { useEffect, useRef } from "react";

DataTable.use(DT);

interface Reservation {
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

export default function ReservationTable() {
  const tableRef = useRef(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const rowElement = target.closest("tr");
      if (!rowElement) return;
      const index = (rowElement as HTMLTableRowElement).rowIndex - 1;
      const rowData = reservations[index];
      if (target.closest(".edit-btn")) {
        console.log("Edit:", rowData);
      } else if (target.closest(".delete-btn")) {
        console.log("Delete:", rowData);
      }
    };

    const tableNode = tableRef.current;
    if (tableNode) {
      (tableNode as HTMLElement).addEventListener("click", handleClick);
    }

    return () => {
      if (tableNode) {
        (tableNode as HTMLElement).removeEventListener("click", handleClick);
      }
    };
  }, []);

  const columns = [
    { data: "fullName", title: "Full Name" },
    { data: "phone", title: "Phone" },
    { data: "email", title: "Email" },
    { data: "checkIn", title: "Check In" },
    { data: "checkOut", title: "Check Out" },
    { data: "guests", title: "Guests" },
    { data: "children", title: "Children" },
    { data: "extraGuests", title: "Extra Guests" },
    { data: "rooms", title: "Rooms" },
    { data: "totalGuests", title: "Total Guests" },
    { data: "noOfDays", title: "No. of Days" },
    { data: "noOfFoods", title: "No. of Foods" },
    { data: "resort", title: "Resort" },
    {
      data: "roomTypes",
      title: "Room Types",
      render: (data: string[]) => data.join(", "),
    },
    { data: "bookingId", title: "Booking ID" },
    { data: "status", title: "Status" },
    { data: "reservationDate", title: "Reservation Date" },
    { data: "paymentStatus", title: "Payment Status" },
    { data: "refundPercent", title: "Refund %" },
    {
      data: null,
      title: "Actions",
      orderable: false,
      searchable: false,
      render: () => {
        return `
          <button class="edit-btn" title="Edit" style="border: none; background: none; margin-right: 8px; cursor:pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>
          <button class="delete-btn" title="Delete" style="border: none; background: none; color: red; cursor:pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        `;
      },
    },
  ];

  return (
    <div className="p-6 w-full overflow-auto">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Guest Reservations</h2>
      <div ref={tableRef}>
        <DataTable
          data={reservations}
          columns={columns}
          className="display nowrap"
          options={{
            pageLength: 10,
            lengthMenu: [5, 10, 25, 50, 100],
            order: [[0, "asc"]],
            searching: true,
            paging: true,
            info: true,
            dom: "Bfrtip",
            buttons: [
              {
                extend: "colvis",
                text: "Column Visibility",
                collectionLayout: "fixed two-column",
              },
            ],
            columnControl: ["order", ["orderAsc", "orderDesc", "spacer", "search"]],
            ordering: {
              indicators: false,
              handler: false,
            },
          }}
        />
      </div>
    </div>
  );
}
