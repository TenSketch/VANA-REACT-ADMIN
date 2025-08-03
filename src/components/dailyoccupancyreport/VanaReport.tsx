import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol-dt";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";

import reservations from "./vanadata.json";
import { useEffect, useMemo, useRef } from "react";

DataTable.use(DT);

interface Reservation {
  roomName: string;
  status?: string;

  bookingId?: string;
  guestName?: string;
  paidAmount?: number;
  guests?: number;
  extraGuests?: number;
  children?: number;
  totalGuests?: number;
  totalFoods?: number;
  noOfDays?: number;
  remainingDays?: number;
}

const reservationData: Reservation[] = reservations;

export default function DailyOccupancyReport() {
  const tableRef = useRef(null);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
      .dataTables_wrapper tfoot th {
        background-color: #f8f9fa;
        font-weight: bold;
        border-top: 2px solid #dee2e6;
        padding: 8px;
      }
      .dataTables_wrapper tfoot {
        background-color: #f8f9fa;
      }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      const collection = document.querySelector(".dt-button-collection");
      if (collection && (collection as HTMLElement).style.display !== "none") {
        (collection as HTMLElement).style.display = "none";
      }
    };

    const scrollContainer = document.querySelector(".overflow-auto");
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

  const totals = useMemo(() => {
    const sum = (field: keyof Reservation) =>
      reservationData.reduce((acc, row) => {
        if (row.status) return acc;
        const value = row[field];
        return acc + (typeof value === "number" ? value : 0);
      }, 0);

    return {
      paidAmount: sum("paidAmount"),
      guests: sum("guests"),
      extraGuests: sum("extraGuests"),
      children: sum("children"),
      totalGuests: sum("totalGuests"),
      totalFoods: sum("totalFoods"),
      noOfDays: sum("noOfDays"),
      remainingDays: sum("remainingDays"),
    };
  }, [reservationData]);

  const columns: any[] = [
    { title: "Room Name", data: "roomName" },
    { title: "Booking ID", data: "bookingId", defaultContent: "—" },
    { title: "Guest Name", data: "guestName", defaultContent: "—" },
    {
      title: "Paid Amount",
      data: "paidAmount",
      render: (data: number) => (data ? `₹${data.toLocaleString()}` : "—"),
    },
    { title: "Guest(s)", data: "guests", defaultContent: "—" },
    { title: "Extra Guest(s)", data: "extraGuests", defaultContent: "—" },
    { title: "Children", data: "children", defaultContent: "—" },
    { title: "Total Guests", data: "totalGuests", defaultContent: "—" },
    { title: "Total Foods", data: "totalFoods", defaultContent: "—" },
    { title: "No. of Days", data: "noOfDays", defaultContent: "—" },
    { title: "Remaining Days", data: "remainingDays", defaultContent: "—" },
  ];

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold text-slate-800 mb-1">
        Today's Occupancy Report – Vanavihari
      </h2>
      <p className="text-sm text-gray-500 mb-4">Today: {today}</p>

      <div className="overflow-auto" style={{ position: "relative" }}>
        <div ref={tableRef} style={{ position: "relative", minWidth: "max-content" }}>
          <DataTable
            data={reservationData}
            columns={columns}
            className="display nowrap"
            options={{
              destroy: true,
              pageLength: 10,
              lengthMenu: [5, 10, 25, 50, 100],
              order: [[0, "asc"]],
              searching: false,
              paging: false,
              info: false,
              dom: "Bfrtip",
              columnControl: [["orderAsc", "orderDesc", "spacer", "search"]],
            }}
          >
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Paid Amount</th>
                <th>Guest(s)</th>
                <th>Extra Guest(s)</th>
                <th>Children</th>
                <th>Total Guests</th>
                <th>Total Foods</th>
                <th>No. of Days</th>
                <th>Remaining Days</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>—</th>
                <th>—</th>
                <th>{totals.paidAmount.toLocaleString()}</th>
                <th>{totals.guests}</th>
                <th>{totals.extraGuests}</th>
                <th>{totals.children}</th>
                <th>{totals.totalGuests}</th>
                <th>{totals.totalFoods}</th>
                <th>{totals.noOfDays}</th>
                <th>{totals.remainingDays}</th>
              </tr>
            </tfoot>
          </DataTable>
        </div>
      </div>
    </div>
  );
}
