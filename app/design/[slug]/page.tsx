"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { images } from "../data";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Image {
  url: string;
  author: string;
  pseudo: string;
  avatar: string;
}

type PrintSize = "small" | "medium" | "large";
type Material = "pla" | "abs" | "petg" | "resin";

// Prix de base par taille
const BASE_PRICES: Record<PrintSize, number> = {
  small: 29.99,
  medium: 49.99,
  large: 79.99,
};

// Prix par matériau (multiplicateur)
const MATERIAL_MULTIPLIERS: Record<Material, number> = {
  pla: 1,
  abs: 1.2,
  petg: 1.3,
  resin: 1.5,
};

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

export default function DesignDetailPage() {
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [printSize, setPrintSize] = useState<PrintSize>("medium");
  const [material, setMaterial] = useState<Material>("pla");
  const [quantity, setQuantity] = useState(1);

  const { slug } = useParams();
  const image = images.find(
    (img: Image, index: number) => index.toString() === slug
  );

  if (!image) {
    return <div>Design not found</div>;
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this amazing design by ${image.author}!`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  const calculatePrice = () => {
    const basePrice = BASE_PRICES[printSize];
    const materialMultiplier = MATERIAL_MULTIPLIERS[material];
    return (basePrice * materialMultiplier * quantity).toFixed(2);
  };

  const handleOrder = () => {
    console.log("Order details:", {
      printSize,
      material,
      quantity,
      totalPrice: calculatePrice(),
    });
  };

  return (
    <>
      <ClientBackgroundEffects />
      <section className="flex flex-col gap-4 py-8 z-10 relative">
        <div className="inline-block max-w-xl">
          <h1 className="text-5xl font-cal text-white mb-4">Amazing Design</h1>
          <p className="text-base text-gray-300">Created with Rocketship</p>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6">
          {/* Image Column */}
          <div className="col-span-8">
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-4">
              <img
                src={image.url}
                alt={`Design by ${image.author}`}
                className="w-full max-w-[500px] mx-auto rounded-lg border border-[#222222]"
              />
            </div>
          </div>

          {/* Info Column */}
          <div className="col-span-4">
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 sticky top-4">
              {/* Author Section */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#222222]">
                <img
                  src={image.avatar}
                  alt={image.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-white font-medium">{image.author}</h2>
                  <p className="text-gray-400 text-sm">{image.pseudo}</p>
                </div>
              </div>

              {/* Create Your Own Section */}
              <div className="mb-6 pb-6 border-b border-[#222222]">
                <div className="text-white text-lg font-medium mb-3">
                  Inspired? Create your own!
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Use Rocketship AI to design your unique piece and bring it to
                  life with 3D printing.
                </p>
                <Link
                  href="/design"
                  className="
                    w-full px-4 py-3 
                    bg-purple-600 flex items-center justify-center gap-2
                    rounded-lg text-sm text-white
                    hover:bg-purple-700
                    font-medium
                    transition-colors
                  "
                >
                  <span>Start Designing</span>
                </Link>
              </div>

              {/* Share and Print Options */}
              <div>
                <div className="text-white text-lg font-medium mb-3">
                  Share this design
                </div>
                <div className="flex gap-2 mb-6">
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 rounded-lg bg-[#1877F2] text-white hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 rounded-lg bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 rounded-lg bg-[#0A66C2] text-white hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>

                {!showPrintOptions ? (
                  <div className="mt-6 pt-6 border-t border-[#222222]">
                    <div className="flex items-center gap-3 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 h-5 w-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>

                      <div className="flex-1">
                        <p className="text-sm">Available as 3D Print</p>
                        <p className="text-lg font-medium text-white">
                          Starting at ${BASE_PRICES.small}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowPrintOptions(true)}
                        className="px-4 py-2 rounded-lg bg-[#222222] text-white hover:bg-[#333333] transition-colors text-sm"
                      >
                        Options
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Size
                      </label>
                      <select
                        value={printSize}
                        onChange={(e) =>
                          setPrintSize(e.target.value as PrintSize)
                        }
                        className="w-full bg-[#222222] text-white rounded-lg p-3 border border-[#333333]"
                      >
                        <option value="small">
                          Small - 10cm (Best for Desk)
                        </option>
                        <option value="medium">
                          Medium - 20cm (Most Popular)
                        </option>
                        <option value="large">
                          Large - 30cm (Statement Piece)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Material
                      </label>
                      <select
                        value={material}
                        onChange={(e) =>
                          setMaterial(e.target.value as Material)
                        }
                        className="w-full bg-[#222222] text-white rounded-lg p-3 border border-[#333333]"
                      >
                        <option value="pla">
                          PLA - Eco-friendly, Great Details
                        </option>
                        <option value="abs">
                          ABS - Durable, Heat Resistant
                        </option>
                        <option value="petg">
                          PETG - Strong, Water Resistant
                        </option>
                        <option value="resin">
                          Resin - Ultra Fine Details
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Quantity
                      </label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full bg-[#222222] text-white rounded-lg p-3 border border-[#333333]"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "piece" : "pieces"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-300">Total Price:</span>
                      <span className="text-white font-medium">
                        ${calculatePrice()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowPrintOptions(false)}
                        className="flex-1 py-3 rounded-lg bg-[#333333] text-white hover:bg-[#444444] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleOrder}
                        className="flex-1 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                      >
                        Order Print
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
