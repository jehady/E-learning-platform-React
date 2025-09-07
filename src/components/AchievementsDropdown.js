import React, { useEffect, useRef, useState } from "react";
import { apiService, API_BASE_URL } from "../utils/api";
import {
  FaTrophy,
  FaCheckCircle,
  FaMedal,
  FaHourglassHalf,
  FaTimes,
} from "react-icons/fa";
import "./AchievementsDropdown.css";

const AchievementsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Safe unwrap for various apiService shapes
  const pickArray = (res) => {
    if (!res) return [];
    // common shapes: {data:[...]} or [...]
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await apiService.get("/api/show_my_achievements");
      setAchievements(pickArray(res));
    } catch (err) {
      console.error("Achievements fetch error:", err);
      setError("Failed to load achievements.");
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  // Load once on mount to have the badge count ready
  useEffect(() => {
    fetchAchievements();
  }, []);

  // Close on outside click / ESC
  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      const t = triggerRef.current;
      const m = menuRef.current;
      if (m && !m.contains(e.target) && t && !t.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const completedCount = achievements.filter((a) => Number(a.is_done) === 1).length;

  const handleToggle = async () => {
    const next = !open;
    setOpen(next);
    if (next) {
      // refresh when opening to show latest
      fetchAchievements();
    }
  };

  return (
    <div className="ach-dropdown">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className="ach-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        title="Achievements"
      >
        <FaTrophy className="ach-trigger-icon" />
        {completedCount > 0 && (
          <span className="ach-badge" aria-label={`${completedCount} completed`}>
            {completedCount}
          </span>
        )}
      </button>

      {open && (
        <div ref={menuRef} className="ach-menu" role="menu">
          <div className="ach-menu-header">
            <div className="ach-menu-title">
              <FaMedal /> Your Achievements
            </div>
            <button className="ach-close" onClick={() => setOpen(false)} aria-label="Close">
              <FaTimes />
            </button>
          </div>

          <div className="ach-menu-body">
            {loading && (
              <div className="ach-loading">
                <span className="ach-spinner" /> Loading achievements…
              </div>
            )}

            {!loading && error && <div className="ach-error">{error}</div>}

            {!loading && !error && achievements.length === 0 && (
              <div className="ach-empty">
                <FaHourglassHalf />
                <div>No achievements yet</div>
                <p>Keep learning to unlock your first one!</p>
              </div>
            )}

            {!loading && !error && achievements.length > 0 && (
              <ul className="ach-list">
                {achievements.map((item) => {
                  const done = Number(item.is_done) === 1;
                  const pct = Math.max(
                    0,
                    Math.min(100, Number(item.progress_percentage) || 0)
                  );

                  return (
                    <li key={item.id} className="ach-item">
                      <div className="ach-item-left">
                        {/* Optional custom icon from backend if provided */}
                        {item.icon_path ? (
                          <img
                            src={
                              item.icon_path.startsWith("http")
                                ? item.icon_path
                                : `${API_BASE_URL}${item.icon_path}`
                            }
                            alt=""
                            className="ach-icon-img"
                          />
                        ) : (
                          <div className={`ach-icon ${done ? "done" : ""}`}>
                            {done ? <FaCheckCircle /> : <FaMedal />}
                          </div>
                        )}
                      </div>

                      <div className="ach-item-main">
                        <div className="ach-item-row">
                          <div className="ach-title">{item.title}</div>
                          {done && <span className="ach-chip">Completed</span>}
                        </div>
                        {item.description && (
                          <div className="ach-desc">{item.description}</div>
                        )}

                        <div className="ach-progress">
                          <div
                            className="ach-progress-bar"
                            style={{ width: `${pct}%` }}
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            role="progressbar"
                          />
                        </div>
                        <div className="ach-progress-meta">{pct}%</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="ach-menu-footer">
            {/* Hook this to a page if you add one later */}
            <button className="ach-viewall" onClick={() => setOpen(false)}>
              View all achievements
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsDropdown;
