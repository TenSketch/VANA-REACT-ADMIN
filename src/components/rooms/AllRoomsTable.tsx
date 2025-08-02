import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-columncontrol-dt';
import 'datatables.net-columncontrol-dt/css/columnControl.dataTables.css';
import AllRoomTypes from "./allrooms.json";
import { useEffect, useRef } from "react";

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
    <div className="p-6 w-full overflow-auto dt-scroll-wrapper">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Rooms Table</h2>
      <div ref={tableRef} style={{ position: "relative", minWidth: "max-content" }}>
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
            dom: 'Bfrtip',
            buttons: [
              {
                extend: 'colvis',
                text: 'Column Visibility',
                collectionLayout: 'fixed two-column',
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
            columnControl: ['order', ['orderAsc', 'orderDesc', 'spacer', 'search']],
            ordering: {
              indicators: false,
              handler: false
            }
          }}
        />
      </div>
    </div>
  );
}
