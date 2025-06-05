"use client";

import { useState } from "react";
import Link from "next/link";

interface PrintRequest {
  id: string;
  modelName: string;
  modelImage: string;
  status: "pending" | "quoted" | "accepted" | "printing" | "completed";
  date: string;
  quotes?: Quote[];
}

interface Quote {
  id: string;
  printerName: string;
  printerAvatar: string;
  price: number;
  estimatedDays: number;
  rating: number;
  message: string;
}

// Exemple de données (à remplacer par des données réelles plus tard)
const printRequests: PrintRequest[] = [
  {
    id: "PR001",
    modelName: "Cyber Dragon",
    modelImage:
      "https://cdn.meshy.ai/uploads/prod/7efdd1e3c13248762155121b6ef32b3bc887f9dbaff704d955a4410bc95d6bff/publish/cover-portrait/01970a79-6f6b-7f60-8b21-55f7f4a2f02b.jpg",
    status: "quoted",
    date: "2024-02-20",
    quotes: [
      {
        id: "Q1",
        printerName: "Pro3D Print",
        printerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        price: 89.99,
        estimatedDays: 3,
        rating: 4.8,
        message:
          "Can print in high quality PLA or PETG. Includes post-processing and painting.",
      },
      {
        id: "Q2",
        printerName: "MasterPrint",
        printerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        price: 75.99,
        estimatedDays: 4,
        rating: 4.9,
        message:
          "Professional finish with resin printing available. Multiple color options.",
      },
    ],
  },
  {
    id: "PR002",
    modelName: "Space Explorer",
    modelImage:
      "https://cdn.meshy.ai/uploads/prod/56c87eb4985a785a552ae286c7a9f989d027ca2a50fbaabc57fa55077a81b1c9/publish/cover-portrait/01970a99-b532-7b10-ae72-84bea1daaf67.jpg",
    status: "pending",
    date: "2024-02-19",
  },
  {
    id: "PR003",
    modelName: "Forest Spirit",
    modelImage:
      "https://cdn.meshy.ai/uploads/prod/bff133a4a98b09b2c0c5beb75706358727ba96f93aae73f22cc54adbc9f75d05/publish/cover-portrait/01970a0c-5f07-7340-88ec-25ecef464147.jpg",
    status: "printing",
    date: "2024-02-15",
    quotes: [
      {
        id: "Q3",
        printerName: "Elite3D",
        printerAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
        price: 95.99,
        estimatedDays: 5,
        rating: 5.0,
        message:
          "Premium quality with detailed finishing. Will be printed in high-resolution resin.",
      },
    ],
  },
];

const StatusBadge = ({ status }: { status: PrintRequest["status"] }) => {
  const statusConfig = {
    pending: {
      color: "text-yellow-400 bg-yellow-400/20",
      label: "Waiting for Quotes",
    },
    quoted: { color: "text-blue-400 bg-blue-400/20", label: "Quotes Received" },
    accepted: {
      color: "text-purple-400 bg-purple-400/20",
      label: "Quote Accepted",
    },
    printing: {
      color: "text-green-400 bg-green-400/20",
      label: "In Production",
    },
    completed: { color: "text-gray-400 bg-gray-400/20", label: "Completed" },
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
    pending: "text-yellow-400 bg-yellow-400/10",
    quoted: "text-blue-400 bg-blue-400/10",
    accepted: "text-purple-400 bg-purple-400/10",
    printing: "text-green-400 bg-green-400/10",
    completed: "text-gray-400 bg-gray-400/10",
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

export default function PrintRequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState<PrintRequest | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<
    PrintRequest["status"] | "all"
  >("all");

  // Filtrer les demandes selon le statut sélectionné
  const filteredRequests =
    statusFilter === "all"
      ? printRequests
      : printRequests.filter((request) => request.status === statusFilter);

  // Compter le nombre de demandes par statut
  const statusCounts = {
    all: printRequests.length,
    pending: printRequests.filter((r) => r.status === "pending").length,
    quoted: printRequests.filter((r) => r.status === "quoted").length,
    accepted: printRequests.filter((r) => r.status === "accepted").length,
    printing: printRequests.filter((r) => r.status === "printing").length,
    completed: printRequests.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-cal text-white">Print Orders</h1>
          <Link
            href="/design"
            className="px-4 py-2 bg-[#222222] text-white rounded-lg hover:bg-[#333333] transition-colors"
          >
            New Print Request
          </Link>
        </div>

        {/* Status Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <FilterButton
            status="all"
            label="All Orders"
            isActive={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
            count={statusCounts.all}
          />
          <FilterButton
            status="pending"
            label="Waiting for Quotes"
            isActive={statusFilter === "pending"}
            onClick={() => setStatusFilter("pending")}
            count={statusCounts.pending}
          />
          <FilterButton
            status="quoted"
            label="Quotes Received"
            isActive={statusFilter === "quoted"}
            onClick={() => setStatusFilter("quoted")}
            count={statusCounts.quoted}
          />
          <FilterButton
            status="accepted"
            label="Quote Accepted"
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
                        <div className="text-xl font-medium text-white mb-1">
                          {request.modelName}
                        </div>
                        <p className="text-sm text-gray-400">
                          Request ID: {request.id} • {request.date}
                        </p>
                      </div>
                      <StatusBadge status={request.status} />
                    </div>

                    {/* Quotes Section */}
                    {request.quotes && request.quotes.length > 0 && (
                      <div className="mt-4 space-y-4">
                        <div className="text-sm font-medium text-gray-400">
                          Quotes Received ({request.quotes.length})
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {request.quotes.map((quote) => (
                            <div
                              key={quote.id}
                              className="bg-[#181818] border border-[#222222] rounded-lg p-4"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={quote.printerAvatar}
                                    alt={quote.printerName}
                                    className="w-10 h-10 rounded-full"
                                  />
                                  <div>
                                    <div className="text-white font-medium">
                                      {quote.printerName}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                      <span className="text-yellow-400">★</span>
                                      <span className="text-gray-400">
                                        {quote.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-medium text-white">
                                    ${quote.price}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {quote.estimatedDays} days
                                  </div>
                                </div>
                              </div>
                              <p className="mt-3 text-sm text-gray-300">
                                {quote.message}
                              </p>
                              {request.status === "quoted" && (
                                <button className="mt-4 w-full px-4 py-2 bg-[#222222] text-white rounded-lg hover:bg-[#333333] transition-colors">
                                  Accept Quote
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {request.status === "pending" && (
                      <div className="mt-4 text-sm text-gray-400">
                        Waiting for quotes from printers...
                      </div>
                    )}
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
