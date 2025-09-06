import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../utils/api";

const AddVideosPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    poster: null,
    url: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadedVideos, setUploadedVideos] = useState(0); // ✅ Track count

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const body = new FormData();
      body.append("title", form.title);
      body.append("description", form.description);
      if (form.poster) body.append("poster", form.poster);
      if (form.url) body.append("url", form.url);
      body.append("course_id", courseId);

      const res = await apiService.post("/api/add_video", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res) {
        setSuccessMsg("Video uploaded successfully!");
        setUploadedVideos((prev) => prev + 1); // ✅ Increment count
        setForm({ title: "", description: "", poster: null, url: null });
      }
    } catch (err) {
      console.error("Error uploading video:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Add Videos</h1>
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          className="w-full border p-2 rounded"
          value={form.title}
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
        <input
          type="file"
          name="poster"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
          required
        />
        <input
          type="file"
          name="url"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {/* ✅ Show Finish button only after at least 1 upload */}
      {uploadedVideos > 0 && (
        <button
          onClick={() => navigate("/instructor-profile")}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          Finish
        </button>
      )}
    </div>
  );
};

export default AddVideosPage;
