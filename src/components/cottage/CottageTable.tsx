import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol-dt";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";

import cottageTypesData from "./cottagetypes.json";

DataTable.use(DT);

interface CottageType {
  id: string;
  cottageName: string;
  resort: string;
  description: string;
  roomAmenities: string[];
}

const cottageTypes: CottageType[] = cottageTypesData;


export default function CottageDataTable() {
  const columns = [
    { data: "cottageName", title: "Cottage Name" },
    {
      data: "resort",
      title: "Resort",
      render: (data: string) => data.split(",")[0],
    },
    {
      data: "description",
      title: "Description",
      render: (data: string) =>
        `<div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${data}">${data}</div>`,
    },
    {
      data: "roomAmenities",
      title: "Amenities",
      render: (data: string[]) => {
        return `
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${data
              .map(
                (item) => `
                <span style="
                  background: #dbeafe;
                  color: #1e3a8a;
                  padding: 2px 6px;
                  border-radius: 4px;
                  font-size: 10px;
                  white-space: nowrap;
                  max-width: 100px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                ">
                  ${item}
                </span>`
              )
              .join("")}
          </div>
        `;
      },
    },

    {
      data: null,
      title: "Actions",
      orderable: false,
      searchable: false,
      render: function (_: any, _type: any, _row: CottageType) {
        return `
          <button class="edit-btn" title="Edit" style="border: none; background: none; margin-right: 8px; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>
          <button class="delete-btn" title="Delete" style="border: none; background: none; color: red; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        `;
      },
    },
  ];

  return (
    <div className="p-6 w-full overflow-auto">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Cottage Types</h2>
      <DataTable
        data={cottageTypes}
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
        }}
      />
    </div>
  );
}
