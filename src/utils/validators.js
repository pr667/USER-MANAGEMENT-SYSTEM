const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate a single field — returns error string or "" if valid */
export const validateField = (name, value) => {
  switch (name) {
    case "firstName":
      if (!value.trim()) return "First name is required.";
      if (value.trim().length < 2) return "Must be at least 2 characters.";
      if (/^\d+$/.test(value.trim())) return "Cannot be numbers only.";
      return "";
    case "lastName":
      if (!value.trim()) return "Last name is required.";
      if (value.trim().length < 2) return "Must be at least 2 characters.";
      if (/^\d+$/.test(value.trim())) return "Cannot be numbers only.";
      return "";
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address.";
      return "";
    case "department":
      if (!value.trim()) return "Department is required.";
      return "";
    default:
      return "";
  }
};

/** Validate all form fields — returns errors object */
export const validateForm = (formData) => {
  const fields = ["firstName", "lastName", "email", "department"];
  const errors = {};
  fields.forEach((field) => {
    errors[field] = validateField(field, formData[field] || "");
  });
  return errors;
};

/** True if any field has an error */
export const hasErrors = (errors) => Object.values(errors).some((msg) => msg !== "");