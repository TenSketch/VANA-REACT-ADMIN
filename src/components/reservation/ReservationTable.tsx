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
    // Add custom CSS to fix dropdown positioning
    const style = document.createElement('style');
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

    // Add scroll event listener to close dropdown on scroll
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
      <div className="overflow-auto" style={{ position: 'relative' }}>
        <div ref={tableRef} style={{ position: 'relative', minWidth: 'max-content' }}>
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
                dropup: false,
                fade: 0,
                className: "btn-colvis",
                init: function(_api: any, node: any, _config: any) {
                  // Ensure dropdown appears below button
                  node.on('click', function() {
                    setTimeout(() => {
                      const collection = document.querySelector('.dt-button-collection');
                      if (collection) {
                        const button = node[0];
                        const buttonRect = button.getBoundingClientRect();
                        const scrollContainer = button.closest('.overflow-auto');
                        const containerRect = scrollContainer ? scrollContainer.getBoundingClientRect() : { left: 0, top: 0 };
                        
                        // Calculate position relative to the scroll container
                        const leftPosition = Math.max(10, buttonRect.left - containerRect.left + (scrollContainer?.scrollLeft || 0));
                        const topPosition = buttonRect.bottom + 5;
                        
                        (collection as HTMLElement).style.position = 'absolute';
                        (collection as HTMLElement).style.left = leftPosition + 'px';
                        (collection as HTMLElement).style.top = topPosition + 'px';
                        (collection as HTMLElement).style.zIndex = '9999';
                        (collection as HTMLElement).style.maxHeight = '300px';
                        (collection as HTMLElement).style.overflowY = 'auto';
                        
                        // Ensure the dropdown is visible within the container
                        const collectionRect = (collection as HTMLElement).getBoundingClientRect();
                        const containerRightEdge = containerRect.left + (scrollContainer?.clientWidth || window.innerWidth);
                        
                        if (collectionRect.right > containerRightEdge) {
                          const adjustedLeft = leftPosition - (collectionRect.right - containerRightEdge) - 10;
                          (collection as HTMLElement).style.left = Math.max(10, adjustedLeft) + 'px';
                        }
                      }
                    }, 10);
                  });
                }
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
    </div>
  );
}
