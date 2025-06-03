"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const user = {
  name: "Alice Martin",
  pseudo: "@alice",
  avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  bio: "3D artist, Character designer, and coffee lover ☕️",
  stats: {
    posts: 23,
    likes: 156,
    followers: 542,
    following: 129,
  },
  cover:
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
};

const userCreations = [
  {
    url: "https://cdn.meshy.ai/uploads/prod/56c87eb4985a785a552ae286c7a9f989d027ca2a50fbaabc57fa55077a81b1c9/publish/cover-portrait/01970a99-b532-7b10-ae72-84bea1daaf67.jpg",
    title: "Alien Girl",
    date: "2 days ago",
  },
  {
    url: "https://cdn.meshy.ai/uploads/prod/bff133a4a98b09b2c0c5beb75706358727ba96f93aae73f22cc54adbc9f75d05/publish/cover-portrait/01970a0c-5f07-7340-88ec-25ecef464147.jpg",
    title: "Cyber Hero",
    date: "5 days ago",
  },
  {
    url: "https://cdn.meshy.ai/uploads/prod/7efdd1e3c13248762155121b6ef32b3bc887f9dbaff704d955a4410bc95d6bff/publish/cover-portrait/01970a79-6f6b-7f60-8b21-55f7f4a2f02b.jpg",
    title: "Pixel Samurai",
    date: "1 week ago",
  },
  {
    url: "https://cdn.meshy.ai/uploads/prod/b9ba27ceb9bfcc9fdf4416b5e603aabf5dd3683191bbde8a4fb5c28c921a6eec/publish/cover-square/01970606-634a-740c-a36e-a98f5298e68e.jpg",
    title: "Turtle Ninja",
    date: "1 week ago",
  },
];

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <main className="flex flex-col gap-4 py-8 md:py-10 z-10 text-neutral-900">
      {/* COVER */}
      <motion.div
        initial={{ scale: 1, opacity: 0.85 }}
        animate={{
          scale: [1, 1.04, 0.97, 1],
          opacity: [0.85, 0.9, 0.8, 0.85],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 w-full h-64 md:h-72 pointer-events-none z-0"
        // style={{
        //   background: `radial-gradient(circle at 60% 40%, #a259e6 35%, #c7d2fe 100%)`,
        //   filter: "blur(90px)",
        //   opacity: 0.5,
        // }}
      />

      {/* AVATAR + INFOS */}
      <section className="relative w-full pt-20 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 -mt-20 md:-mt-32">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-36 h-36 rounded-full border-4  border-purple-600  object-cover"
            />
            {/* Online badge */}
            <span className="absolute bottom-2 right-3 w-5 h-5 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold text-neutral-900">{user.name}</h1>
            <span className="text-lg text-violet-600 font-medium">
              {user.pseudo}
            </span>
            <p className="mt-2 text-neutral-600 max-w-md text-center md:text-left">
              {user.bio}
            </p>
            <div className="flex gap-4 mt-4">
              <button className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-full font-semibold text-white transition-all">
                Edit Profile
              </button>
              <button
                className={`border px-6 py-2 rounded-full font-semibold  transition-all duration-300 ${
                  isFollowing
                    ? "bg-violet-50 border-violet-600 text-violet-700"
                    : "bg-white border-violet-600 text-violet-600"
                }`}
                onClick={() => setIsFollowing((f) => !f)}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
            {/* STATS */}
            <div className="flex gap-8 mt-6">
              <div className="text-center">
                <div className="text-xl font-bold">{user.stats.posts}</div>
                <div className="text-neutral-500 text-xs">Creations</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{user.stats.likes}</div>
                <div className="text-neutral-500 text-xs">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{user.stats.followers}</div>
                <div className="text-neutral-500 text-xs">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{user.stats.following}</div>
                <div className="text-neutral-500 text-xs">Following</div>
              </div>
            </div>
          </div>
        </div>
        {/* USER CREATIONS */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            My Designs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {userCreations.map((creation, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden hover:scale-105 duration-200 cursor-pointer group border"
              >
                <div className="relative">
                  <img
                    src={creation.url}
                    alt={creation.title}
                    className="w-full h-48 object-cover"
                  />
                  {/* Button Remix visible on hover */}
                  <button
                    className="
                      absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      opacity-0 group-hover:opacity-100
                      transition-all duration-300
                      px-6 py-2 rounded-full font-semibold text-white flex gap-1
                      bg-violet-600 shadow-lg
                      text-base hover:scale-110 z-10
                    "
                    style={{
                      boxShadow:
                        "0 0 42px 2px #a259e6, inset 0 0 9px 1px #c084fc",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                      />
                    </svg>
                    Remix
                  </button>
                  {/* Gradient black for hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-semibold text-neutral-900 truncate">
                    {creation.title}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {creation.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
