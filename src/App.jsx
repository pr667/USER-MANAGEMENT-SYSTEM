// Root component — wires all features together

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";

import useUsers from "./hooks/useUsers";
import useDebounce from "./hooks/useDebounce";

import UserTable from "./components/UserTable/UserTable";
import UserCardList from "./components/UserTable/UserCardList";
import UserForm from "./components/UserForm/UserForm";
import Pagination from "./components/Pagination/Pagination";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterPopup from "./components/FilterPopup/FilterPopup";
import Modal from "./components/Modal/Modal";
import ConfirmModal from "./components/Modal/ConfirmModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import { sortUsers, searchUsers, filterUsers, paginateUsers, getTotalPages } from "./utils/helpers";
import { DEFAULT_PAGE_LIMIT, SORT_DIRECTIONS } from "./constants";

const EMPTY_FILTERS = { firstName: "", lastName: "", email: "", department: "All" };

function App() {
  const { users, loading, error, clearError, handleAdd, handleUpdate, handleDelete } = useUsers();

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const activeFilterCount = Object.entries(filters).filter(([, val]) => val && val !== "All").length;

  // Sort
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASC);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(DEFAULT_PAGE_LIMIT);

  // Derived data — memoised to avoid redundant recalculation on every render
  const processedUsers = useMemo(() => {
    let result = users;
    result = searchUsers(result, debouncedSearch);
    result = filterUsers(result, filters);
    result = sortUsers(result, sortField, sortDirection);
    return result;
  }, [users, debouncedSearch, filters, sortField, sortDirection]);

  const totalPages = getTotalPages(processedUsers.length, pageLimit);
  const paginatedUsers = useMemo(
    () => paginateUsers(processedUsers, currentPage, pageLimit),
    [processedUsers, currentPage, pageLimit]
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => prev === SORT_DIRECTIONS.ASC ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC);
    } else {
      setSortField(field);
      setSortDirection(SORT_DIRECTIONS.ASC);
    }
    setCurrentPage(1);
  };

  const openAddModal = () => { setSelectedUser(null); setIsFormOpen(true); };
  const openEditModal = (user) => { setSelectedUser(user); setIsFormOpen(true); };
  const openDeleteModal = (user) => { setSelectedUser(user); setIsDeleteOpen(true); };

  const handleFormSubmit = async (formData) => {
    const result = selectedUser
      ? await handleUpdate(selectedUser.id, formData)
      : await handleAdd(formData);
    if (result.success) { setIsFormOpen(false); setSelectedUser(null); }
  };

  const handleConfirmDelete = async () => {
    const result = await handleDelete(selectedUser.id);
    if (result.success) { setIsDeleteOpen(false); setSelectedUser(null); }
  };

  const handleSearchChange = (val) => { setSearchQuery(val); setCurrentPage(1); };
  const handleLimitChange = (newLimit) => { setPageLimit(newLimit); setCurrentPage(1); };
  const handleApplyFilters = (newFilters) => { setFilters(newFilters); setCurrentPage(1); setIsFilterOpen(false); };
  const handleClearFilters = () => { setFilters(EMPTY_FILTERS); setCurrentPage(1); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">User Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">Ajackus Assignment</p>
          </div>
          <button onClick={openAddModal} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <ErrorMessage message={error} onDismiss={clearError} />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          <FilterPopup
            isOpen={isFilterOpen}
            onOpen={() => setIsFilterOpen(true)}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            activeCount={activeFilterCount}
          />
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(filters).map(([key, val]) => {
              if (!val || val === "All") return null;
              return (
                <span key={key} className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  {key}: {val}
                </span>
              );
            })}
            <button onClick={handleClearFilters} className="text-xs text-red-500 hover:text-red-700 font-medium underline">Clear all</button>
          </div>
        )}

        {/* Table */}
        {loading && users.length === 0 ? (
          <Loader />
        ) : (
          <>
            {/* Desktop: table | Mobile: cards */}
<div className="hidden sm:block">
  <UserTable
    users={paginatedUsers}
    sortField={sortField}
    sortDirection={sortDirection}
    onSort={handleSort}
    onEdit={openEditModal}
    onDelete={openDeleteModal}
  />
</div>
<div className="sm:hidden">
  <UserCardList
    users={paginatedUsers}
    onEdit={openEditModal}
    onDelete={openDeleteModal}
  />
</div>
            {processedUsers.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={processedUsers.length}
                limit={pageLimit}
                onPageChange={setCurrentPage}
                onLimitChange={handleLimitChange}
              />
            )}
          </>
        )}
      </main>

      {/* Add/Edit Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={selectedUser ? "Edit User" : "Add New User"}>
        <UserForm initialData={selectedUser} onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} isLoading={loading} />
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        userName={selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : ""}
        isLoading={loading}
      />
    </div>
  );
}

export default App;