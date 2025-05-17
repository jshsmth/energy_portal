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
    <aside className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col gap-7 md:gap-8 border border-blue-100">
      <div className="flex items-center gap-2 mb-2">
        <FunnelIcon className="h-5 w-5 text-blue-400" />
        <h2 className="text-xl font-bold text-grey-900">Filters</h2>
      </div>
      <div className="border-b border-blue-50 pb-4 mb-4">
        <label htmlFor="energyType" className="text-sm font-semibold text-grey-700 mb-2 flex items-center gap-1">
          <BoltIcon className="h-4 w-4 text-blue-400" />
          Energy Type
        </label>
        <div className="relative mt-1">
          <select
            id="energyType"
            className={twMerge(
              "border border-blue-100 rounded-lg p-2 pr-8 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full appearance-none cursor-pointer bg-white text-grey-800 font-medium shadow-sm"
            )}
            value={filter.energyType}
            onChange={(event) =>
              setFilter({
                ...filter,
                energyType: event.target.value as Filter["energyType"],
              })
            }
          >
            <option value="">All Energy Types</option>
            <option value="ELECTRICITY">Electricity</option>
            <option value="GAS">Gas</option>
          </select>
        </div>
      </div>
      <div className="border-b border-blue-50 pb-4 mb-4">
        <div className="relative mt-1">
          <input
            type="text"
            placeholder="Search by address"
            className="border border-blue-100 rounded-lg p-2 pl-10 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-grey-800 font-medium shadow-sm"
            value={filter.search}
            onChange={(event) => setFilter({ ...filter, search: event.target.value })}
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </span>
        </div>
      </div>
      <button
        className="mt-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition w-full md:w-auto shadow"
        onClick={handleReset}
      >
        Reset filters
      </button>
    </aside>
  );
}
