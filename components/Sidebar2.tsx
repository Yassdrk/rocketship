"use client";
import { useState } from "react";
import { Link } from "@heroui/link";
import {
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  CubeIcon,
  InboxIcon,
  StarIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const SECTIONS = [
  {
    title: "General",
    links: [
      {
        href: "/",
        label: "Home",
        icon: <HomeIcon className="w-5 h-5" />,
      },
      {
        href: "/discovery",
        label: "Discovery",
        icon: <ShoppingBagIcon className="w-5 h-5" />,
      },
      {
        href: "/launches",
        label: "Your Launches",
        icon: <RocketLaunchIcon className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Design",
    links: [
      {
        href: "/design",
        label: "3D Model Design",
        icon: <CubeIcon className="w-5 h-5" />,
      },
      {
        href: "/prompt",
        label: "Prompt Designer",
        icon: <PlusCircleIcon className="w-5 h-5" />,
      },
      {
        href: "/view-designs",
        label: "View Designs",
        icon: <InboxIcon className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Stats",
    links: [
      {
        href: "/earnings",
        label: "Earnings",
        icon: <CurrencyDollarIcon className="w-5 h-5" />,
      },
      {
        href: "/leaderboard",
        label: "Leaderboard",
        icon: <TrophyIcon className="w-5 h-5" />,
      },
      {
        href: "/reviews",
        label: "Reviews",
        icon: <StarIcon className="w-5 h-5" />,
      },
    ],
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen 
        ${isExpanded ? "w-56" : "w-16"}
        bg-gradient-to-b from-[#1a0b2e] via-[#1f1145] to-[#1a0b2e]
        border-r border-purple-500/20
        flex flex-col py-4 z-50
        transition-all duration-100 ease-in-out
        items-stretch
        overflow-y-auto
        shadow-[inset_-1px_0_0_0_rgba(139,92,246,0.05)]
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-start pl-4 mb-8 h-10">
        <div className="relative">
          <img
            src="/brand/logo-rocketship.png"
            alt="logo"
            className="relative w-9 h-9"
          />
        </div>
        {isExpanded && (
          <span className="text-white text-xl ml-3 tracking-tight select-none transition-colors font-cal">
            Rocketship
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 px-2">
        {SECTIONS.map((section, i) => (
          <div key={section.title} className={i !== 0 ? "mt-6" : ""}>
            {/* Section Title */}
            <div
              className={`
                ${isExpanded ? "px-4" : "px-0"}
                text-xs text-purple-300/50 tracking-wider uppercase mb-2 transition-all duration-100
                ${isExpanded ? "opacity-100" : "opacity-0"}
                font-medium
              `}
            >
              {isExpanded && section.title}
            </div>
            {/* Section Links */}
            <div className="flex flex-col gap-1">
              {section.links.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`
                    flex items-center
                    ${isExpanded ? "w-48 justify-start px-4" : "w-12 h-12 justify-center"}
                    mx-auto
                    py-2.5
                    text-gray-400 hover:text-white
                    rounded-lg
                    bg-gradient-to-r from-transparent to-transparent
                    hover:from-purple-900/20 hover:to-indigo-900/20
                    hover:border-purple-500/30
                    border border-transparent
                    transition-all duration-100
                    group
                  `}
                  style={{
                    transition:
                      "width 0.2s cubic-bezier(.4,0,.2,1), border-radius 0.2s",
                  }}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {React.cloneElement(link.icon, {
                    className: "w-5 h-5 shrink-0",
                  })}
                  <span
                    className={`
                      ${isExpanded ? "ml-3 opacity-100 max-w-[150px]" : "opacity-0 max-w-0 overflow-hidden"}
                      font-medium text-sm
                      transition-all duration-100
                      whitespace-nowrap
                    `}
                  >
                    {isExpanded ? link.label : null}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section - could add profile or settings here */}
      <div className="mt-auto px-2">
        <div
          className={`
          mx-auto p-2 rounded-lg
          ${isExpanded ? "w-48" : "w-12"}
          bg-[#111111]
          border border-[#222222]
          hover:bg-[#181818] hover:border-[#333333]
          transition-all duration-100
        `}
        >
          <div className="flex items-center justify-center">
            <CogIcon className="w-5 h-5 shrink-0" />
            {isExpanded && (
              <span className="ml-3 text-sm text-gray-400 font-medium">
                Settings
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
