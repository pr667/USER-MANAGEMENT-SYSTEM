import axios from "axios";
import { BASE_URL } from "../constants";

// Central API service — all HTTP calls go through here (DRY)
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/** Fetch all users */
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

/** Fetch a single user by ID */
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

/** Add a new user — JSONPlaceholder simulates success but doesn't persist */
export const addUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

/** Update an existing user by ID */
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

/** Delete a user by ID */
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};