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
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { useReactMutation } from "@/lib/hooks/useReactQueryFn";

const Navbar = () => {
  const session = useSession();
  const { toast } = useToast();
  const { mutate, isError, isPending, isSuccess } = useReactMutation(
    "/auth/logout",
    "get"
  );

  const handleLogout = () => {
    mutate(
      {},
      {
        onSuccess: ({ data }) => {
          console.log(data);
          toast({
            variant: "success",
            title: "Success",
            description: data.message,
          });
          session.setUser(null);
        },
        onError: (error) => {
          console.log(error);
          toast({
            title: "Error",
            variant: "destructive",
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <MaxWidthWrapper className="w-full h-[10vh] px-5 flex justify-between items-center text-white">
      <Link href="/">
        <Logo />
      </Link>

      {session.user ? (
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm capitalize">
            Hi, {session.user.username}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-200">
                <User className="w-6 h-6 text-primary" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white">
              <DropdownMenuItem className="flex items-center gap-1 cursor-pointer">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem></DropdownMenuItem> */}
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 focus:bg-red-500 focus:text-white cursor-pointer"
              >
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
