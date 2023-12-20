import Link from "next/link";

import { Logo } from "./logo";
import { Button } from "./ui";

const Navbar = () => {
  return (
    <div className="max-w-6xl mx-auto h-[10vh] px-5 flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>

      <div className="inline-flex items-center gap-2">
        <Link href="/auth/signup">
          <Button>Sign Up</Button>
        </Link>

        <Link href="/auth/signin">
          <Button variant="secondary">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

Navbar.displayName = "Navbar";

export { Navbar };
