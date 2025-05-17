import type { Filter } from "../types/accounts";
import { Dispatch, SetStateAction } from "react";
import { MagnifyingGlassIcon, FunnelIcon, BoltIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
interface FilterBarProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export function FilterBar({ filter, setFilter }: FilterBarProps) {
  const handleReset = () => {
    setFilter({ energyType: "", search: "" });
  };

  return (
    <aside className={twMerge("bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md border border-blue-100 p-3 sm:p-4 md:p-5 lg:p-6 w-full max-w-xs flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6")}>
      <div className={twMerge("flex items-center justify-between mb-1")}>
        <div className={twMerge("flex items-center gap-1 sm:gap-2")}>
          <FunnelIcon className={twMerge("h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-400")} />
          <h2 className={twMerge("text-sm sm:text-base md:text-lg font-bold text-grey-900")}>Filters</h2>
        </div>
        <button
          className={twMerge("px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-200 text-blue-600 text-xs sm:text-sm font-medium hover:bg-blue-50 transition")}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className={twMerge("flex flex-col gap-2 sm:gap-3 md:gap-4")}>
        <div className={twMerge("flex flex-col gap-1")}>
          <label htmlFor="energyType" className={twMerge("text-xs font-medium text-grey-700 flex items-center gap-1")}>
            <BoltIcon className={twMerge("h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-blue-400")} />
            Energy Type
          </label>
          <select
            id="energyType"
            className={twMerge(
              "border border-blue-100 rounded-md p-1.5 sm:p-2 pr-7 sm:pr-8 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full appearance-none cursor-pointer bg-white text-grey-800 text-xs sm:text-sm md:text-base font-medium bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%231F2937%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25em_1.25em] sm:bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] sm:bg-[right_0.75rem_center] bg-no-repeat truncate"
            )}
            value={filter.energyType}
            onChange={(event) =>
              setFilter({
                ...filter,
                energyType: event.target.value as Filter["energyType"],
              })
            }
          >
            <option value="" className={twMerge("truncate")}>All Energy Types</option>
            <option value="ELECTRICITY" className={twMerge("truncate")}>Electricity</option>
            <option value="GAS" className={twMerge("truncate")}>Gas</option>
          </select>
        </div>
        <div className={twMerge("flex flex-col gap-1")}>
          <label htmlFor="search" className={twMerge("text-xs font-medium text-grey-700 flex items-center gap-1")}>
            <MagnifyingGlassIcon className={twMerge("h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-blue-400")} />
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by address"
            className={twMerge("border border-blue-100 rounded-md p-1.5 sm:p-2 pl-2 sm:pl-3 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-grey-800 text-xs sm:text-sm md:text-base font-medium")}
            value={filter.search}
            onChange={(event) => setFilter({ ...filter, search: event.target.value })}
          />
        </div>
      </div>
    </aside>
  );
}
