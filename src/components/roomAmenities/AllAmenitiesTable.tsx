import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol-dt";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";
import Amenitydata from "./amenitydata.json";
import { useEffect, useRef } from "react";

DataTable.use(DT);

interface Amenity {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

const amenities: Amenity[] = Amenitydata;

export default function AllRoomAmenitiesTable() {
  const tableRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .dt-button-collection {
        position: absolute !important;
        z-index: 9999 !important;
        background: white !important;
        border: 1px solid #ddd !important;
        border-radius: 4px !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
      }
      .dataTables_wrapper .dt-buttons {
        position: relative;
      }
      .dataTables_wrapper {
        position: relative;
      }
      .dt-button-collection.dropdown-menu {
        transform: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      const collection = document.querySelector(".dt-button-collection");
      if (collection && (collection as HTMLElement).style.display !== "none") {
        (collection as HTMLElement).style.display = "none";
      }
    };

    const scrollContainer = document.querySelector(".dt-scroll-wrapper");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.head.removeChild(style);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
        `;
      },
    },
  ];

  return (
    <div className="p-6 w-full overflow-auto dt-scroll-wrapper">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Room Amenities</h2>
      <div ref={tableRef} style={{ position: "relative", minWidth: "max-content" }}>
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
                init: function (_api: any, node: any, _config: any) {
                  node.on("click", function () {
                    setTimeout(() => {
                      const collection = document.querySelector(".dt-button-collection");
                      if (collection) {
                        const button = node[0];
                        const buttonRect = button.getBoundingClientRect();
                        const scrollContainer = button.closest(".dt-scroll-wrapper");
                        const containerRect = scrollContainer
                          ? scrollContainer.getBoundingClientRect()
                          : { left: 0, top: 0 };

                        const leftPosition =
                          Math.max(10, buttonRect.left - containerRect.left + (scrollContainer?.scrollLeft || 0));
                        const topPosition = buttonRect.bottom + 5;

                        (collection as HTMLElement).style.position = "absolute";
                        (collection as HTMLElement).style.left = leftPosition + "px";
                        (collection as HTMLElement).style.top = topPosition + "px";
                        (collection as HTMLElement).style.zIndex = "9999";
                        (collection as HTMLElement).style.maxHeight = "300px";
                        (collection as HTMLElement).style.overflowY = "auto";

                        const collectionRect = (collection as HTMLElement).getBoundingClientRect();
                        const containerRightEdge =
                          containerRect.left + (scrollContainer?.clientWidth || window.innerWidth);

                        if (collectionRect.right > containerRightEdge) {
                          const adjustedLeft = leftPosition - (collectionRect.right - containerRightEdge) - 10;
                          (collection as HTMLElement).style.left = Math.max(10, adjustedLeft) + "px";
                        }
                      }
                    }, 10);
                  });
                },
              },
            ],
            columnControl: ["order", ["orderAsc", "orderDesc", "spacer", "search"]],
          }}
        />
      </div>
    </div>
  );
}
