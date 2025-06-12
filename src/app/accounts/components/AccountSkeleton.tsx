import { twMerge } from "tailwind-merge";

export function AccountSkeleton() {
  return (
    <div className={twMerge("flex-1 w-full")}>
      <div className={twMerge("flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6")}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={twMerge(
              "bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-blue-100 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8"
            )}
          >
            <div className={twMerge("flex-1 min-w-0")}>
              <div className={twMerge("flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4")}>
                <div className={twMerge("bg-blue-50 p-1 rounded animate-pulse")}>
                  <div className={twMerge("h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 bg-blue-200 rounded")} />
                </div>
                <div className={twMerge("h-6 bg-gray-200 rounded w-3/4 animate-pulse")} />
              </div>
              <div className={twMerge("flex items-center gap-2 mb-2 sm:mb-3 md:mb-4")}>
                <div className={twMerge("h-6 bg-gray-200 rounded w-24 animate-pulse")} />
              </div>
              <div className={twMerge("flex flex-wrap gap-1.5 sm:gap-2")}>
                {[1, 2, 3].map((j) => (
                  <div key={j} className={twMerge("h-6 bg-gray-200 rounded-full w-32 animate-pulse")} />
                ))}
              </div>
            </div>
            <div className={twMerge("hidden lg:block w-px bg-blue-100 h-20 mx-4")} />
            <div className={twMerge("flex flex-col items-start lg:items-end min-w-[100px] sm:min-w-[120px] mt-2 lg:mt-0")}>
              <div className={twMerge("h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse")} />
              <div className={twMerge("h-6 bg-gray-200 rounded w-24 mb-3 sm:mb-4 animate-pulse")} />
              <div className={twMerge("h-10 bg-gray-200 rounded-lg sm:rounded-xl w-32 animate-pulse")} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}