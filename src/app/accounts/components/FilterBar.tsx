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
    <aside className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 w-full max-w-xs flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-bold text-grey-900">Filters</h2>
        </div>
        <button
          className="px-3 py-1 rounded-full border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-50 transition"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="energyType" className="text-xs font-medium text-grey-700 flex items-center gap-1">
            <BoltIcon className="h-4 w-4 text-blue-400" />
            Energy Type
          </label>
          <select
            id="energyType"
            className={twMerge(
              "border border-blue-100 rounded-md p-2 pr-8 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full appearance-none cursor-pointer bg-white text-grey-800 font-medium bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%231F2937%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-[right_0.75rem_center] bg-no-repeat"
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
        <div className="flex flex-col gap-1">
          <label htmlFor="search" className="text-xs font-medium text-grey-700 flex items-center gap-1">
            <MagnifyingGlassIcon className="h-4 w-4 text-blue-400" />
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by address"
            className="border border-blue-100 rounded-md p-2 pl-3 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-grey-800 font-medium"
            value={filter.search}
            onChange={(event) => setFilter({ ...filter, search: event.target.value })}
          />
        </div>
      </div>
    </aside>
  );
}
