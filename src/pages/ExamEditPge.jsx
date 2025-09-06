import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../utils/api";
import "./InstructorProfile.css"; // reuse same CSS


const ExamEditPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);
  const [editCourse, setEditCourse] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteContext, setDeleteContext] = useState(null); 
  

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await apiService.get(`/api/show_exam_by_course/${courseId}`);
        if (!mounted) return;

        const examsArray = Array.isArray(res) ? res : [];
        setExams(examsArray);
      } catch (err) {
        console.error("Error fetching exams:", err);
        setError("Failed to load exams.");
        setExams([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-page">
      <main className="profile-main">
        <div className="profile-breadcrumb">Home / Exams</div>

        <div className="profile-content-row">
          {/* LEFT MAIN SECTION */}
          <section className="profile-main-section">
            <div className="profile-overview-card">
              <h2>Exams Overview</h2>
              <p>
                This course has {exams.length}{" "}
                {exams.length === 1 ? "exam" : "exams"}.
              </p>
            </div>

            <div className="profile-courses-section">
              <div className="profile-courses-header-row">
                <h2>Exams</h2>
              </div>
              <div className="profile-courses-list">
                {exams && exams.length > 0 ? (
                  exams.map((exam) => (
                    <div
                      className="profile-course-card"
                      key={exam.id}
                      onClick={() => navigate(`/exam/${exam.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="profile-course-info">
                        <div className="profile-course-title-row">
                          <h3 className="profile-course-title">
                            {exam.title}
                          </h3>
                          <span className="profile-course-price">
                            {exam.exam_mode?.toUpperCase()}
                          </span>
                        </div>
                        <p className="profile-course-desc">
                          {exam.description}
                        </p>
                        <div className="profile-course-rating-row">
                          <span>
                            Questions: {exam.questions?.length || 0}
                          </span>
                          <button
        className="profile-course-edit-btn"
        onClick={(e) => {
          e.stopPropagation(); // 🚀 Prevents card click
          setEditCourse(exam);
        }}
      >
        Edit
      </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No exams found for this course.</p>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="profile-sidebar-section">
            <button
              className="profile-sidebar-edit"
              onClick={() => navigate(`/add-exam/${courseId}`)}
            >
              ➕ Add Exam
            </button>
          </aside>
        </div>
        
      </main>
      {editCourse && (
  <div className="edit-widget-overlay">
    <div className="edit-widget">
      <h2>What do you want to edit?</h2>

      <div className="edit-widget-actions">
        <button
          className="edit-btn update"
          onClick={() => navigate(`/add-exam/${editCourse.id}`)}
        >
          Update Exam
        </button>
        <button
  className="edit-btn delete"
  onClick={() => {
    setDeleteContext({ type: "exam", id: editCourse.id });
    setDeleteInput("");

  }}
>
  Delete Exam
</button>
   


    


      </div>

      <button className="edit-btn cancel" onClick={() => setEditCourse(null)}>
        Cancel
      </button>
    </div>
  </div>
)}
{deleteContext && (
  <div className="edit-widget-overlay">
    <div className="edit-widget">
      <h2>Are you sure you want to delete?</h2>
      <p style={{ marginBottom: "16px", color: "#555" }}>
        Type <strong>Delete</strong> below to confirm.
      </p>

      <input
        type="text"
        value={deleteInput}
        onChange={(e) => setDeleteInput(e.target.value)}
        placeholder="Type Delete"
        className="delete-confirm-input"
      />

      <div className="edit-widget-actions" style={{ marginTop: "20px" }}>
        <button
          className="edit-btn cancel"
          onClick={() => setDeleteContext(null)}
        >
          Cancel
        </button>
        <button
          className="edit-btn delete"
          disabled={deleteInput !== "Delete"}
          onClick={async () => {
            try {
              if (deleteContext.type === "exam") {
                await apiService.delete(`/api/delete_exam/${deleteContext.id}`);
              } 

              alert("Deleted successfully!");
              setDeleteContext(null);
              setEditCourse(null);

              // reload to reflect changes
              window.location.reload();
            } catch (err) {
              alert(err.message || "Failed to delete.");
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ExamEditPage;
