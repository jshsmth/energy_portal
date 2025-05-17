import type { Filter } from "../types/accounts";
import { Dispatch, SetStateAction } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface FilterBarProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export function FilterBar({ filter, setFilter }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-6 bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Filters</h2>
      <div className="flex flex-col w-full">
        <label htmlFor="energyType" className="text-sm font-medium text-gray-700 mb-1">
          Energy Type
        </label>
        <div className="relative">
          <select
            id="energyType"
            className="border rounded p-2 pr-8 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition w-full appearance-none"
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
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search by address"
          className="border rounded p-2 pl-9 w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          value={filter.search}
          onChange={(event) => setFilter({ ...filter, search: event.target.value })}
        />
        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
