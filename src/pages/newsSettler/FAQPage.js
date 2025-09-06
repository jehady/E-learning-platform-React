import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
import Footer from "../../components/Footer";
import { apiService } from "../../utils/api";

export default function FAQPage() {
  const [categories, setCategories] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // ✅ Fetch FAQ categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiService.get("/api/GetAll_faq-categories");
        const cats = Array.isArray(res) ? res : [];
        setCategories(cats);
        if (cats.length > 0) {
          handleCategoryClick(cats[0]); // auto-load first category
        }
      } catch (err) {
        console.error("Failed to fetch FAQ categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Fetch FAQs by category
  const handleCategoryClick = async (cat) => {
    try {
      const res = await apiService.get(`/api/faqs/category/${cat.id}`);
      let faqsData = [];
      if (Array.isArray(res)) faqsData = res;
      else if (res) faqsData = [res];

      setActiveCategory(cat);
      setFaqs(faqsData);
    } catch (err) {
      console.error("Failed to fetch FAQs:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* <Header /> */}

      <main className="flex flex-col items-center w-full max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8">Frequently Asked Questions</h1>

        {/* Category Row */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-lg shadow transition font-medium ${
                activeCategory?.id === cat.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat.faq_category_name}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        {activeCategory && (
          <div className="w-full space-y-4">
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group [&_summary::-webkit-details-marker]:hidden border border-gray-200 rounded-md"
                >
                  <summary className="flex items-center justify-between gap-1.5 rounded-md bg-gray-50 p-4 text-gray-900 cursor-pointer">
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <svg
                      className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="px-4 pt-4 text-gray-900">{faq.answer}</p>
                </details>
              ))
            ) : (
              <p className="text-gray-500">No FAQs available in this category.</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}