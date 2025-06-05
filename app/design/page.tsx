"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { motion } from "framer-motion";

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
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ top: "-2%", left: `${star.left}%`, opacity: 0 }}
          animate={{
            top: "102%",
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_2px_1px_rgba(255,255,255,0.2)]"
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

export default function DesignPage() {
  const placeholder = useTypewriterPlaceholders(PLACEHOLDER_VARIANTS);

  return (
    <>
      <ClientBackgroundEffects />

      <section className="flex flex-col gap-4 py-8 z-10 relative">
        <div className="inline-block max-w-xl">
          <h1 className="text-5xl font-cal text-white mb-4">Designs</h1>
          <p className="text-base text-gray-300 ">
            Browse all the designs you've made with Rocketship. Share them or
            print them to bring them to life!
          </p>
        </div>

        {/* Trending Designs Section */}
        <div className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="
                  group rounded-xl p-3
                  bg-[#111111]
                  border border-[#222222]
                  hover:bg-[#181818] hover:border-[#333333]
                  transition-all duration-200
                "
              >
                {/* Image Card */}
                <div className="relative">
                  <img
                    src={src.url}
                    alt={`Design by ${src.author}`}
                    className="w-full aspect-square object-cover rounded-lg border border-[#222222]"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#111111] opacity-0 group-hover:opacity-95 transition-opacity flex items-center justify-center gap-3 rounded-lg">
                    <button
                      className="
                      px-6 py-2 rounded-2xl
                      bg-white
                      text-sm font-medium text-black
                      hover:bg-gray-100
                      transition-colors
                    "
                    >
                      Remix
                    </button>
                    <Link
                      href={`/design/${idx}`}
                      className="
                      px-6 py-2 rounded-2xl
                      bg-[#333333]
                      text-sm font-medium text-white
                      hover:bg-[#444444]
                      transition-colors
                    "
                    >
                      Share
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
