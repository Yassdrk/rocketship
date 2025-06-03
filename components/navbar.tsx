"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
} from "@/components/icons";
import AuthModal from "./AuthModal/AuthModal";
import { useState } from "react";

export const Navbar = () => {
  const [openAuth, setOpenAuth] = useState(false);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper:
          "bg-neutral-800 border border-neutral-700/60 rounded-lg h-9",
        input: "text-sm placeholder:text-neutral-400 text-white px-2 py-1",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search…"
      startContent={
        <SearchIcon className="text-base text-neutral-500 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <>
      <AuthModal
        open={openAuth}
        mode="login"
        onClose={() => setOpenAuth(false)}
      />
      <HeroUINavbar
        maxWidth="2xl"
        className="bg-[#1a0b2e] border-b border-purple-500/20 backdrop-blur-sm"
        position="sticky"
        style={{
          minHeight: 64,
          height: 64,
        }}
      >
        {/* Brand left */}
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-2 max-w-fit">
            <NextLink
              className="flex items-center gap-2"
              href="/"
              style={{ textDecoration: "none" }}
            >
              {/* <Logo /> */}
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Center nav links */}
        {/* <NavbarContent className="hidden lg:flex gap-1" justify="center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "text-white/80 hover:text-white px-2 py-1 text-[15px] rounded-md transition-colors duration-150",
                  "data-[active=true]:text-violet-500 data-[active=true]:font-semibold"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent> */}

        {/* Right */}
        <NavbarContent className="gap-3" justify="end">
          <NavbarItem className="hidden md:flex">
            <Button
              onPress={() => setOpenAuth(true)}
              className="
                px-4 py-2
                bg-white/5
                border border-gray-700 rounded-lg
                text-sm text-gray-300
                hover:bg-white/10 hover:text-white
                transition-colors
              "
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              onPress={() => setOpenAuth(true)}
              className="
                px-4 py-2
                bg-purple-600
                rounded-lg text-sm text-white
                hover:bg-purple-700
                transition-colors
              "
            >
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile menu */}
        <NavbarMenu>
          <div className="px-4 pt-2 pb-1">{searchInput}</div>
          <div className="mx-4 mt-2 flex flex-col gap-1">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item.href}
                  size="lg"
                  className="py-1 px-2 text-[15px] rounded-md hover:bg-neutral-800/70 transition"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </>
  );
};
