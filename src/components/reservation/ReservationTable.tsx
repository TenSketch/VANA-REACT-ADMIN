import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol-dt";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";
import reservationdata from "./reservationtable.json";
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

const reservations: Reservation[] = reservationdata;

export default function ReservationTable() {
  const tableRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .dt-button-collection {
        position: fixed !important;
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
      const collection = document.querySelector('.dt-button-collection');
      if (collection && (collection as HTMLElement).style.display !== 'none') {
        (collection as HTMLElement).style.display = 'none';
      }
    };

    const scrollContainer = document.querySelector('.overflow-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.head.removeChild(style);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>
        `;
      },
    },
  ];

  return (
    <div className="p-6 w-full">
  <h2 className="text-xl font-semibold text-slate-800 mb-4">Guest Reservations</h2>

  {/* Fixed Top Controls (search + buttons) will stay here */}
  <div ref={tableRef} style={{ position: 'relative' }}>
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
        layout: {
          topStart: 'buttons',
          topEnd: 'search',
          bottomStart: 'pageLength',
          bottomEnd: 'paging'
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

                    const viewportWidth = window.innerWidth;
                    const dropdownWidth = (collection as HTMLElement).offsetWidth;

                    let left = buttonRect.left;
                    let top = buttonRect.bottom + 30;

                    if (left + dropdownWidth > viewportWidth - 10) {
                      left = viewportWidth - dropdownWidth - 10;
                    }

                    if (left < 10) {
                      left = 10;
                    }

                    (collection as HTMLElement).style.position = "fixed";
                    (collection as HTMLElement).style.left = `${left}px`;
                    (collection as HTMLElement).style.top = `${top}px`;
                    (collection as HTMLElement).style.zIndex = "9999";
                    (collection as HTMLElement).style.maxHeight = "300px";
                    (collection as HTMLElement).style.overflowY = "auto";
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

  {/* Horizontal scroll should apply ONLY to the table, not controls */}
  <div className="overflow-auto mt-4">
    <table className="display nowrap w-full"></table> {/* This gets replaced by DataTable */}
  </div>
</div>

  );
}
