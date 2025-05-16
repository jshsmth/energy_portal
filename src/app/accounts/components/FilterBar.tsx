interface FilterBarProps {
  filter: {
    energyType: string;
    search: string;
  };
  setFilter: (filter: { energyType: string; search: string }) => void;
}

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <select
        className="border rounded p-2"
        value={filter.energyType}
        onChange={(e) => setFilter({ ...filter, energyType: e.target.value })}
      >
        <option value="">All Energy Types</option>
        <option value="ELECTRICITY">Electricity</option>
        <option value="GAS">Gas</option>
      </select>
      <input
        type="text"
        placeholder="Search by address"
        className="border rounded p-2"
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
      />
    </div>
  );
} 