import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.colVis.js'; // required for column control
import 'datatables.net-columncontrol-dt';
import 'datatables.net-columncontrol-dt/css/columnControl.dataTables.css';


DataTable.use(DT);

interface Room {
  id: string;
  resort: string;
  cottageType: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  weekdayRate: number;
  weekendRate: number;
  guests: number;
  extraGuests: number;
  bedChargeWeekday: number;
  bedChargeWeekend: number;
}

const roomsData: Room[] = [
  {
    "id": "1",
    "resort": "Vanavihari",
    "cottageType": "Bison Cottages",
    "roomId": "VA11",
    "roomName": "Peacock",
    "roomImage": "/images/rooms/peacock.jpg",
    "weekdayRate": 1750.0,
    "weekendRate": 2000.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "2",
    "resort": "Vanavihari",
    "cottageType": "Bison Cottages",
    "roomId": "VA10",
    "roomName": "Red Jungle Fowl",
    "roomImage": "/images/rooms/red_jungle_fowl.jpg",
    "weekdayRate": 1750.0,
    "weekendRate": 2000.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "3",
    "resort": "Jungle Star",
    "cottageType": "Permanent Cottage",
    "roomId": "JS10",
    "roomName": "Agathi",
    "roomImage": "/images/rooms/agathi.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "4",
    "resort": "Jungle Star",
    "cottageType": "Permanent Cottage",
    "roomId": "JS9",
    "roomName": "Vennela",
    "roomImage": "/images/rooms/vennela.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "5",
    "resort": "Jungle Star",
    "cottageType": "Permanent Cottage",
    "roomId": "JS8",
    "roomName": "Jabilli",
    "roomImage": "/images/rooms/jabilli.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "6",
    "resort": "Jungle Star",
    "cottageType": "Permanent Cottage",
    "roomId": "JS7",
    "roomName": "Avani",
    "roomImage": "/images/rooms/avani.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "7",
    "resort": "Jungle Star",
    "cottageType": "Permanent Cottage",
    "roomId": "JS6",
    "roomName": "Ambara",
    "roomImage": "/images/rooms/ambara.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "8",
    "resort": "Jungle Star",
    "cottageType": "Permanent Cottage",
    "roomId": "JS5",
    "roomName": "Aditya",
    "roomImage": "/images/rooms/aditya.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "9",
    "resort": "Jungle Star",
    "cottageType": "Tented Cottage",
    "roomId": "JS4",
    "roomName": "Prakruti",
    "roomImage": "/images/rooms/prakruti.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "10",
    "resort": "Jungle Star",
    "cottageType": "Tented Cottage",
    "roomId": "JS3",
    "roomName": "Vanya",
    "roomImage": "/images/rooms/vanya.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "11",
    "resort": "Jungle Star",
    "cottageType": "Tented Cottage",
    "roomId": "JS2",
    "roomName": "Prana",
    "roomImage": "/images/rooms/prana.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "12",
    "resort": "Jungle Star",
    "cottageType": "Tented Cottage",
    "roomId": "JS1",
    "roomName": "Aranya",
    "roomImage": "/images/rooms/aranya.jpg",
    "weekdayRate": 5000.0,
    "weekendRate": 7500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 1500,
    "bedChargeWeekend": 1750
  },
  {
    "id": "13",
    "resort": "Vanavihari",
    "cottageType": "Vihari",
    "roomId": "VA17",
    "roomName": "Pamuleru",
    "roomImage": "/images/rooms/pamuleru.jpg",
    "weekdayRate": 4000.0,
    "weekendRate": 4500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "14",
    "resort": "Vanavihari",
    "cottageType": "Vihari",
    "roomId": "VA16",
    "roomName": "Sokuleru",
    "roomImage": "/images/rooms/sokuleru.jpg",
    "weekdayRate": 4000.0,
    "weekendRate": 4500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "15",
    "resort": "Vanavihari",
    "cottageType": "Wooden Cottages",
    "roomId": "VA15",
    "roomName": "Kingfisher",
    "roomImage": "/images/rooms/kingfisher.jpg",
    "weekdayRate": 4000.0,
    "weekendRate": 4500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "16",
    "resort": "Vanavihari",
    "cottageType": "Wooden Cottages",
    "roomId": "VA14",
    "roomName": "Woodpecker",
    "roomImage": "/images/rooms/woodpecker.jpg",
    "weekdayRate": 4000.0,
    "weekendRate": 4500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "17",
    "resort": "Vanavihari",
    "cottageType": "Wooden Cottages",
    "roomId": "VA13",
    "roomName": "Bulbul",
    "roomImage": "/images/rooms/bulbul.jpg",
    "weekdayRate": 4000.0,
    "weekendRate": 4500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "18",
    "resort": "Vanavihari",
    "cottageType": "Wooden Cottages",
    "roomId": "VA12",
    "roomName": "Hornbill",
    "roomImage": "/images/rooms/hornbill.jpg",
    "weekdayRate": 4000.0,
    "weekendRate": 4500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "19",
    "resort": "Vanavihari",
    "cottageType": "Deluxe Rooms",
    "roomId": "VA3",
    "roomName": "Tapathi",
    "roomImage": "/images/rooms/tapathi.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "20",
    "resort": "Vanavihari",
    "cottageType": "Deluxe Rooms",
    "roomId": "VA2",
    "roomName": "Bahuda",
    "roomImage": "/images/rooms/bahuda.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "21",
    "resort": "Vanavihari",
    "cottageType": "Deluxe Rooms",
    "roomId": "VA1",
    "roomName": "Narmada",
    "roomImage": "/images/rooms/narmada.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "22",
    "resort": "Vanavihari",
    "cottageType": "Pre-Fabricated Cottages",
    "roomId": "VA7",
    "roomName": "Sambar",
    "roomImage": "/images/rooms/sambar.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "23",
    "resort": "Vanavihari",
    "cottageType": "Pre-Fabricated Cottages",
    "roomId": "VA6",
    "roomName": "Chousingha",
    "roomImage": "/images/rooms/chousingha.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "24",
    "resort": "Vanavihari",
    "cottageType": "Pre-Fabricated Cottages",
    "roomId": "VA5",
    "roomName": "Chital",
    "roomImage": "/images/rooms/chital.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "25",
    "resort": "Vanavihari",
    "cottageType": "Pre-Fabricated Cottages",
    "roomId": "VA4",
    "roomName": "Bear",
    "roomImage": "/images/rooms/bear.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "26",
    "resort": "Vanavihari",
    "cottageType": "Hill Top Guest House",
    "roomId": "VA9",
    "roomName": "Panther",
    "roomImage": "/images/rooms/panther.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  },
  {
    "id": "27",
    "resort": "Vanavihari",
    "cottageType": "Hill Top Guest House",
    "roomId": "VA8",
    "roomName": "Bonnet",
    "roomImage": "/images/rooms/bonnet.jpg",
    "weekdayRate": 2500.0,
    "weekendRate": 3500.0,
    "guests": 2,
    "extraGuests": 1,
    "bedChargeWeekday": 500,
    "bedChargeWeekend": 700
  }
];

export default function RoomsTable() {
  const columns = [
    { data: "id", title: "ID" },
    { data: "resort", title: "Resort" },
    { data: "cottageType", title: "Cottage Type" },
    { data: "roomId", title: "Room ID" },
    { data: "roomName", title: "Room Name" },
    {
      data: "roomImage",
      title: "Room Image",
      render: (data: string, _type: string, row: Room) => 
        `<img src="${data}" alt="${row.roomName}" style="width: 64px; height: 48px; object-fit: cover; border-radius: 4px;" />`,
    },
    { 
      data: "weekdayRate", 
      title: "Weekday Rate",
      render: (data: number) => `₹${data.toLocaleString()}`
    },
    { 
      data: "weekendRate", 
      title: "Weekend Rate",
      render: (data: number) => `₹${data.toLocaleString()}`
    },
    { data: "guests", title: "Guests" },
    { data: "extraGuests", title: "Extra Guests" },
    { 
      data: "bedChargeWeekday", 
      title: "Bed Charge (WD)",
      render: (data: number) => `₹${data.toLocaleString()}`
    },
    { 
      data: "bedChargeWeekend", 
      title: "Bed Charge (WE)",
      render: (data: number) => `₹${data.toLocaleString()}`
    },
  ];

  return (
    <div className="p-6 w-full overflow-auto">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Rooms Table</h2>
      
      <DataTable
        data={roomsData}
        columns={columns}
        className="display nowrap"
        options={{
          pageLength: 10,
          lengthMenu: [5, 10, 25, 50, 100],
          order: [[0, 'asc']],
          searching: true,
          paging: true,
          info: true,
          dom: 'Bfrtip', // B = Buttons, f = filtering, r = processing, t = table, i = info, p = paging
          buttons: [
            {
              extend: 'colvis',
              text: 'Column Visibility',
              collectionLayout: 'fixed two-column',
            },
          ],
          columnControl: ['order', ['orderAsc', 'orderDesc', 'spacer', 'search']],
          ordering: {
            indicators: false,
            handler: false
          }
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Resort</th>
            <th>Cottage Type</th>
            <th>Room ID</th>
            <th>Room Name</th>
            <th>Room Image</th>
            <th>Weekday Rate</th>
            <th>Weekend Rate</th>
            <th>Guests</th>
            <th>Extra Guests</th>
            <th>Bed Charge (WD)</th>
            <th>Bed Charge (WE)</th>
          </tr>
        </thead>
      </DataTable>
    </div>
  );
}
