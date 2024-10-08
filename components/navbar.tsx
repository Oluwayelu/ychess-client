"use client";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

import { Logo } from "./logo";
import { Button } from "./ui";
import SignInDialog from "./sections/auth/SignInDialog";
import SignUpDialog from "./sections/auth/SignUpDialog";
import { useSession } from "@/lib/hooks/use-session";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  const session = useSession();

  return (
    <MaxWidthWrapper className="w-full h-[10vh] px-5 flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>

      {session.user ? (
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">Hi, {session.user.username}</p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-200">
                <User className="w-6 h-6" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex items-center gap-1 cursor-pointer">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem></DropdownMenuItem> */}
              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex items-center gap-1 text-red-500 focus:bg-red-500 focus:text-white cursor-pointer">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sign Up</Button>
            </DialogTrigger>

            <SignUpDialog />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Sign In</Button>
            </DialogTrigger>

            <SignInDialog />
          </Dialog>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

Navbar.displayName = "Navbar";

export { Navbar };
