"use client";

import { useState } from "react";

interface PrintRequest {
  id: string;
  modelName: string;
  modelImage: string;
  status: "new" | "quoted" | "accepted" | "printing" | "completed" | "declined";
  date: string;
  customer: {
    name: string;
    avatar: string;
    rating: number;
    orders: number;
  };
  specifications: {
    size: "small" | "medium" | "large";
    material: "PLA" | "ABS" | "PETG" | "Resin";
    quality: "draft" | "standard" | "high";
    color: string;
    quantity: number;
  };
  yourQuote?: {
    price: number;
    estimatedDays: number;
    message: string;
  };
}

// Exemple de données (à remplacer par des données réelles plus tard)
const incomingRequests: PrintRequest[] = [
  {
    id: "REQ001",
    modelName: "Cyber Dragon",
    modelImage:
      "https://cdn.meshy.ai/uploads/prod/7efdd1e3c13248762155121b6ef32b3bc887f9dbaff704d955a4410bc95d6bff/publish/cover-portrait/01970a79-6f6b-7f60-8b21-55f7f4a2f02b.jpg",
    status: "new",
    date: "2024-02-20",
    customer: {
      name: "Thomas Anderson",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 4.8,
      orders: 12,
    },
    specifications: {
      size: "medium",
      material: "PLA",
      quality: "high",
      color: "Red",
      quantity: 1,
    },
  },
  {
    id: "REQ002",
    modelName: "Space Explorer",
    modelImage:
      "https://cdn.meshy.ai/uploads/prod/56c87eb4985a785a552ae286c7a9f989d027ca2a50fbaabc57fa55077a81b1c9/publish/cover-portrait/01970a99-b532-7b10-ae72-84bea1daaf67.jpg",
    status: "quoted",
    date: "2024-02-19",
    customer: {
      name: "Alice Martin",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      rating: 4.9,
      orders: 8,
    },
    specifications: {
      size: "large",
      material: "PETG",
      quality: "standard",
      color: "Blue",
      quantity: 2,
    },
    yourQuote: {
      price: 89.99,
      estimatedDays: 4,
      message:
        "Can print in high quality PETG with your specified color. Price includes post-processing.",
    },
  },
  {
    id: "REQ003",
    modelName: "Forest Spirit",
    modelImage:
      "https://cdn.meshy.ai/uploads/prod/bff133a4a98b09b2c0c5beb75706358727ba96f93aae73f22cc54adbc9f75d05/publish/cover-portrait/01970a0c-5f07-7340-88ec-25ecef464147.jpg",
    status: "printing",
    date: "2024-02-15",
    customer: {
      name: "Jean Dupont",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5.0,
      orders: 15,
    },
    specifications: {
      size: "large",
      material: "Resin",
      quality: "high",
      color: "Green",
      quantity: 1,
    },
    yourQuote: {
      price: 129.99,
      estimatedDays: 5,
      message:
        "Will be printed in high-resolution resin with detailed finishing.",
    },
  },
];

const StatusBadge = ({ status }: { status: PrintRequest["status"] }) => {
  const statusConfig = {
    new: {
      color: "text-blue-400 bg-blue-400/20",
      label: "New Request",
    },
    quoted: {
      color: "text-yellow-400 bg-yellow-400/20",
      label: "Quote Sent",
    },
    accepted: {
      color: "text-purple-400 bg-purple-400/20",
      label: "Quote Accepted",
    },
    printing: {
      color: "text-green-400 bg-green-400/20",
      label: "In Production",
    },
    completed: {
      color: "text-gray-400 bg-gray-400/20",
      label: "Completed",
    },
    declined: {
      color: "text-red-400 bg-red-400/20",
      label: "Declined",
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${config.color}`}>
      {config.label}
    </span>
  );
};

const FilterButton = ({
  status,
  label,
  isActive,
  onClick,
  count,
}: {
  status: PrintRequest["status"] | "all";
  label: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}) => {
  const statusConfig = {
    all: "text-white bg-[#222222]",
    new: "text-blue-400 bg-blue-400/10",
    quoted: "text-yellow-400 bg-yellow-400/10",
    accepted: "text-purple-400 bg-purple-400/10",
    printing: "text-green-400 bg-green-400/10",
    completed: "text-gray-400 bg-gray-400/10",
    declined: "text-red-400 bg-red-400/10",
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg
        ${isActive ? statusConfig[status] + " border-2" : "bg-[#181818] border border-[#222222]"}
        hover:bg-[#222222] transition-colors
        flex items-center gap-2
      `}
    >
      <span>{label}</span>
      <span className="px-2 py-0.5 rounded-full bg-[#222222] text-sm">
        {count}
      </span>
    </button>
  );
};

export default function IncomingRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<
    PrintRequest["status"] | "all"
  >("all");
  const [selectedRequest, setSelectedRequest] = useState<PrintRequest | null>(
    null
  );
  const [quoteForm, setQuoteForm] = useState<{
    price: string;
    days: string;
    message: string;
  }>({ price: "", days: "", message: "" });

  // Filtrer les demandes selon le statut sélectionné
  const filteredRequests =
    statusFilter === "all"
      ? incomingRequests
      : incomingRequests.filter((request) => request.status === statusFilter);

  // Compter le nombre de demandes par statut
  const statusCounts = {
    all: incomingRequests.length,
    new: incomingRequests.filter((r) => r.status === "new").length,
    quoted: incomingRequests.filter((r) => r.status === "quoted").length,
    accepted: incomingRequests.filter((r) => r.status === "accepted").length,
    printing: incomingRequests.filter((r) => r.status === "printing").length,
    completed: incomingRequests.filter((r) => r.status === "completed").length,
    declined: incomingRequests.filter((r) => r.status === "declined").length,
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-cal text-white">Print Requests</h1>
        </div>

        {/* Status Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <FilterButton
            status="all"
            label="All Requests"
            isActive={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
            count={statusCounts.all}
          />
          <FilterButton
            status="new"
            label="New Requests"
            isActive={statusFilter === "new"}
            onClick={() => setStatusFilter("new")}
            count={statusCounts.new}
          />
          <FilterButton
            status="quoted"
            label="Quoted"
            isActive={statusFilter === "quoted"}
            onClick={() => setStatusFilter("quoted")}
            count={statusCounts.quoted}
          />
          <FilterButton
            status="accepted"
            label="Accepted"
            isActive={statusFilter === "accepted"}
            onClick={() => setStatusFilter("accepted")}
            count={statusCounts.accepted}
          />
          <FilterButton
            status="printing"
            label="In Production"
            isActive={statusFilter === "printing"}
            onClick={() => setStatusFilter("printing")}
            count={statusCounts.printing}
          />
          <FilterButton
            status="completed"
            label="Completed"
            isActive={statusFilter === "completed"}
            onClick={() => setStatusFilter("completed")}
            count={statusCounts.completed}
          />
        </div>

        {/* Print Requests List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 bg-[#111111] border border-[#222222] rounded-xl">
              <p className="text-gray-400">
                No print requests found for this status
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-[#111111] border border-[#222222] rounded-xl p-6"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={request.modelImage}
                    alt={request.modelName}
                    className="w-24 h-24 rounded-lg object-cover border border-[#222222]"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-medium text-white mb-1">
                          {request.modelName}
                        </h2>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>Request ID: {request.id}</span>
                          <span>•</span>
                          <span>{request.date}</span>
                        </div>
                      </div>
                      <StatusBadge status={request.status} />
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={request.customer.avatar}
                        alt={request.customer.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="text-white">
                          {request.customer.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            {request.customer.rating}
                          </div>
                          <span>•</span>
                          <span>{request.customer.orders} orders</span>
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-[#181818] rounded-lg mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Size</div>
                        <div className="text-white">
                          {request.specifications.size}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Material</div>
                        <div className="text-white">
                          {request.specifications.material}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Quality</div>
                        <div className="text-white">
                          {request.specifications.quality}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Color</div>
                        <div className="text-white">
                          {request.specifications.color}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Quantity</div>
                        <div className="text-white">
                          {request.specifications.quantity}
                        </div>
                      </div>
                    </div>

                    {/* Quote Form or Quote Info */}
                    {request.status === "new" ? (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            Price ($)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg text-white"
                            placeholder="Enter price"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            Estimated Days
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg text-white"
                            placeholder="Enter days"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            Message
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-lg text-white"
                            placeholder="Add details about your quote"
                          />
                        </div>
                        <div className="md:col-span-3 flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-[#222222] text-white rounded-lg hover:bg-[#333333] transition-colors">
                            Decline Request
                          </button>
                          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Send Quote
                          </button>
                        </div>
                      </div>
                    ) : request.yourQuote ? (
                      <div className="mt-4 p-4 bg-[#181818] rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm text-gray-400">
                            Your Quote
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-medium text-white">
                              ${request.yourQuote.price}
                            </div>
                            <div className="text-sm text-gray-400">
                              {request.yourQuote.estimatedDays} days
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300">
                          {request.yourQuote.message}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
