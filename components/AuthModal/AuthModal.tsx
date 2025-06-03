"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Tabs,
  Tab,
  Button,
  Divider,
} from "@heroui/react";

type AuthMode = "login" | "signup";

interface AuthModalProps {
  open: boolean;
  mode?: AuthMode;
  onClose: () => void;
  onGoogleAuth?: () => void; // callback pour login Google
}

const googleSvg = (
  <svg width={20} height={20} viewBox="0 0 48 48" className="mr-2" aria-hidden>
    <g>
      <path
        fill="#4285F4"
        d="M24 9.5c3.54 0 6.33 1.53 7.79 2.81l5.77-5.77C34.4 3.1 29.72 1 24 1 14.95 1 6.98 6.74 3.36 14.44l6.91 5.37C12.39 14.38 17.7 9.5 24 9.5z"
      />
      <path
        fill="#34A853"
        d="M46.1 24.6c0-1.79-.16-3.5-.45-5.16H24v9.8h12.49c-.54 2.91-2.19 5.35-4.67 6.98l7.18 5.59C43.88 38.15 46.1 31.98 46.1 24.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.27 28.17a14.95 14.95 0 010-8.33l-6.91-5.37C1.61 17.98 1 20.93 1 24s.61 6.02 2.36 9.53l6.91-5.36z"
      />
      <path
        fill="#EA4335"
        d="M24 46c5.72 0 10.51-1.89 14.03-5.14l-7.18-5.59c-1.99 1.34-4.54 2.14-6.85 2.14-5.3 0-9.81-3.58-11.43-8.5l-6.91 5.36C6.98 41.26 14.95 46 24 46z"
      />
      <path fill="none" d="M1 1h46v46H1z" />
    </g>
  </svg>
);

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  mode = "login",
  onClose,
  onGoogleAuth,
}) => {
  const [activeTab, setActiveTab] = useState<AuthMode>(mode);

  return (
    <Modal
      isOpen={open}
      onOpenChange={onClose}
      backdrop="blur"
      placement="center"
      size="md"
      classNames={{
        backdrop: "backdrop-blur-sm",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center text-center pt-6 pb-0">
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome on Rocketship
          </span>
        </ModalHeader>
        <ModalBody className="pt-5 pb-6 px-8">
          {/* Tabs login/signup */}
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as AuthMode)}
            aria-label="Authentication tabs"
            className="mb-4 flex justify-center"
            variant="underlined"
          >
            <Tab key="login" title="Login" />
            <Tab key="signup" title="Sign Up" />
          </Tabs>

          {/* Forms */}
          {activeTab === "login" && (
            <form className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                size="md"
              />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                size="md"
              />
              <Button
                type="submit"
                className="w-full mt-2 bg-purple-600"
                size="md"
              >
                Login
              </Button>
            </form>
          )}

          {activeTab === "signup" && (
            <form className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                size="md"
              />
              <Input
                type="password"
                label="Password"
                placeholder="Choose a password"
                autoComplete="new-password"
                required
                size="md"
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
                size="md"
              />
              <Button
                type="submit"
                className="w-full mt-2  bg-purple-600"
                size="md"
              >
                Sign Up
              </Button>
            </form>
          )}
          {/* OR Divider */}
          <div className="flex items-center gap-2 my-2">
            <Divider className="flex-1" />
            <span className="uppercase text-xs text-gray-400 font-medium select-none">
              or
            </span>
            <Divider className="flex-1" />
          </div>
          {/* Google Auth Button */}
          <Button
            onClick={onGoogleAuth}
            color="default"
            variant="bordered"
            className="w-full flex items-center justify-center text-base font-normal border-gray-300 hover:border-gray-400 transition-all hover:bg-gray-50/10 mb-4 shadow-sm"
            startContent={googleSvg}
            aria-label="Continue with Google"
            type="button"
          >
            Continue with Google
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
