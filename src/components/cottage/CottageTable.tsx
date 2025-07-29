import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-columncontrol-dt";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";

DataTable.use(DT);

interface CottageType {
  id: string;
  cottageName: string;
  resort: string;
  description: string;
  roomAmenities: string[];
}

const cottageTypes: CottageType[] = [
  {
    id: "1",
    cottageName: "Bison Cottages",
    resort: "Vanavihari, Maredumilli",
    description: "Spacious cottage with modern amenities and forest view",
    roomAmenities: ["Air Conditioning", "Geyser", "Western"],
  },
  {
    id: "2",
    cottageName: "Permanent Cottage",
    resort: "Jungle Star, Valamuru",
    description: "Permanent Cottage at Jungle Start Eco Camp in Valamuru district, AP, offers a unique blend of sturdy construction and eco-conscious design. Built with concrete walls for durability, its distinguishing feature is the roof crafted from thick, waterproof, fireproof, and heat-resistant cloth. This innovative design ensures a comfortable and safe stay amidst the natural surroundings, allowing guests to immerse themselves in the wilderness while enjoying modern comforts.",
    roomAmenities: ["Air Conditioning", "Geyser", "Western", "Food"],
  },
  {
    id: "3",
    cottageName: "Tented Cottage",
    resort: "Jungle Star, Valamuru",
    description: "The Tented Cottage at Jungle Start Eco Camp in Valamuru district, AP, offers a charming retreat for nature enthusiasts. Nestled amidst the lush greenery, these cottages feature a sturdy framework draped with weather-resistant canvas tents. Inside, guests can enjoy cozy interiors appointed with comfortable furnishings, providing a rustic yet comfortable accommodation experience. With the sounds of nature as your soundtrack and the fresh breeze flowing through the tent flaps, the Tented Cottages offer a serene escape from the hustle and bustle of everyday life.",
    roomAmenities: ["Western", "Air Coniditioning", "Geyser","Food"],
  },
  {
    id: "4",
    cottageName: "Vihari",
    resort: "Vanavihari, Maredumilli",
    description: "The 'Vihari' Cottage at Vanavihari, Maredumilli district, AP, offers a premium stay with two rooms, Pamuleru and Sokuleru, in a single building. Elegantly designed and nestled in nature, each room provides a luxurious yet serene retreat for guests seeking tranquillity and comfort amidst the lush wilderness.",
    roomAmenities: ["Air Conditioning", "Geyser", "Western"],
  },
  {
    id: "5",
    cottageName: "Deluxe Rooms",
    resort: "Vanavihari, Maredumilli",
    description: "The Deluxe Cottage at Vanavihari, situated behind the reception, features three rooms named Narmada, Bahuda, and Tapathi, all at an affordable price of 2500 rupees. This cozy accommodation offers a perfect blend of comfort and economy, allowing guests to enjoy a tranquil stay amidst the natural beauty of the Maredumilli district, AP.",
    roomAmenities: ["Air Conditioning", "Geyser", "Western"],
  },
  {
    id: "6",
    cottageName: "Wooden Cottages",
    resort: "Vanavihari, Maredumilli",
    description: "The Wooden Cottages at Vanavihari offer a rustic yet charming retreat in the heart of Maredumilli district, AP. Nestled amidst the lush greenery, these cottages boast traditional wooden construction, exuding warmth and authenticity. Each cottage is thoughtfully designed to provide a cozy and comfortable stay, allowing guests to immerse themselves in the serene ambiance of the forest. With modern amenities seamlessly integrated into the rustic charm, the Wooden Cottages offer a delightful blend of nature and comfort for a truly memorable getaway.",
    roomAmenities: ["Air Conditioning", "Geyser", "Western"],
  },
  {
    id: "7",
    cottageName: "Pre-Fabricated Cottages",
    resort: "Vanavihari, Maredumilli",
    description: "The Pre-Fabricated Cottages at Vanavihari offer a contemporary accommodation option amidst the natural beauty of Maredumilli district, AP. These cottages feature modern, modular construction, providing a sleek and comfortable retreat for guests. Each cottage is designed with efficiency and sustainability in mind, offering a cozy yet eco-friendly space to unwind. With thoughtful amenities and stylish interiors, the prefabricated cottages offer a refreshing stay, allowing guests to relax and recharge in harmony with nature.",
    roomAmenities: ["Air Conditioning", "Geyser", "Western"],
  },
  {
    id: "8",
    cottageName: "Hill Top Guest House",
    resort: "Vanavihari, Maredumilli",
    description: "Perched atop the serene hills of Vanavihari resort in Maredumilli district, AP, the Hill Top Guest House offers breathtaking panoramic views of the surrounding landscape. This exclusive accommodation boasts spacious and elegantly appointed rooms, providing a luxurious retreat for discerning guests. With its secluded location and tranquil ambience, the Hill Top Guest House provides the perfect setting for relaxation and rejuvenation amidst nature&#39;s splendour. Whether enjoying a quiet moment on the private balcony or exploring the nearby trails, guests are sure to experience an unforgettable stay in this idyllic mountain retreat.",
    roomAmenities: ["Air Conditioning", "Geyser", "Western"],
  },
];

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
      render: function (_: any, _type: any, row: CottageType) {
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
