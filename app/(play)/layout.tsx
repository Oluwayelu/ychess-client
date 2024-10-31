"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { LogoIcon } from "@/components/logo-icon";
import { HomeIcon } from "lucide-react";

const sidebarLinks = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="text-white" />,
  },
  {
    label: "About",
    href: "/about",
    icon: <HomeIcon className="text-white" />,
  },
];

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <div
        className={cn(
          "flex flex-col md:flex-row bg-[#2d2d2d] w-full flex-1 mx-auto border border-neutral-700 overflow-hidden",
          "min-h-screen lg:h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {sidebarLinks.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>

            <div>
              <SidebarLink
                link={{
                  label: "Sign In",
                  href: "/auth/sigin",
                  icon: <div className="w-7 h-7 bg-white rounded-full" />,
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  );
}
