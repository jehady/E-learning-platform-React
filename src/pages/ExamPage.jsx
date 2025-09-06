import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../utils/api";

const ExamPage = () => {
  const { courseId } = useParams(); // course_id comes from route `/add-exam/:courseId`
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "instant",
    exam_mode: "mcq",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    is_mandatory: "0",
    course_id: courseId,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);


  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await apiService.post("/api/create_exam", formData);
      console.log("Exam created:",  res.id);
      setMessage("✅ Exam created successfully!");

      setTimeout(() => navigate(`/create-question/${res.id}`), 1500);
    } catch (err) {
      console.error("Error creating exam:", err);
      setMessage("❌ Failed to create exam.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">
          Create New Exam
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Exam Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exam Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="instant">Instant</option>
              <option value="final">Final</option>
              <option value="periodic">Periodic</option>
            </select>
          </div>

          {/* Exam Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exam Mode
            </label>
            <select
              value={formData.exam_mode}
              onChange={(e) => handleChange("exam_mode", e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="mcq">MCQ</option>
              <option value="project">Project</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter exam title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter exam description"
              rows="3"
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => handleChange("start_date", e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => handleChange("end_date", e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Is Mandatory */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Is Mandatory
            </label>
            <select
              value={formData.is_mandatory}
              onChange={(e) => handleChange("is_mandatory", e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Creating Exam..." : "Create Exam"}
          </button>

          {/* Message */}
          {message && (
            <div className="text-center mt-4 text-sm font-medium">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ExamPage;
