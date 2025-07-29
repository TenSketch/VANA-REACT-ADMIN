import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol-dt";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";

DataTable.use(DT);

interface Guest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  registrationDate: string;
  emailVerificationToken: string;
  accessToken: string;
}

const guests: Guest[] = [
  {
    id: "G001",
    fullName: "Arjun Mehta",
    phone: "+91 9876543210",
    email: "arjun@example.com",
    address: "123 Green Street, Hyderabad, Telangana",
    registrationDate: "2025-07-15",
    emailVerificationToken: "verify-123",
    accessToken: "access-abc123",
  },
  {
    id: "G002",
    fullName: "Priya Reddy",
    phone: "+91 9001234567",
    email: "priya@example.com",
    address: "456 Blue Lane, Vijayawada, AP",
    registrationDate: "2025-07-16",
    emailVerificationToken: "verify-456",
    accessToken: "access-def456",
  },
  {
    id: "G003",
    fullName: "Vikram Singh",
    phone: "+91 9810012312",
    email: "vikram@example.com",
    address: "789 Sunset Blvd, Bengaluru, Karnataka",
    registrationDate: "2025-07-17",
    emailVerificationToken: "verify-789",
    accessToken: "access-ghi789",
  },
  // Add more if needed
];

export default function GuestTable() {
  const columns = [
    { data: "id", title: "Guest ID" },
    { data: "fullName", title: "Full Name" },
    { data: "phone", title: "Phone" },
    { data: "email", title: "Email" },
    {
      data: "address",
      title: "Address",
      render: (data: string) =>
        `<div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${data}">${data}</div>`,
    },
    { data: "registrationDate", title: "Reg. Date" },
    { data: "emailVerificationToken", title: "Email Token" },
    { data: "accessToken", title: "Access Token" },
    {
      data: null,
      title: "Actions",
      orderable: false,
      searchable: false,
      render: function (_: any, _type: any, row: Guest) {
        return `
          <button class="edit-btn" title="Edit" style="border: none; background: none; margin-right: 8px; cursor:pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>
          <button class="delete-btn" title="Delete" style="border: none; background: none; color: red; cursor:pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        `;
      },
    },
  ];

  return (
    <div className="p-6 w-full overflow-auto">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Guest Records</h2>
      <DataTable
        data={guests}
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
          ordering: {
            indicators: false,
            handler: false,
          },
        }}
      />
    </div>
  );
}
