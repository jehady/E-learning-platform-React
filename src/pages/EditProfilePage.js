import React, { useState } from "react";
import { apiService } from "../utils/api";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    profile_photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profile_photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const body = new FormData();
      body.append("first_name", form.first_name);
      body.append("last_name", form.last_name);
      body.append("date_of_birth", form.date_of_birth);
      body.append("phone_number", form.phone_number);
      if (form.profile_photo) body.append("profile_photo", form.profile_photo);

      const res = await apiService.post("/api/profile/edit", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Profile
        </h1>

        {error && <div className="bg-red-100 text-red-600 p-3 mb-4 rounded">{error}</div>}
        {successMsg && <div className="bg-green-100 text-green-600 p-3 mb-4 rounded">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile photo */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={preview || "https://via.placeholder.com/120"}
                alt="Profile Preview"
                className="w-28 h-28 rounded-full object-cover border"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                ✏️
              </label>
            </div>
          </div>

          {/* First and last name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="border p-3 rounded-lg focus:ring focus:ring-blue-200"
              value={form.first_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="border p-3 rounded-lg focus:ring focus:ring-blue-200"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of birth */}
          <input
            type="date"
            name="date_of_birth"
            className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-200"
            value={form.date_of_birth}
            onChange={handleChange}
            required
          />

          {/* Phone number */}
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-200"
            value={form.phone_number}
            onChange={handleChange}
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
