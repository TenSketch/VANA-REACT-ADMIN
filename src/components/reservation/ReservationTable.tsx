import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

// Required plugins
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol";
import "jszip";

// Styles
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";

import reservationdata from "./reservationtable.json";
import { useEffect, useRef } from "react";

DataTable.use(DT); // Only pass DT — plugins are globally registered via import

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

const reservations: Reservation[] = reservationdata;

// Function to export data to Excel
const exportToExcel = () => {
  const headers = [
    "Full Name", "Phone", "Email", "Check In", "Check Out", "Guests", 
    "Children", "Extra Guests", "Rooms", "Total Guests", "No. of Days",
    "No. of Foods", "Resort", "Room Types", "Booking ID", "Status",
    "Reservation Date", "Payment Status", "Refund %"
  ];
  
  const csvContent = [
    headers.join(","),
    ...reservations.map(row => [
      `"${row.fullName}"`,
      `"${row.phone}"`,
      `"${row.email}"`,
      `"${row.checkIn}"`,
      `"${row.checkOut}"`,
      row.guests,
      row.children,
      row.extraGuests,
      row.rooms,
      row.totalGuests,
      row.noOfDays,
      row.noOfFoods,
      `"${row.resort}"`,
      `"${row.roomTypes.join(', ')}"`,
      `"${row.bookingId}"`,
      `"${row.status}"`,
      `"${row.reservationDate}"`,
      `"${row.paymentStatus}"`,
      `"${row.refundPercent}"`
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "Guest_Reservations.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function ReservationTable() {
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
      .dataTables_wrapper .dataTables_filter {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 1rem;
      }
      .dataTables_wrapper .dataTables_length {
        margin-bottom: 1rem;
      }
      .dataTables_wrapper {
        width: 100%;
        overflow: visible;
      }
      .dataTables_wrapper .dataTables_scroll {
        width: 100%;
        overflow: visible;
      }
      .dataTables_wrapper .dataTables_scrollHead,
      .dataTables_wrapper .dataTables_info,
      .dataTables_wrapper .dataTables_paginate,
      .dataTables_wrapper .dataTables_length,
      .dataTables_wrapper .dataTables_filter,
      .dataTables_wrapper .dt-buttons {
        width: 100%;
        overflow: visible;
      }
      .dataTables_wrapper .dataTables_scrollBody {
        overflow-x: auto !important;
        overflow-y: visible !important;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 0.5rem;
      }
      .dataTables_wrapper table {
        width: max-content !important;
        min-width: 100%;
        margin: 0 !important;
      }
      .dataTables_wrapper .dataTables_scrollHead {
        border-radius: 0.5rem 0.5rem 0 0;
      }
      .dataTables_wrapper .dataTables_scrollHeadInner {
        width: 100% !important;
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>
        `;
      },
    },
  ];

  return (
    <div className="p-6 w-full max-w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Reservations</h2>
        <button
          onClick={exportToExcel}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to Excel
        </button>
      </div>

      <div ref={tableRef} className="w-full">
        <DataTable
          data={reservations}
          columns={columns}
          className="display nowrap w-full"
            options={{
            pageLength: 10,
            lengthMenu: [5, 10, 25, 50, 100],
            order: [[0, "asc"]],
            searching: true,
            paging: true,
            info: true,
            scrollX: true,
            scrollCollapse: true,
            layout: {
              topStart: "buttons",
              bottom1Start: "pageLength"
            },
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
                        
                        // Use fixed positioning relative to viewport
                        (collection as HTMLElement).style.position = "fixed";
                        (collection as HTMLElement).style.left = buttonRect.left + "px";
                        (collection as HTMLElement).style.top = (buttonRect.bottom + 5) + "px";
                        (collection as HTMLElement).style.zIndex = "9999";
                        (collection as HTMLElement).style.maxHeight = "300px";
                        (collection as HTMLElement).style.overflowY = "auto";

                        // Ensure dropdown doesn't go off-screen to the right
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
