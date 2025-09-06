import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { apiService } from "../utils/api";
import { FaCheck } from "react-icons/fa";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(0);
  const pageSize = 9;
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    apiService
      .get(`/api/getAllCategory`)
      .then((data) => setCategories(data || []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleToggle = async (category) => {
    const newState = !selected[category.id];

    // Update UI instantly
    setSelected((prev) => ({ ...prev, [category.id]: newState }));

    // Call API
    try {
      await apiService.post(`/api/interests/toggle`, {
        category_id: category.id,
      });
    } catch (error) {
      console.error("Error toggling interest:", error);
    }
  };

  const start = page * pageSize;
  const currentCategories = categories.slice(start, start + pageSize);
  const hasNextPage = start + pageSize < categories.length;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Header />
      <main className="flex flex-col items-center justify-start w-full max-w-5xl p-8">
        <h1 className="text-white text-4xl font-extrabold mb-8 drop-shadow-lg">
          Choose Your Interests
        </h1>

        <div className="w-full bg-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleToggle(cat)}
              className={`h-28 w-full flex items-center justify-center text-lg font-semibold rounded-2xl shadow-lg relative transition-all duration-300 transform hover:scale-105
                ${selected[cat.id] ? "bg-gradient-to-r from-green-400 to-green-600 text-white" : "bg-white/80 text-gray-800 hover:bg-white"}`}
            >
              {cat.category_name}
              {selected[cat.id] && (
                <FaCheck className="absolute top-3 right-3 w-5 h-5 text-white drop-shadow" />
              )}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center w-full mt-6">
          {page > 0 ? (
            <button
              onClick={() => setPage(page - 1)}
              className="rounded-xl px-6 py-2 font-semibold bg-white/80 hover:bg-white shadow-md"
            >
              ← Previous
            </button>
          ) : (
            <div></div>
          )}

          <button
            onClick={() => {
              if (hasNextPage) setPage(page + 1);
              else navigate("/home"); // go home using navigate
            }}
            className="rounded-xl px-6 py-2 font-semibold bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
          >
            {hasNextPage ? "Next →" : "Home"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}