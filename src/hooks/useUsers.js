import { useState, useEffect, useCallback } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/userService";
import { mapUsers } from "../utils/helpers";

/** Central hook for all user data and mutations */
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await getUsers();
      setUsers(mapUsers(raw));
    } catch {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // JSONPlaceholder simulates POST success — append locally with unique ID
  const handleAdd = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await addUser(formData);
      setUsers((prev) => [{ ...formData, id: Date.now() }, ...prev]);
      return { success: true };
    } catch {
      setError("Failed to add user. Please try again.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = useCallback(async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      await updateUser(id, formData);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...formData } : u)));
      return { success: true };
    } catch {
      setError("Failed to update user. Please try again.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return { success: true };
    } catch {
      setError("Failed to delete user. Please try again.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users, loading, error,
    clearError: () => setError(null),
    fetchUsers, handleAdd, handleUpdate, handleDelete,
  };
};

export default useUsers;