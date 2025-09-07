import React, { useState } from "react";
import { apiService } from "../utils/api";

const AddSupervisorModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiService.post(
        "/api/admin/create_supervisor_admin_account?user_type=supervisor",
        formData
      );

      // ✅ Show the message from API response
      if (res && res.message) {
        alert(res.message);
      }

      onSuccess(); // refresh list
      onClose();   // close modal
    } catch (err) {
      console.error("Error creating supervisor:", err);

      // If backend sends an error message, show it
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create supervisor. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          Add New Supervisor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={(e) =>
              handleChange("password_confirmation", e.target.value)
            }
            className="w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupervisorModal;
