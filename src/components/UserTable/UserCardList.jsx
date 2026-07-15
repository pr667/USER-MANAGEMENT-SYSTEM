import { Pencil, Trash2 } from "lucide-react";

// Mobile card layout — replaces the table on small screens
const UserCardList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">No users found.</p>
        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => (
        <div key={user.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-500 truncate mt-0.5">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">ID: {user.id}</span>
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full">{user.department}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-shrink-0">
              <button onClick={() => onEdit(user)} className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 px-2.5 py-1.5 rounded-lg transition-all">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => onDelete(user)} className="flex items-center gap-1 text-xs font-medium text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-all">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCardList;