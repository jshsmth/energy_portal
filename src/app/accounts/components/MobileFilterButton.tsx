import { FunnelIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

interface MobileFilterButtonProps {
  onClick: () => void;
  filterCount: number;
}

export function MobileFilterButton({
  onClick,
  filterCount,
}: MobileFilterButtonProps) {
  return (
    <div
      className={twMerge(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 2xl:hidden"
      )}
    >
      <button
        onClick={onClick}
        className={twMerge(
          "flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-lg border border-blue-100",
          "hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200"
        )}
      >
        <FunnelIcon className={twMerge("h-5 w-5 text-blue-500")} />
        <span className={twMerge("text-sm font-medium text-grey-900")}>
          Filters
          {filterCount > 0 && (
            <span
              className={twMerge(
                "ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-500 rounded-full"
              )}
            >
              {filterCount}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
