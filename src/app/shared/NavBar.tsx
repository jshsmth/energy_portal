import Link from "next/link";
import { BoltIcon } from "@heroicons/react/24/outline";

export function NavBar() {
  return (
    <nav className="bg-blue-50/60 border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-grey-900 hover:bg-yellow-50 hover:shadow px-3 py-1 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Smithy Energy Home"
            >
              <BoltIcon className="h-8 w-8 text-yellow-400 drop-shadow-sm" aria-hidden="true" />
              <span>Smithy Energy</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/payments"
              className="ml-2 text-grey-700 font-semibold px-3 py-1 rounded hover:underline hover:bg-grey-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-grey-200"
            >
              Payment History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 