import { ChevronUp, ChevronDown, ChevronsUpDown, Pencil, Trash2 } from "lucide-react";
import { SORT_DIRECTIONS } from "../../constants";

// Column definitions drive both header rendering and row rendering (DRY)
const COLUMNS = [
  { key: "id", label: "ID", sortable: true },
  { key: "firstName", label: "First Name", sortable: true },
  { key: "lastName", label: "Last Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "department", label: "Department", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];

const SortIcon = ({ field, sortField, sortDirection }) => {
  if (sortField !== field) return <ChevronsUpDown className="w-4 h-4 text-gray-300" />;
  return sortDirection === SORT_DIRECTIONS.ASC
    ? <ChevronUp className="w-4 h-4 text-indigo-600" />
    : <ChevronDown className="w-4 h-4 text-indigo-600" />;
};

const UserTable = ({ users, sortField, sortDirection, onSort, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">No users found.</p>
        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs tracking-wider">
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-semibold whitespace-nowrap ${col.sortable ? "cursor-pointer select-none hover:bg-indigo-100 transition-colors" : ""}`}
                onClick={() => col.sortable && onSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && <SortIcon field={col.key} sortField={sortField} sortDirection={sortDirection} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user, index) => (
            <tr key={user.id} className={`hover:bg-indigo-50/40 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <td className="px-4 py-3 text-gray-400 font-mono">{user.id}</td>
              <td className="px-4 py-3 font-medium text-gray-800">{user.firstName}</td>
              <td className="px-4 py-3 text-gray-700">{user.lastName}</td>
              <td className="px-4 py-3 text-gray-600">{user.email}</td>
              <td className="px-4 py-3">
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {user.department}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(user)} className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-all">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => onDelete(user)} className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-all">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;