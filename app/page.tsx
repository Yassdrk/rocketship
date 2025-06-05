"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { motion } from "framer-motion";
import { GenerationModal } from "@/components/GenerationModal";
import { LaunchModal } from "@/components/LaunchModal";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

const PLACEHOLDER_VARIANTS = [
  "I want to create a manga character",
  "I want to create an Alien character ",
  "I want to create a superhero",
];
const images = [
  {
    url: "https://cdn.meshy.ai/uploads/prod/56c87eb4985a785a552ae286c7a9f989d027ca2a50fbaabc57fa55077a81b1c9/publish/cover-portrait/01970a99-b532-7b10-ae72-84bea1daaf67.jpg",
    author: "Chuck Norris",
    pseudo: "@chuckNorris",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    url: "https://cdn.meshy.ai/uploads/prod/bff133a4a98b09b2c0c5beb75706358727ba96f93aae73f22cc54adbc9f75d05/publish/cover-portrait/01970a0c-5f07-7340-88ec-25ecef464147.jpg",
    author: "Jean Dupont",
    pseudo: "@jean",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    url: "https://cdn.meshy.ai/uploads/prod/7efdd1e3c13248762155121b6ef32b3bc887f9dbaff704d955a4410bc95d6bff/publish/cover-portrait/01970a79-6f6b-7f60-8b21-55f7f4a2f02b.jpg",
    author: "Alice Martin",
    pseudo: "@alice",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    url: "https://cdn.meshy.ai/uploads/prod/b9ba27ceb9bfcc9fdf4416b5e603aabf5dd3683191bbde8a4fb5c28c921a6eec/publish/cover-square/01970606-634a-740c-a36e-a98f5298e68e.jpg",
    author: "Turtle Ninja",
    pseudo: "@chuckNorris",
    avatar: "https://randomuser.me/api/portraits/men/92.jpg",
  },
  {
    url: "https://cdn.meshy.ai/uploads/prod/e004dee7349bc70dd5387b8a358f15fefa01b4fd5a995cdfa101c2124b396e1d/publish/cover-portrait/0197081a-5b51-726c-8976-8747ea1c9b5b.jpg",
    author: "Jean Dupont",
    pseudo: "@jean",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
  },
];

function useTypewriterPlaceholders(
  variants: string[],
  typingSpeed = 60,
  pause = 1200
) {
  const [placeholder, setPlaceholder] = useState("");
  const [variantIndex, setVariantIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = variants[variantIndex];
    if (!isDeleting) {
      if (charIndex < current.length) {
        timeoutRef.current = setTimeout(() => {
          setPlaceholder(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    } else {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setPlaceholder(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, typingSpeed / 2);
      } else {
        setIsDeleting(false);
        setVariantIndex((i) => (i + 1) % variants.length);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, isDeleting, variantIndex, variants, typingSpeed, pause]);

  return placeholder;
}

const StarRain = () => {
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 1 + Math.random() * 1.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ top: "-2%", left: `${star.left}%`, opacity: 0 }}
          animate={{
            top: "102%",
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          className="absolute bg-white rounded-full shadow-[0_0_4px_2px_rgba(255,255,255,0.2)] blur-[0.2px]"
        />
      ))}
    </div>
  );
};

const BackgroundEffects = () => {
  return (
    <>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Main glow */}
        <motion.div
          initial={{ scale: 1, opacity: 0.25 }}
          animate={{
            scale: [1, 1.03, 0.98, 1],
            opacity: [0.25, 0.32, 0.18, 0.25],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10vw] bottom-[-15vh] w-[50vw] h-[55vw]"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, #9333ea 0%, #312e81 100%)",
            filter: "blur(110px)",
          }}
        />
      </div>

      {/* Raining Stars */}
      <StarRain />
    </>
  );
};

// Create a client-side only wrapper component
const ClientBackgroundEffects = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <BackgroundEffects />;
};

export default function Home() {
  const placeholder = useTypewriterPlaceholders(PLACEHOLDER_VARIANTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [generatedModelName, setGeneratedModelName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPrompt.trim()) return;
    setIsGenerating(true);
  };

  const handleGenerationComplete = (prompt: string) => {
    setIsGenerating(false);
    setGeneratedModelName(prompt);
    setIsLaunching(true);
  };

  return (
    <>
      <ClientBackgroundEffects />
      <GenerationModal
        isOpen={isGenerating}
        prompt={currentPrompt}
        onComplete={handleGenerationComplete}
      />
      <LaunchModal
        isOpen={isLaunching}
        onClose={() => setIsLaunching(false)}
        modelName={generatedModelName}
      />

      <section className="flex flex-col gap-4 py-8 z-10 relative">
        <div className="inline-block max-w-xl">
          <h1 className="text-5xl font-cal text-white mb-8">
            What do you want to design today?
          </h1>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
            <input
              type="search"
              placeholder={placeholder}
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              className="
                w-1/2 pl-12 pr-4 py-2
                bg-[#111111]
                text-base text-white placeholder:text-gray-400
                border border-[#222222] rounded-full
                focus:outline-none focus:border-[#333333]
                transition-colors
              "
              autoComplete="off"
            />
          </div>
        </form>

        {/* Category Pills */}
        <div className="flex gap-3 mt-2">
          {["Characters", "Animals", "Manga characters", "Superheroes"].map(
            (label) => (
              <button
                key={label}
                className="
                px-4 py-2
                bg-[#111111]
                border border-[#222222] rounded-full
                text-sm text-gray-300
                hover:bg-[#181818] hover:border-[#333333]
                transition-colors
              "
                type="button"
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* Dashboard Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Generated Models */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 flex flex-col">
              <h2 className="text-xl font-cal text-white mb-2">
                Generated Models
              </h2>
              <p className="text-gray-400 mb-4 text-sm">
                Your recently generated 3D models.
              </p>
              <ul className="flex flex-col gap-3">
                <li className="bg-[#181818] border border-[#222222] rounded-lg p-4 text-gray-300 flex flex-col">
                  <span className="font-semibold text-white">
                    Astronaut Hero
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Generated: 2 days ago
                  </span>
                </li>
                <li className="bg-[#181818] border border-[#222222] rounded-lg p-4 text-gray-300 flex flex-col">
                  <span className="font-semibold text-white">Cyber Cat</span>
                  <span className="text-xs text-gray-500 mt-1">
                    Generated: 5 days ago
                  </span>
                </li>
              </ul>
            </div>

            {/* Print Orders */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 flex flex-col">
              <h2 className="text-xl font-cal text-white mb-2">Print Orders</h2>
              <p className="text-gray-400 mb-4 text-sm">
                Track your 3D print orders.
              </p>
              <ul className="flex flex-col gap-3">
                <li className="bg-[#181818] border border-[#222222] rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">
                      Order #12345
                    </span>
                    <span className="text-xs text-yellow-400">
                      In Production
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Astronaut Hero</span>
                </li>
                <li className="bg-[#181818] border border-[#222222] rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">
                      Order #12312
                    </span>
                    <span className="text-xs text-green-400">Shipped</span>
                  </div>
                  <span className="text-xs text-gray-500">Cyber Cat</span>
                </li>
              </ul>
            </div>

            {/* Sales Listings & History */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 flex flex-col">
              <h2 className="text-xl font-cal text-white mb-2">
                Sales &amp; History
              </h2>
              <p className="text-gray-400 mb-4 text-sm">
                Manage your sales listings and review your sales history.
              </p>
              <ul className="flex flex-col gap-3">
                <li className="bg-[#181818] border border-[#222222] rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">
                      Astronaut Hero
                    </span>
                    <span className="text-xs text-blue-400">Active</span>
                  </div>
                  <span className="text-xs text-gray-500">Listed for $25</span>
                </li>
                <li className="bg-[#181818] border border-[#222222] rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Cyber Cat</span>
                    <span className="text-xs text-gray-400">
                      Sold 3 days ago
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Sold for $30</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
