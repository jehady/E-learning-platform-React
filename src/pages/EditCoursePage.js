import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../utils/api";

const EditCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    course_name: "",
    description: "",
    is_paid: 0,
    price: "",
    start_date: "",
    end_date: "",
    requirements: [""],
    poster: null,
    posterPreview: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setFetching(true);

        // Fetch categories and course details in parallel
        const [catRes, courseRes] = await Promise.all([
          apiService.get("/api/getAllCategory"),
          apiService.get(`/api/getCourseDetails/${courseId}`),
        ]);

        if (!mounted) return;

        // Categories come as a clean array
        const categoriesFromApi = Array.isArray(catRes?.data)
          ? catRes.data
          : [];
        setCategories(categoriesFromApi);

        // Course details response
        const courseArray = courseRes?.data?.course_details || [];
        const firstWithId = courseArray.find((c) => c && c.id) || {};
        const secondObj = courseArray.find((c) => c && c.teacher_name) || {};
        const mergedDetails = {
          ...firstWithId,
          ...secondObj,
        };

        // Map category_id by matching category_name
        let matchedCategoryId = "";
        if (mergedDetails.category_name) {
          const found = categoriesFromApi.find(
            (cat) => cat.category_name === mergedDetails.category_name
          );
          matchedCategoryId = found ? found.id : "";
        }

        setForm({
          course_name: mergedDetails.course_name ?? "",
          description: mergedDetails.description ?? "",
          is_paid: mergedDetails.is_paid ?? 0,
          price: mergedDetails.price ?? "",
          start_date: mergedDetails.start_date ?? "",
          end_date: mergedDetails.end_date ?? "",
          requirements:
            mergedDetails.requirements?.length > 0
              ? mergedDetails.requirements
              : [""],
          poster: null,
          posterPreview: mergedDetails.poster ?? "",
          category_id: matchedCategoryId,
        });
      } catch (err) {
        console.error("Error fetching course or categories:", err);
        setError("Failed to load course data.");
      } finally {
        if (mounted) {
          setFetching(false);
        }
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [courseId]);

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
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        poster: file,
        posterPreview: URL.createObjectURL(file),
      }));
    }
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

      if (form.poster) {
        body.append("poster", form.poster);
      }

      const res = await apiService.post(`/api/updateCourse/${courseId}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Updated course:", res);

      alert("Course updated successfully!");
      navigate("/instructor-profile");
    } catch (err) {
      console.error("Error updating course:", err);
      setError(err.message || "Failed to update course.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div>Loading course data...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
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

        {/* Poster Upload */}
        <div>
          <label className="block font-medium mb-1">Poster</label>
          {form.posterPreview && (
            <img
              src={form.posterPreview}
              alt="Poster Preview"
              className="w-48 h-32 object-cover rounded mb-2 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Select Category</label>
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
        </div>

        {/* Paid toggle */}
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

        {/* Dates */}
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

        {/* Requirements */}
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default EditCoursePage;
