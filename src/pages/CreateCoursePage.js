import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../utils/api";

const CreateCoursePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    course_name: "",
    description: "",
    is_paid: 0,
    price: "",
    start_date: "",
    end_date: "",
    requirements: [""],
    poster: null,
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setFetchingCategories(true);
        const res = await apiService.get("/api/getAllCategory");
        const categoriesFromApi = Array.isArray(res) ? res : [];
        console.log(categoriesFromApi);
        setCategories(categoriesFromApi);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (i, value) => {
    const updated = [...form.requirements];
    updated[i] = value;
    setForm((prev) => ({ ...prev, requirements: updated }));
  };

  const addRequirement = () => {
    setForm((prev) => ({ ...prev, requirements: [...prev.requirements, ""] }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, poster: e.target.files[0] }));
  };

  const togglePaid = () => {
    setForm((prev) => ({
      ...prev,
      is_paid: prev.is_paid ? 0 : 1,
      price: prev.is_paid ? "" : prev.price,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("course_name", form.course_name);
      body.append("description", form.description);
      body.append("is_paid", form.is_paid);
      if (form.is_paid) body.append("price", form.price);
      body.append("start_date", form.start_date);
      body.append("end_date", form.end_date);
      body.append("category_id", form.category_id);
      form.requirements.forEach((req, i) =>
        body.append(`requirements[${i}]`, req)
      );
      if (form.poster) body.append("poster", form.poster);

      const res = await apiService.post("/api/createCourse", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Safe extraction of course ID
      const courseId = res?.id || res?.data?.id;

      if (courseId) {
        console.log("Created course ID:", courseId);
        navigate(`/add-videos/${courseId}`);
      } else {
        console.error("No course ID found in response:", res);
        setError("Could not create course. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="course_name"
          placeholder="Course Name"
          className="w-full border p-2 rounded"
          value={form.course_name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* Category Dropdown */}
        <div>
          <label className="block font-medium mb-1">Select Category</label>
          {fetchingCategories ? (
            <p className="text-gray-500 text-sm">Loading categories...</p>
          ) : (
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Select a Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>  
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Paid Course</label>
          <input
            type="checkbox"
            checked={!!form.is_paid}
            onChange={togglePaid}
          />
        </div>
        {form.is_paid ? (
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={handleChange}
            required
          />
        ) : (
          <p className="text-gray-500 text-sm">This course will be free</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="start_date"
            className="border p-2 rounded"
            value={form.start_date}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="end_date"
            className="border p-2 rounded"
            value={form.end_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Requirements</label>
          {form.requirements.map((req, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Requirement ${i + 1}`}
              className="w-full border p-2 rounded mb-2"
              value={req}
              onChange={(e) => handleRequirementChange(i, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="text-blue-600 text-sm"
          >
            + Add Requirement
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default CreateCoursePage;

