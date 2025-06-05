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
  PrinterIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      // {
      //   href: "/prompt",
      //   label: "Prompt Designer",
      //   icon: <PlusCircleIcon className="w-5 h-5" />,
      // },
      {
        href: "/design",
        label: "View Designs",
        icon: <InboxIcon className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Print",
    links: [
      {
        href: "/print/outgoing",
        label: "Print Orders",
        icon: <ArrowUpTrayIcon className="w-5 h-5" />,
      },
      {
        href: "/print/incoming",
        label: "Print Requests",
        icon: <ArrowDownTrayIcon className="w-5 h-5" />,
      },
    ],
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 224 : 64 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        delay: isExpanded ? 0 : 0.1,
      }}
      className={`
        fixed left-0 top-0 h-screen 
        bg-gradient-to-b from-[#1a0b2e] via-[#1f1145] to-[#1a0b2e]
        border-r border-purple-500/20
        flex flex-col py-4 z-50
        items-stretch
        overflow-hidden
        shadow-[inset_-1px_0_0_0_rgba(139,92,246,0.05)]
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center pl-4 mb-8 h-10">
        <div className="relative flex-shrink-0">
          <img
            src="/brand/logo-rocketship.png"
            alt="logo"
            className="w-9 h-9"
          />
        </div>
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute left-[52px] text-white text-xl tracking-tight select-none font-cal whitespace-nowrap"
            >
              Rocketship
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 px-2">
        {SECTIONS.map((section, i) => (
          <div key={section.title} className={i !== 0 ? "mt-6" : ""}>
            {/* Section Title */}
            <div className="h-6 mb-2">
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 text-xs text-purple-300/50 tracking-wider uppercase font-medium"
                  >
                    {section.title}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Section Links */}
            <div className="flex flex-col gap-1">
              {section.links.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`
                    relative
                    flex
                    h-10
                    ${isExpanded ? "w-full" : "w-10"}
                    text-gray-400 hover:text-white
                    rounded-lg
                    bg-gradient-to-r from-transparent to-transparent
                    hover:from-purple-900/20 hover:to-indigo-900/20
                    hover:border-purple-500/30
                    border border-transparent
                    transition-colors duration-200
                    group
                  `}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="w-10 grid place-items-center">
                    {React.cloneElement(link.icon, {
                      className: "w-5 h-5",
                    })}
                  </div>
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-10 h-full flex items-center"
                      >
                        <span className="font-medium text-sm whitespace-nowrap">
                          {link.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto px-2">
        <div
          className={`
          relative
          flex
          h-10
          ${isExpanded ? "w-full" : "w-10"}
          rounded-lg
          bg-[#111111]
          border border-[#222222]
          hover:bg-[#181818] hover:border-[#333333]
          transition-colors duration-200
        `}
        >
          <div className="w-10 grid place-items-center">
            <CogIcon className="w-5 h-5" />
          </div>
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute left-10 h-full flex items-center"
              >
                <span className="text-sm text-gray-400 font-medium whitespace-nowrap">
                  Settings
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
