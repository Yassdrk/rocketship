"use client";
import { useState } from "react";
import { Link } from "@heroui/link";
import {
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  CubeIcon,
  BellIcon,
  CreditCardIcon,
  InboxIcon,
  StarIcon,
  PlusCircleIcon,
  CloudIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const SECTIONS = [
  {
    title: "General",
    links: [
      {
        href: "/",
        label: "Overview",
        icon: <HomeIcon className="w-5 h-5 text-gray-400" />,
      },
    ],
  },
  {
    title: "Design",
    links: [
      {
        href: "/design",
        label: "3D Model Design",
        icon: <CubeIcon className="w-5 h-5 text-gray-400" />,
      },
      {
        href: "/prompt",
        label: "Prompt Designer",
        icon: <PlusCircleIcon className="w-5 h-5 text-gray-400" />,
      },
      {
        href: "/view-designs",
        label: "View Designs",
        icon: <InboxIcon className="w-5 h-5 text-gray-400" />,
      },
    ],
  },
  {
    title: "Print",
    links: [
      {
        href: "/printers",
        label: "Printers",
        icon: <UserIcon className="w-5 h-5 text-gray-400" />,
      },
      {
        href: "/print-requests",
        label: "Print Requests",
        icon: <InboxIcon className="w-5 h-5 text-gray-400" />,
      },
      {
        href: "/printer-reviews",
        label: "Printer Reviews",
        icon: <StarIcon className="w-5 h-5 text-gray-400" />,
      },
    ],
  },

  {
    title: "Admin",
    links: [
      {
        href: "/users",
        label: "Manage Users",
        icon: <ShieldCheckIcon className="w-5 h-5 text-gray-400" />,
      },
      {
        href: "/requests",
        label: "Manage Requests",
        icon: <Cog6ToothIcon className="w-5 h-5 text-gray-400" />,
      },
      {
        href: "/subscriptions",
        label: "Subscriptions",
        icon: <CreditCardIcon className="w-5 h-5 text-gray-400" />,
      },
    ],
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // <aside
    //   className={`
    //     fixed left-0 top-0 h-screen
    //     ${isExpanded ? "w-56" : "w-16"}
    //     bg-purple-900 border-r border-purple-700/70
    //     flex flex-col py-4 z-50
    //     transition-all duration-100
    //     items-stretch shadow-lg
    //     overflow-y-auto
    //   `}
    //   onMouseEnter={() => setIsExpanded(true)}
    //   onMouseLeave={() => setIsExpanded(false)}
    // >
    <aside
      className={`
        fixed left-0 top-0 h-screen 
        ${isExpanded ? "w-56" : "w-16"}
        bg-white border-r border-gray-300/70
        flex flex-col py-4 z-50
        transition-all duration-100
        items-stretch shadow-lg
        overflow-y-auto
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo aligné à gauche */}
      <div className="flex items-center justify-start pl-4 mb-4 h-10">
        <img src="/brand/logo-rocketship.png" alt="logo" className="w-9 h-9" />
        {isExpanded && (
          <span className="font-black text-white text-xl ml-3 tracking-tight select-none">
            Rocketship
          </span>
        )}
      </div>
      {/* Sections */}
      <nav
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
        className="flex flex-col flex-1"
      >
        {SECTIONS.map((section, i) => (
          <div key={section.title} className={i !== 0 ? "mt-3" : ""}>
            <div
              className={`
                ${isExpanded ? "px-6" : "px-0"}
                text-xs text-neutral-400 tracking-wide uppercase mb-1 transition-all duration-200
                ${isExpanded ? "opacity-100" : "opacity-0"}
              `}
            >
              {isExpanded && section.title}
            </div>
            <div className="flex flex-col gap-1">
              {section.links.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`
                    flex items-center
                    ${isExpanded ? "w-48 justify-start px-2 py-1 rounded-full" : "w-12 h-12 justify-center p-0 rounded-full"}
                    mx-auto
                    border border-white/5
                    hover:bg-white/10 hover:border-white/20
                    transition-all duration-200
                    min-h-[40px]
                    group
                  `}
                  style={{
                    transition:
                      "width 0.1s cubic-bezier(.4,0,.2,1), border-radius 0.2s",
                  }}
                >
                  <span className="w-7 flex justify-center">{link.icon}</span>
                  {/* <span
                    className={`
                      ${isExpanded ? "ml-3" : ""}
                      text-white/90 font-medium text-[15px]
                      transition-[max-width] duration-200
                      ${isExpanded ? "opacity-100 max-w-[150px]" : "opacity-0 max-w-0 overflow-hidden"}
                      whitespace-nowrap
                    `}
                  >
                    {isExpanded ? link.label : null}
                  </span> */}
                  <span
                    className={`
                      ${isExpanded ? "ml-3" : ""}
                      text-neutral-600/90 font-medium text-[15px]
                      transition-[max-width] duration-200
                      ${isExpanded ? "opacity-100 max-w-[150px]" : "opacity-0 max-w-0 overflow-hidden"}
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
    </aside>
  );
}
