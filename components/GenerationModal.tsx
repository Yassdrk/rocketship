import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GenerationModalProps {
  isOpen: boolean;
  prompt: string;
  onComplete?: (modelName: string) => void;
}

export function GenerationModal({
  isOpen,
  prompt,
  onComplete,
}: GenerationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate generation steps
      const steps = [1000, 2000, 3000]; // Timing for each step
      steps.forEach((delay, index) => {
        setTimeout(() => {
          setCurrentStep(index);
        }, delay);
      });

      // Set complete after all steps
      setTimeout(() => {
        setIsComplete(true);
      }, 4000);
    } else {
      // Reset state when modal closes
      setCurrentStep(0);
      setIsComplete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    {
      label: "Analyzing prompt...",
      color: currentStep >= 0 ? "bg-purple-500" : "bg-[#222222]",
    },
    {
      label: "Generating 3D model",
      color: currentStep >= 1 ? "bg-purple-500" : "bg-[#222222]",
    },
    {
      label: "Applying textures",
      color: currentStep >= 2 ? "bg-purple-500" : "bg-[#222222]",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111111] border border-[#222222] rounded-xl p-8 max-w-lg w-full mx-4 relative"
      >
        <div className="flex flex-col items-center text-center">
          {/* Loading Animation */}
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 border-4 border-[#222222] rounded-full"></div>
            <div
              className={`absolute inset-0 border-4 border-purple-500 rounded-full ${!isComplete ? "animate-spin" : ""}`}
              style={{ borderTopColor: "transparent" }}
            ></div>
            {isComplete && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute inset-0 flex items-center justify-center text-purple-500"
              >
                <svg
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    d="M7.75 12.75L10 15.25L16.25 8.75"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-cal text-white mb-2">
            {isComplete ? "Generation Complete!" : "Generating your design"}
          </h3>

          {/* Prompt Display */}
          <p className="text-gray-400 text-sm mb-6 max-w-sm">"{prompt}"</p>

          {/* Steps */}
          <div className="w-full space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center text-sm">
                <div
                  className={`w-4 h-4 rounded-full ${step.color} mr-3`}
                ></div>
                <span
                  className={
                    currentStep >= index ? "text-white" : "text-gray-400"
                  }
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Launch Button */}
          {isComplete && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-purple-500 text-white px-8 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              onClick={() => onComplete?.(prompt)}
            >
              Launch
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
