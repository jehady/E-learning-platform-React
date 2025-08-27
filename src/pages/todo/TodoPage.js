import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaTasks, FaPlus, FaCheck, FaTrash, FaEdit, 
  FaCalendar, FaFlag, FaFilter 
} from 'react-icons/fa';
import './TodoPage.css';

const TodoPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Complete JavaScript Module 3',
      description: 'Finish the async/await lessons and submit the assignment',
      dueDate: '2024-01-20',
      priority: 'high',
      category: 'study',
      completed: false,
      courseId: 1
    },
    {
      id: 2,
      title: 'Review UI/UX Design Principles',
      description: 'Go through the design principles chapter before the quiz',
      dueDate: '2024-01-18',
      priority: 'medium',
      category: 'review',
      completed: false,
      courseId: 2
    },
    {
      id: 3,
      title: 'Submit Portfolio Project',
      description: 'Upload the final portfolio project for evaluation',
      dueDate: '2024-01-25',
      priority: 'high',
      category: 'assignment',
      completed: true,
      courseId: 1
    }
  ]);
  
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'study'
  });

  const handleAddTodo = (e) => {
    e.preventDefault();
    const todo = {
      id: Date.now(),
      ...newTodo,
      completed: false
    };
    setTodos([...todos, todo]);
    setNewTodo({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      category: 'study'
    });
    setShowAddTodo(false);
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--danger-color)';
      case 'medium': return 'var(--warning-color)';
      case 'low': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="todo-page">
      <div className="todo-header">
        <h1 className="page-title">
          <FaTasks /> To-Do List
        </h1>
        <div className="todo-actions">
          <div className="todo-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({todos.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({todos.filter(t => !t.completed).length})
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({todos.filter(t => t.completed).length})
            </button>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddTodo(true)}
          >
            <FaPlus /> Add Task
          </button>
        </div>
      </div>

      <div className="todo-content">
        <div className="todo-list">
          {filteredTodos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="checkbox"
                />
              </div>
              
              <div className="todo-content-area">
                <div className="todo-main">
                  <h3 className="todo-title">{todo.title}</h3>
                  <p className="todo-description">{todo.description}</p>
                </div>
                
                <div className="todo-meta">
                  <div className="todo-tags">
                    <span 
                      className="priority-tag"
                      style={{ backgroundColor: getPriorityColor(todo.priority) }}
                    >
                      <FaFlag /> {todo.priority}
                    </span>
                    <span className="category-tag">{todo.category}</span>
                  </div>
                  
                  <div className="todo-date">
                    <FaCalendar />
                    <span>{todo.dueDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="todo-actions">
                <button className="action-btn edit-btn">
                  <FaEdit />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <FaTasks className="empty-icon" />
            <h2>No tasks found</h2>
            <p>
              {filter === 'all' 
                ? 'Add your first task to get started!' 
                : `No ${filter} tasks at the moment.`
              }
            </p>
          </div>
        )}
      </div>

      {showAddTodo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Task</h2>
              <button 
                className="modal-close"
                onClick={() => setShowAddTodo(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddTodo} className="todo-form">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                  placeholder="Enter task title"
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                  placeholder="Enter task description"
                  className="form-textarea"
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                    className="form-select"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newTodo.category}
                  onChange={(e) => setNewTodo({...newTodo, category: e.target.value})}
                  className="form-select"
                >
                  <option value="study">Study</option>
                  <option value="assignment">Assignment</option>
                  <option value="review">Review</option>
                  <option value="project">Project</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddTodo(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPage;