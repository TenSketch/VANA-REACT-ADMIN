import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol-dt";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";
import Amenitydata from "./amenitydata.json";
DataTable.use(DT);

interface Amenity {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

const amenities: Amenity[] = Amenitydata;

export default function AllRoomAmenitiesTable() {
  const columns = [
    {
      data: "name",
      title: "Amenity Name",
    },
    {
      data: "description",
      title: "Description",
      render: (data: string) =>
        `<div style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${data}">
          ${data}
        </div>`,
    },
    {
      data: "isActive",
      title: "Status",
      render: (data: boolean) => {
        return `<span style="padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: 500; color: ${
          data ? "#15803d" : "#b91c1c"
        }; background-color: ${data ? "#dcfce7" : "#fee2e2"};">
          ${data ? "Active" : "Inactive"}
        </span>`;
      },
    },
    {
      data: null,
      title: "Actions",
      orderable: false,
      searchable: false,
      render: function (_: any, _type: any, _row: Amenity) {
        return `
          <button class="edit-btn" title="Edit" style="border: none; background: none; margin-right: 8px; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>
          <button class="delete-btn" title="Delete" style="border: none; background: none; color: red; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        `;
      },
    },
  ];

  return (
    <div className="p-6 w-full overflow-auto">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Room Amenities</h2>
      <DataTable
        data={amenities}
        columns={columns}
        className="display nowrap"
        options={{
          pageLength: 10,
          lengthMenu: [5, 10, 25, 50],
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
        }}
      />
    </div>
  );
}
