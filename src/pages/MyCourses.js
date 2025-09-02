import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import CourseSection from '../components/CourseSection';
import { apiService } from '../utils/api';
import './MyCourses.css';

const BATCH_SIZE = 6; // how many to reveal per click

const MyCourses = () => {
  // 🔒 Only store the minimal fields you asked for
  // { id, title, price, teacher, rate }
  const [all, setAll] = useState([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch
        const payload = await apiService.get('/api/getMy-courses');

        // The endpoint returns: { data: [...], message, code }
        // But we’ll guard against any client wrapper shape.
        const rawCourses = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.data?.data)
              ? payload.data.data
              : [];

        // Minimal shape only (id, title, price, teacher, rate)
        const compact = rawCourses.map((c) => ({
          id: c?.id,
          title: c?.course_name ?? 'Untitled',
          price: c?.is_paid ? Number(c?.price ?? 0) : 0,
          // No teacher name in the payload → fallback derived from user_id
          teacher:
            c?.instructor_name ||
            c?.teacher_name ||
            (c?.user_id != null ? `Instructor #${c.user_id}` : 'Instructor'),
          rate: typeof c?.rating === 'number' ? c.rating : 0,
        }));

        const sortedById = compact
          .filter((c) => c && typeof c.id === 'number')
          .sort((a, b) => a.id - b.id);

        if (!mounted) return;

        setAll(sortedById);
        if (sortedById.length === 0) setError('You have no courses');
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load your courses');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // ⚙️ Compute the UI card shape ONLY when rendering (don’t store it)
  const uiCourses = useMemo(() => {
    const slice = all.slice(0, visibleCount);

    return slice.map((c) => ({
      // CourseCard expects these fields:
      id: c.id,
      title: c.title,
      // We don’t store image/category/tag/ratingCount; compute lightweight values here:
      image: `https://picsum.photos/seed/${c.id}/480/320`, // placeholder
      category: '', // not used for My Courses
      rating: c.rate ?? 0,
      ratingCount: c.rate ? Math.max(1, Math.round(c.rate * 200)) : 0,
      price: c.price ?? 0,
      tag: '', // not stored/needed
      // If you later want to show teacher, extend CourseCard/Section UI to use c.teacher
      // (we still keep it in `all`, but we don’t pass it to the card since your UI doesn't display it)
    }));
  }, [all, visibleCount]);

  const hasMore = visibleCount < all.length;

  const loadMore = () => {
    setVisibleCount((v) => Math.min(v + BATCH_SIZE, all.length));
  };

  return (
    <div className="page">
      <Header />
      <CourseSection
        title="My Courses"
        courses={uiCourses}
        loading={loading}
        viewAllLink="/my-courses"
      />

      {error && (
        <div role="alert" style={{ marginTop: 12, color: 'red' }}>
          {error}
        </div>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center my-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
