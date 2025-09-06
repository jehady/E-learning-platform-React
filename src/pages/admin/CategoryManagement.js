import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaFilter, FaTrash, FaPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { apiService } from "../../utils/api";

const sidebarItems = [
  { icon: '📊', label: 'Dashboard', path: '/subadmin' },
  { icon: '👩‍🏫', label: 'Teachers', path: '/AdminDashboard/TeacherMangment' },
  { icon: '👩‍🏫', label: 'Supervisor', path: '/Supervisorpage' },
  { icon: '🎓', label: 'Students', path: '/SubAdminPage/StudentsPage' },
  { icon: '🔔', label: 'Notifications', path: '/notifications' },
  { icon: '🔗', label: 'FAQ', path: '/FAQ' },
  { icon: '🔗', label: 'Category Management', path: '/AdminDashboard/CategoryManagement' },
];

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // ✅ Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiService.get("/api/getAllCategory");
      console.log("Categories API response:", res);

      const categoriesFromApi = Array.isArray(res) ? res : [];
      setCategories(
        categoriesFromApi.map((c) => ({
          id: c.id,
          name: c.category_name,
          createdAt: c.created_at,
        }))
      );
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ✅ Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      setLoading(true);
      await apiService.post("/api/CreateCategory", {
        category_name: newCategory,
      });
      setNewCategory("");
      setAddModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      alert("❌ Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      setLoading(true);
      await apiService.delete(`/api/DeleteCategory/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("❌ Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search filter
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f9fb",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "#fff",
          borderRight: "1px solid #f0f1f3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        
      >
        <div>
          <div
            style={{
              padding: "32px 0 24px 32px",
              fontWeight: 700,
              fontSize: 24,
              color: "#5d5fef",
              letterSpacing: 1,
            }}
          >
            Logo
          </div>
          <nav>
  {sidebarItems.map((item) => (
    <NavLink
      key={item.label}
      to={item.path}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '12px 32px',
        background: isActive ? '#f5f6ff' : 'none',
        color: isActive ? '#5d5fef' : '#222',
        borderRadius: 8,
        margin: '0 16px',
        fontWeight: 500,
        cursor: 'pointer',
        textDecoration: 'none',
      })}
    >
      <span style={{ fontSize: 18, marginRight: 16 }}>{item.icon}</span>
      {item.label}
    </NavLink>
  ))}
</nav>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "32px 40px", minWidth: 0 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: "#5d5fef" }}>
            Category Management
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            style={{
              border: "1px solid #e5e7eb",
              background: "#5d5fef",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <FaPlus /> Add Category
          </button>
        </div>

        {/* Search and Filter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <FaSearch
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#b0b3c7",
              }}
            />
            <input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 40px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 16,
                outline: "none",
              }}
            />
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#f5f6ff",
              color: "#5d5fef",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "12px 16px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <FaFilter /> Filter
          </button>
        </div>

        {/* Category Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(93,95,239,0.04)",
            padding: 32,
          }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : (
            <table
              style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}
            >
              <thead>
                <tr
                  style={{
                    color: "#b0b3c7",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  <th style={{ padding: "12px 8px" }}>CATEGORY NAME</th>
                  <th style={{ padding: "12px 8px" }}>CREATED AT</th>
                  <th style={{ padding: "12px 8px" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat, idx) => (
                  <tr
                    key={cat.id}
                    style={{ borderTop: idx === 0 ? "none" : "1px solid #f0f1f3" }}
                  >
                    <td style={{ padding: "12px 8px", fontWeight: 600 }}>
                      {cat.name}
                    </td>
                    <td style={{ padding: "12px 8px", color: "#666" }}>
                      {cat.createdAt || "—"}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff4757",
                          cursor: "pointer",
                          padding: "4px",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Add Category Modal */}
      {addModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 12,
              width: "400px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ marginBottom: 16, color: "#222" }}>Add New Category</h2>
            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: 16,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  style={{
                    background: "#ccc",
                    color: "#222",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#5d5fef",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
