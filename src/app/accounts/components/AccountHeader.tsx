import { BoltIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function AccountHeader() {
  return (
    <div className="rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start w-full" style={{ backgroundColor: "rgb(9, 30, 36)" }}>
      <div className="flex-1 min-w-[180px]">
        <div className="flex items-center gap-3 mb-2">
          <BoltIcon className="h-8 w-8 text-blue-500" />
          <h2 className="text-3xl font-light text-gray-300">Welcome back</h2>
        </div>
       
        <div className="mt-4">
          <div className="text-white text-sm font-semibold mb-1">Your Energy Plan</div>
          <div className="text-gray-200 text-base">The Free 3 Plan</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start md:items-end min-w-[180px] justify-center w-full">
        <Link href="/payments">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-lg mt-4 md:mt-0">
            View Payment History
          </button>
        </Link>
      </div>
    </div>
  );
}
