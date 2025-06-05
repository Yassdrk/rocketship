"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Données temporaires (à remplacer par des données réelles plus tard)
const userProfile = {
  name: "Thomas Anderson",
  username: "@neo",
  avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  bio: "Passionate 3D artist and designer. Creating unique pieces that blend art and functionality.",
  joinDate: "January 2024",
  stats: {
    creations: 24,
    prints: 18,
    sales: 12,
    followers: 156,
  },
};

const userCreations = [
  {
    id: 1,
    name: "Cyber Dragon",
    image:
      "https://cdn.meshy.ai/uploads/prod/7efdd1e3c13248762155121b6ef32b3bc887f9dbaff704d955a4410bc95d6bff/publish/cover-portrait/01970a79-6f6b-7f60-8b21-55f7f4a2f02b.jpg",
    likes: 45,
    prints: 8,
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Space Explorer",
    image:
      "https://cdn.meshy.ai/uploads/prod/56c87eb4985a785a552ae286c7a9f989d027ca2a50fbaabc57fa55077a81b1c9/publish/cover-portrait/01970a99-b532-7b10-ae72-84bea1daaf67.jpg",
    likes: 32,
    prints: 5,
    date: "5 days ago",
  },
  {
    id: 3,
    name: "Forest Spirit",
    image:
      "https://cdn.meshy.ai/uploads/prod/bff133a4a98b09b2c0c5beb75706358727ba96f93aae73f22cc54adbc9f75d05/publish/cover-portrait/01970a0c-5f07-7340-88ec-25ecef464147.jpg",
    likes: 67,
    prints: 12,
    date: "1 week ago",
  },
];

const printOrders = [
  {
    id: "ORD-001",
    model: "Cyber Dragon",
    status: "In Production",
    date: "2024-01-15",
    price: 49.99,
  },
  {
    id: "ORD-002",
    model: "Space Explorer",
    status: "Shipped",
    date: "2024-01-10",
    price: 39.99,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"creations" | "prints" | "sales">(
    "creations"
  );

  return (
    <div className="min-h-screen py-8">
      {/* En-tête du profil */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 mb-8">
        <div className="flex items-start gap-6">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-24 h-24 rounded-full border-2 border-purple-600"
          />
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl font-cal text-white">
                {userProfile.name}
              </h1>
              <span className="text-gray-400">{userProfile.username}</span>
            </div>
            <p className="text-gray-300 mb-4">{userProfile.bio}</p>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-xl font-semibold text-white">
                  {userProfile.stats.creations}
                </div>
                <div className="text-sm text-gray-400">Créations</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-white">
                  {userProfile.stats.prints}
                </div>
                <div className="text-sm text-gray-400">Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-white">
                  {userProfile.stats.sales}
                </div>
                <div className="text-sm text-gray-400">Ventes</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-white">
                  {userProfile.stats.followers}
                </div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Follow
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-4 mb-6 border-b border-[#222222]">
        <button
          onClick={() => setActiveTab("creations")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "creations"
              ? "text-white border-b-2 border-purple-600"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Créations
        </button>
        <button
          onClick={() => setActiveTab("prints")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "prints"
              ? "text-white border-b-2 border-purple-600"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Impressions
        </button>
        <button
          onClick={() => setActiveTab("sales")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "sales"
              ? "text-white border-b-2 border-purple-600"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Ventes
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="grid grid-cols-1 gap-8">
        {activeTab === "creations" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userCreations.map((creation) => (
              <Link href={`/design/${creation.id}`} key={creation.id}>
                <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden hover:border-[#333333] transition-colors">
                  <img
                    src={creation.image}
                    alt={creation.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-white mb-2">
                      {creation.name}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{creation.date}</span>
                      <div className="flex gap-4">
                        <span>❤️ {creation.likes}</span>
                        <span>🖨️ {creation.prints}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "prints" && (
          <div className="space-y-4">
            {printOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#111111] border border-[#222222] rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-white font-medium">{order.model}</h3>
                  <p className="text-sm text-gray-400">Commande {order.id}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-400">{order.date}</span>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      order.status === "Shipped"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-white font-medium">${order.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "sales" && (
          <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 text-center">
            <p className="text-gray-400">
              Historique des ventes bientôt disponible
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
