import Link from "next/link";
import { BoltIcon } from "@heroicons/react/24/solid";

export function NavBar() {
  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 shadow-lg" style={{ backgroundColor: "rgb(9, 30, 36)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white">
            <BoltIcon className="h-8 w-8 text-blue-500 drop-shadow-sm" aria-hidden="true" />
            <span>Smithy Energy</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 