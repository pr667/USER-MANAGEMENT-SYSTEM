/**
 * Map raw JSONPlaceholder user to our app shape.
 * Assumption: `name` split on first space → firstName/lastName.
 * `company.name` used as Department (no department field in /users).
 */
export const mapUser = (user) => {
  const nameParts = user.name.split(" ");
  return {
    id: user.id,
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    email: user.email,
    department: user.company?.name || "N/A",
  };
};

export const mapUsers = (users) => users.map(mapUser);

/** Sort array of users by field and direction */
export const sortUsers = (users, field, direction) => {
  if (!field) return users;
  return [...users].sort((a, b) => {
    const valA = (a[field] || "").toString().toLowerCase();
    const valB = (b[field] || "").toString().toLowerCase();
    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

/** Filter users by global search query across all text fields */
export const searchUsers = (users, query) => {
  if (!query.trim()) return users;
  const q = query.toLowerCase();
  return users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
  );
};

/** Filter users by specific field values from the filter popup */
export const filterUsers = (users, filters) => {
  return users.filter((u) => {
    const matchFirst = !filters.firstName || u.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const matchLast = !filters.lastName || u.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const matchEmail = !filters.email || u.email.toLowerCase().includes(filters.email.toLowerCase());
    const matchDept = !filters.department || filters.department === "All" || u.department.toLowerCase().includes(filters.department.toLowerCase());
    return matchFirst && matchLast && matchEmail && matchDept;
  });
};

/** Return the slice for the current page */
export const paginateUsers = (users, page, limit) => {
  const start = (page - 1) * limit;
  return users.slice(start, start + limit);
};

export const getTotalPages = (totalCount, limit) => Math.ceil(totalCount / limit);