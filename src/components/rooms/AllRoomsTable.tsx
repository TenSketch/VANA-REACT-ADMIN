import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.colVis.js'; // required for column control
import 'datatables.net-columncontrol-dt';
import 'datatables.net-columncontrol-dt/css/columnControl.dataTables.css';
import AllRoomTypes from "./allrooms.json";

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

const roomsData: Room[] = AllRoomTypes;

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
