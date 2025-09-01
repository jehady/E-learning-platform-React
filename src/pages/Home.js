import React, { useEffect, useState } from 'react';
import CourseSection from '../components/CourseSection';
import Banner from '../components/Banner';
// import Newsletter from '../components/Newsletter';
import Header from '../components/Header';
import { apiService } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const [recommendedCourses, setRecommended] = useState([]);
  const [popularCourses, setPopular] = useState([]);
  const [trendingCourses, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        // Load categories and all courses
        const [categories, allCourses] = await Promise.all([
          apiService.get('/api/getAllCategory'),
          apiService.get('/api/getAllcourses')
        ]);
        if (!mounted) return;

        // Map categories by id for quick lookup
        const categoryById = new Map((categories || []).map(c => [c.id, c.category_name]));

        // Map API course to UI card shape
        const mapCourse = (c) => ({
          id: c.id,
          title: c.course_name,
          category: categoryById.get(c.category_id) || 'Other',
          image: typeof c.poster === 'string' && c.poster.startsWith('http') ? c.poster : `https://picsum.photos/seed/${c.id}/480/320`,
          rating: c.rating ?? 0,
          ratingCount: c.rating ? Math.max(1, Math.round(c.rating * 200)) : 0,
          price: c.is_paid ? c.price : 0,
          tag: c.status === 'published' ? '' : 'Draft'
        });

        const courses = (allCourses || []).map(mapCourse);

        // Build UI arrays while keeping the original section headings
        const interests = Array.isArray(user?.interests) ? user.interests : [];
        const isInterest = (c) => interests.includes(c.category);

        const recommended = (interests.length ? courses.filter(isInterest) : courses)
          .sort((a,b) => (b.rating||0) - (a.rating||0))
          .slice(0, 8);

        const popular = [...courses]
          .sort((a,b) => (b.rating||0) - (a.rating||0))
          .slice(0, 8);

        const trending = [...courses]
          .sort((a,b) => {
            const ad = new Date(a.updated_at || a.start_date || 0).getTime();
            const bd = new Date(b.updated_at || b.start_date || 0).getTime();
            return bd - ad;
          })
          .slice(0, 8);

        setRecommended(recommended);
        setPopular(popular);
        setTrending(trending);
      } catch (e) {
        if (!mounted) return;
        setError(e.message || 'Failed to load courses');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user]);

  // Keep the layout visible; sections will render skeletons when loading=true

  return (
    <div className="page">
      <Header />
      <CourseSection 
        title="Recommended for you" 
        courses={recommendedCourses} 
        loading={loading}
        viewAllLink="/courses/recommended" 
      />
      
      <Banner />
      
      <CourseSection 
        title="Popular courses" 
        courses={popularCourses} 
        loading={loading}
        viewAllLink="/courses/popular" 
      />
      
      <CourseSection 
        title="Trending courses" 
        courses={trendingCourses} 
        loading={loading}
        viewAllLink="/courses/trending" 
      />
      {/* <Newsletter /> */}
      {error && <div role="alert" style={{ marginTop: 12 }}>{error}</div>}
    </div>
  );
};

export default Home;