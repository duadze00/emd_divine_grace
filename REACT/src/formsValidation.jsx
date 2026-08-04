import { useState } from "react";

export default function FormsTopic() {
  // ==========================================
  // MULTI-INPUT FORM STATE
  // ==========================================
  // Use a single object state to manage multiple fields cleanly.
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "developer",
    isAgreed: false,
  });

  // ==========================================
  // FORM VALIDATION STATE
  // ==========================================
  const [errors, setErrors] = useState({});

  // ==========================================
  // UNIVERSAL INPUT HANDLER
  // ==========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      // Dynamic property keys [name] handle input matching
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (!formData.isAgreed) newErrors.isAgreed = "Must accept terms";
    return newErrors;
  };

  // ==========================================
  // FORM SUBMISSION & PREVENT DEFAULT
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop standard HTML page reload
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert(
        "Form submitted successfully!\n" + JSON.stringify(formData, null, 2),
      );
    }
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}
    >
      <h2>4. React Forms Masterclass</h2>
      <form onSubmit={handleSubmit}>
        {/* Text Input */}
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.username && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.username}
            </span>
          )}
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.email && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Select Dropdown */}
        <div style={{ marginBottom: "10px" }}>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
          </select>
        </div>

        {/* Checkbox */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="isAgreed"
              checked={formData.isAgreed}
              onChange={handleChange}
            />
            Agree to terms
          </label>
          {errors.isAgreed && <br />}
          {errors.isAgreed && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.isAgreed}
            </span>
          )}
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Submit Form
        </button>
      </form>
    </div>
  );
}
