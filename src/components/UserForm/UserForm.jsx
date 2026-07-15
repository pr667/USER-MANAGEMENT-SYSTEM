import { useState, useEffect } from "react";
import { validateField, validateForm, hasErrors } from "../../utils/validators";

const EMPTY_FORM = { firstName: "", lastName: "", email: "", department: "" };
const EMPTY_ERRORS = { firstName: "", lastName: "", email: "", department: "" };

// Reusable labelled input with inline error
const FormField = ({ label, name, type = "text", value, error, onChange, onBlur, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700" htmlFor={name}>
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      id={name} name={name} type={type} value={value}
      onChange={onChange} onBlur={onBlur} placeholder={placeholder}
      className={`px-3 py-2.5 rounded-lg border text-sm transition-all outline-none ${
        error
          ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
          : "border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      }`}
    />
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const UserForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ firstName: initialData.firstName || "", lastName: initialData.lastName || "", email: initialData.email || "", department: initialData.department || "" });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors(EMPTY_ERRORS);
    setTouched({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = validateForm(formData);
    setErrors(allErrors);
    setTouched({ firstName: true, lastName: true, email: true, department: true });
    if (hasErrors(allErrors)) return;
    onSubmit(formData);
  };

  const fields = [
    { name: "firstName", label: "First Name", placeholder: "e.g. Preetham" },
    { name: "lastName", label: "Last Name", placeholder: "e.g. Kumar" },
    { name: "email", label: "Email", type: "email", placeholder: "e.g. preetham@email.com" },
    { name: "department", label: "Department", placeholder: "e.g. Engineering" },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <FormField key={field.name} {...field} value={formData[field.name]} error={errors[field.name]} onChange={handleChange} onBlur={handleBlur} />
        ))}
      </div>
      <div className="flex gap-3 mt-6">
        <button type="button" onClick={onCancel} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? "Saving..." : initialData ? "Save Changes" : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;