import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { DEPARTMENTS } from "../../constants";

const FilterPopup = ({ isOpen, onOpen, onClose, filters, onApply, onClear, activeCount }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const popupRef = useRef(null);

  useEffect(() => { setLocalFilters(filters); }, [filters]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    const cleared = { firstName: "", lastName: "", email: "", department: "All" };
    setLocalFilters(cleared);
    onClear();
  };

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={isOpen ? onClose : onOpen}
        className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border transition-all ${activeCount > 0 ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600"}`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeCount > 0 && (
          <span className="bg-white text-indigo-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{activeCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-30 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Filter Users</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { name: "firstName", label: "First Name", placeholder: "Filter by first name", type: "input" },
              { name: "lastName", label: "Last Name", placeholder: "Filter by last name", type: "input" },
              { name: "email", label: "Email", placeholder: "Filter by email", type: "input" },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
                <input name={name} value={localFilters[name]} onChange={handleChange} placeholder={placeholder} className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Department</label>
              <select name="department" value={localFilters.department} onChange={handleChange} className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white cursor-pointer">
                {DEPARTMENTS.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <button onClick={handleClear} className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">Clear</button>
            <button onClick={() => onApply(localFilters)} className="flex-1 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPopup;