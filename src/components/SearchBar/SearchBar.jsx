import { Search, X } from "lucide-react";

// Parent controls debouncing via useDebounce hook
const SearchBar = ({ value, onChange }) => (
  <div className="relative flex-1 min-w-[200px]">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name, email, department..."
      className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all placeholder-gray-400"
    />
    {value && (
      <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Clear search">
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default SearchBar;