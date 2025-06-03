import React, { useState } from "react";
import { motion } from "framer-motion";

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelName: string;
}

const MATERIALS = [
  {
    id: "pla",
    name: "PLA",
    description: "Standard durability, great for decorative pieces",
  },
  {
    id: "abs",
    name: "ABS",
    description: "High durability, perfect for functional parts",
  },
];

const SIZES = [
  { id: "small", name: "Small (15cm)", price: 99 },
  { id: "medium", name: "Medium (25cm)", price: 149 },
  { id: "large", name: "Large (35cm)", price: 199 },
];

export function LaunchModal({ isOpen, onClose, modelName }: LaunchModalProps) {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);

  if (!isOpen) return null;

  const handleProceedToPayment = () => {
    // TODO: Implement Stripe integration
    console.log("Proceeding to payment");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111111] border border-[#222222] rounded-xl p-8 max-w-xl w-full mx-4 relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-cal text-white">Launch "{modelName}"</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((number) => (
            <div key={number} className="flex items-center">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${step >= number ? "bg-purple-500 text-white" : "bg-[#222222] text-gray-400"}
              `}
              >
                {number}
              </div>
              {number < 3 && (
                <div
                  className={`
                  w-full h-[2px] mx-2
                  ${step > number ? "bg-purple-500" : "bg-[#222222]"}
                `}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-white font-medium mb-4">
                Select Size & Material
              </h4>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-sm text-gray-400">Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        p-3 rounded-lg text-left
                        ${
                          selectedSize.id === size.id
                            ? "bg-purple-500/20 border-purple-500"
                            : "bg-[#181818] border-[#222222]"
                        }
                        border hover:border-purple-500/50 transition-colors
                      `}
                    >
                      <div className="text-white font-medium">{size.name}</div>
                      <div className="text-sm text-gray-400">${size.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div className="space-y-3">
                <label className="text-sm text-gray-400">Material</label>
                <div className="grid grid-cols-2 gap-3">
                  {MATERIALS.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className={`
                        p-3 rounded-lg text-left
                        ${
                          selectedMaterial.id === material.id
                            ? "bg-purple-500/20 border-purple-500"
                            : "bg-[#181818] border-[#222222]"
                        }
                        border hover:border-purple-500/50 transition-colors
                      `}
                    >
                      <div className="text-white font-medium">
                        {material.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {material.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-white font-medium mb-4">
                Shipping Information
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 bg-[#181818] border border-[#222222] rounded-lg px-4 py-2 text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Address</label>
                  <input
                    type="text"
                    className="w-full mt-1 bg-[#181818] border border-[#222222] rounded-lg px-4 py-2 text-white"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-400">City</label>
                    <input
                      type="text"
                      className="w-full mt-1 bg-[#181818] border border-[#222222] rounded-lg px-4 py-2 text-white"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Postal Code</label>
                    <input
                      type="text"
                      className="w-full mt-1 bg-[#181818] border border-[#222222] rounded-lg px-4 py-2 text-white"
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-white font-medium mb-4">Payment</h4>
              <div className="bg-[#181818] border border-[#222222] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Model Price</span>
                  <span className="text-white">${selectedSize.price}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">$9.99</span>
                </div>
                <div className="border-t border-[#222222] pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-white font-medium">
                      ${selectedSize.price + 9.99}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-purple-500 text-white rounded-lg py-3 font-medium hover:bg-purple-600 transition-colors"
              >
                Pay Now
              </button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              className="ml-auto bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
