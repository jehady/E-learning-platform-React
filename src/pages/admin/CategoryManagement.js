import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaFolder, FaPlus, FaEdit, FaTrash, FaEye, 
  FaSearch, FaSort, FaImage 
} from 'react-icons/fa';
import './CategoryManagement.css';

const CategoryManagement = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const mockCategories = [
    {
      id: 1,
      name: 'Programming',
      nameAr: 'البرمجة',
      description: 'Learn programming languages and software development',
      descriptionAr: 'تعلم لغات البرمجة وتطوير البرمجيات',
      icon: '💻',
      color: '#5D5FEF',
      coursesCount: 45,
      studentsCount: 1250,
      isActive: true,
      createdAt: '2023-01-15'
    },
    {
      id: 2,
      name: 'Design',
      nameAr: 'التصميم',
      description: 'UI/UX Design, Graphic Design, and Visual Arts',
      descriptionAr: 'تصميم واجهات المستخدم والتصميم الجرافيكي والفنون البصرية',
      icon: '🎨',
      color: '#F97316',
      coursesCount: 32,
      studentsCount: 890,
      isActive: true,
      createdAt: '2023-01-20'
    },
    {
      id: 3,
      name: 'Marketing',
      nameAr: 'التسويق',
      description: 'Digital Marketing, SEO, and Business Strategy',
      descriptionAr: 'التسويق الرقمي وتحسين محركات البحث واستراتيجية الأعمال',
      icon: '📈',
      color: '#16A34A',
      coursesCount: 28,
      studentsCount: 675,
      isActive: true,
      createdAt: '2023-02-01'
    }
  ];

  const [newCategory, setNewCategory] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    icon: '',
    color: '#5D5FEF'
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const category = {
      id: Date.now(),
      ...newCategory,
      coursesCount: 0,
      studentsCount: 0,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCategories([...categories, category]);
    setNewCategory({
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      icon: '',
      color: '#5D5FEF'
    });
    setShowAddCategory(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      nameAr: category.nameAr,
      description: category.description,
      descriptionAr: category.descriptionAr,
      icon: category.icon,
      color: category.color
    });
    setShowAddCategory(true);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.nameAr.includes(searchTerm)
  );

  return (
    <div className="category-management">
      <div className="page-header">
        <h1 className="page-title">
          <FaFolder /> Category Management
        </h1>
        <div className="page-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddCategory(true)}
          >
            <FaPlus /> Add Category
          </button>
        </div>
      </div>

      <div className="categories-section">
        <div className="section-header">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="section-actions">
            <select className="sort-select">
              <option value="name">Sort by Name</option>
              <option value="courses">Sort by Courses</option>
              <option value="students">Sort by Students</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>

        <div className="categories-grid">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading categories...</p>
            </div>
          ) : (
            filteredCategories.map(category => (
              <div key={category.id} className="category-card">
                <div className="category-header">
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div className="category-status">
                    <button
                      className={`status-toggle ${category.isActive ? 'active' : 'inactive'}`}
                      onClick={() => handleToggleStatus(category.id)}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
                
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-name-ar">{category.nameAr}</p>
                  <p className="category-description">{category.description}</p>
                  
                  <div className="category-stats">
                    <div className="stat-item">
                      <span className="stat-value">{category.coursesCount}</span>
                      <span className="stat-label">Courses</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{category.studentsCount}</span>
                      <span className="stat-label">Students</span>
                    </div>
                  </div>
                </div>
                
                <div className="category-actions">
                  <button 
                    className="action-btn view-btn"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEditCategory(category)}
                    title="Edit Category"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteCategory(category.id)}
                    title="Delete Category"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredCategories.length === 0 && !loading && (
          <div className="empty-state">
            <FaFolder className="empty-icon" />
            <h2>No categories found</h2>
            <p>Create your first category to organize courses.</p>
          </div>
        )}
      </div>

      {showAddCategory && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowAddCategory(false);
                  setEditingCategory(null);
                  setNewCategory({
                    name: '',
                    nameAr: '',
                    description: '',
                    descriptionAr: '',
                    icon: '',
                    color: '#5D5FEF'
                  });
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddCategory} className="category-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Category Name (English)</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    placeholder="Enter category name"
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Category Name (Arabic)</label>
                  <input
                    type="text"
                    value={newCategory.nameAr}
                    onChange={(e) => setNewCategory({...newCategory, nameAr: e.target.value})}
                    placeholder="أدخل اسم الفئة"
                    required
                    className="form-input"
                    dir="rtl"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description (English)</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Enter category description"
                  className="form-textarea"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Description (Arabic)</label>
                <textarea
                  value={newCategory.descriptionAr}
                  onChange={(e) => setNewCategory({...newCategory, descriptionAr: e.target.value})}
                  placeholder="أدخل وصف الفئة"
                  className="form-textarea"
                  rows="3"
                  dir="rtl"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                    placeholder="📚"
                    className="form-input icon-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Color</label>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                    className="form-input color-input"
                  />
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddCategory(false);
                    setEditingCategory(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? 'Update Category' : 'Add Category'}
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