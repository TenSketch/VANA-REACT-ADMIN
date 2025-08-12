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
        position: fixed !important;
        z-index: 9999 !important;
        background: white !important;
        border: 1px solid #ddd !important;
        border-radius: 4px !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
      }
      .dataTables_wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .dataTables_wrapper .dt-layout-row {
        flex-shrink: 0;
      }
      .dataTables_wrapper .dataTables_scroll {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      .dataTables_wrapper .dataTables_scrollHead {
        flex-shrink: 0;
        border-radius: 0.5rem 0.5rem 0 0;
        border: 1px solid #ddd;
        border-bottom: none;
        background: #f8f9fa;
      }
      .dataTables_wrapper .dataTables_scrollHeadInner {
        width: 100% !important;
      }
      .dataTables_wrapper .dataTables_scrollBody {
        flex: 1;
        overflow: auto !important;
        width: 100%;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 0.5rem 0.5rem;
        min-height: 300px;
        max-height: calc(100vh - 350px);
      }
      .dataTables_wrapper table {
        width: max-content !important;
        min-width: 100%;
        margin: 0 !important;
      }
      .dt-button-collection.dropdown-menu {
        transform: none !important;
      }
      .dataTables_wrapper .dt-buttons {
        margin-bottom: 1rem;
      }
      .dataTables_wrapper .dataTables_info,
      .dataTables_wrapper .dataTables_paginate {
        margin-top: 1rem;
      }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      const collection = document.querySelector(".dt-button-collection");
      if (collection && (collection as HTMLElement).style.display !== "none") {
        (collection as HTMLElement).style.display = "none";
      }
    };

    const scrollContainer = document.querySelector(".dataTables_scrollBody");
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
        `<img src="${data}" alt="${row.roomName}" 
              style="width: 64px; height: 48px; object-fit: cover; border-radius: 4px;" />`,
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
    <div className="flex flex-col h-full max-h-screen overflow-hidden">
      <div className="flex-shrink-0 px-6 py-4 bg-white border-b">
        <h2 className="text-xl font-semibold text-slate-800">Rooms Table</h2>
      </div>
      <div className="flex-1 px-6 py-4 overflow-hidden">
        <div ref={tableRef} className="h-full">
          <DataTable
            data={roomsData}
            columns={columns}
            className="display nowrap w-full"
            options={{
              pageLength: 10,
              lengthMenu: [5, 10, 25, 50, 100],
              order: [[0, 'asc']],
              searching: true,
              paging: true,
              info: true,
              scrollX: true,
              scrollY: "400px",
              scrollCollapse: true,
              layout: {
                topStart: 'buttons',
                topEnd: 'search',
                bottomStart: 'pageLength',
                bottomEnd: 'paging'
              },
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

                        (collection as HTMLElement).style.position = "fixed";
                        (collection as HTMLElement).style.left = buttonRect.left + "px";
                        (collection as HTMLElement).style.top = (buttonRect.bottom + 5) + "px";
                        (collection as HTMLElement).style.zIndex = "9999";
                        (collection as HTMLElement).style.maxHeight = "300px";
                        (collection as HTMLElement).style.overflowY = "auto";

                        const collectionRect = (collection as HTMLElement).getBoundingClientRect();
                        const viewportWidth = window.innerWidth;

                        if (collectionRect.right > viewportWidth - 10) {
                          const adjustedLeft = buttonRect.right - collectionRect.width;
                          (collection as HTMLElement).style.left = Math.max(10, adjustedLeft) + "px";
                        }
                      }
                    }, 10);
                  });
                },
              },
            ],
            columnControl: ['order', ['orderAsc', 'orderDesc', 'spacer', 'search']],
          }}
        />
        </div>
      </div>
    </div>
  );
}
