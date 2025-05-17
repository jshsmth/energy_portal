import { BoltIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function AccountHeader() {
  return (
    <div
      className={twMerge(
        "rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-start w-full"
      )}
      style={{ backgroundColor: "rgb(9, 30, 36)" }}
    >
      <div className={twMerge("flex-1 min-w-0")}>
        <div
          className={twMerge(
            "flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2 md:mb-3"
          )}
        >
          <BoltIcon
            className={twMerge(
              "h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-500"
            )}
          />
          <h2
            className={twMerge(
              "text-xl sm:text-2xl md:text-3xl font-light text-gray-300"
            )}
          >
            Welcome back
          </h2>
        </div>

        <div className={twMerge("mt-2 sm:mt-3 md:mt-4")}>
          <div
            className={twMerge(
              "text-white text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1"
            )}
          >
            Your Energy Plan
          </div>
          <div
            className={twMerge("text-gray-200 text-xs sm:text-sm md:text-base")}
          >
            The Free 3 Plan
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "flex-1 flex flex-col items-start md:items-end min-w-0 justify-center w-full"
        )}
      >
        <Link href="/payments" className={twMerge("w-full md:w-auto")}>
          <button
            className={twMerge(
              "w-full md:w-auto bg-blue-600 text-white px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 rounded-md sm:rounded-lg font-semibold shadow hover:bg-blue-700 transition text-xs sm:text-sm md:text-base lg:text-lg"
            )}
          >
            View Payment History
          </button>
        </Link>
      </div>
    </div>
  );
}
