import React, { useState, useEffect, useCallback } from "react";
import { FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import { apiService } from "../../utils/api";

const FAQManagement = () => {
  const [view, setView] = useState("categories"); // "categories" | "faqs"
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState(null);
  const [faqs, setFaqs] = useState([]);

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [addFaqModal, setAddFaqModal] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  // ✅ Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiService.get("/api/GetAll_faq-categories");
      const cats = Array.isArray(res) ? res : [];
      setCategories(cats);
    } catch (err) {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ✅ Fetch FAQs by category
  const fetchFaqs = async (cat) => {
    try {
      setLoading(true);
      const res = await apiService.get(`/api/faqs/category/${cat.id}`);
      let faqsData = [];
      if (Array.isArray(res)) {
        faqsData = res;
      } else if (res) {
        faqsData = [res];
      }
      setFaqs(faqsData);
      setActiveCategory(cat);
      setView("faqs");
    } catch (err) {
      setError("Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await apiService.post("/api/Create_faq-categories", {
        faq_category_name: newCategory,
      });
      setNewCategory("");
      setAddCategoryModal(false);
      fetchCategories();
    } catch {
      alert("Failed to add category.");
    }
  };

  // ✅ Add FAQ

  const handleAddFaq = async () => {
    try {
      await   apiService.post("/api/Create_faq", {
        question: newFaq.question,
        answer: newFaq.answer,
        faq_category_id: activeCategory.id,
      });
      console.log(activeCategory.id);
    
      setNewFaq({ question: "", answer: "" });
      setAddFaqModal(false);
      fetchFaqs(activeCategory);
    } catch {
      alert("Failed to add FAQ.");
    }
  };

  // ✅ Delete Category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await apiService.delete(`/api/Delete_faq-categories/${id}`);
      fetchCategories();
    } catch {
      alert("Failed to delete category.");
    }
  };

  // ✅ Delete FAQ
  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await apiService.delete(`/api/Delete_faq/${id}`);
      fetchFaqs(activeCategory);
    } catch {
      alert("Failed to delete FAQ.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 font-bold text-2xl text-indigo-600">Logo</div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        {/* Categories View */}
        {view === "categories" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-indigo-600">
                FAQ Categories
              </h2>
              <button
                onClick={() => setAddCategoryModal(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
              >
                <FaPlus /> Add Category
              </button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => fetchFaqs(cat)}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer flex justify-between items-center"
                  >
                    <span className="font-medium">{cat.faq_category_name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(cat.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* FAQs View */}
        {view === "faqs" && activeCategory && (
          <>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setView("categories")}
                className="flex items-center text-indigo-600 hover:underline mr-4"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
              <h2 className="text-xl font-bold">{activeCategory.faq_category_name}</h2>
            </div>

            <button
              onClick={() => setAddFaqModal(true)}
              className="flex items-center gap-2 mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
            >
              <FaPlus /> Add FAQ
            </button>

            {loading ? (
              <p>Loading...</p>
            ) : faqs.length > 0 ? (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md"
                  >
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No FAQs found in this category.</p>
            )}
          </>
        )}
      </main>

      {/* Add Category Modal */}
      {addCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddCategoryModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add FAQ Modal */}
      {addFaqModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add FAQ</h3>
            <div className="space-y-4">
              <input
                value={newFaq.question}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, question: e.target.value })
                }
                placeholder="Question"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
              />
              <textarea
                value={newFaq.answer}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, answer: e.target.value })
                }
                placeholder="Answer"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setAddFaqModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFaq}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;
