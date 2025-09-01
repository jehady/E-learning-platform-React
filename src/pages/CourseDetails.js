import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import CourseGallery from '../components/CourseGallery';
import CourseTabs from '../components/CourseTabs';
import InstructorCard from '../components/InstructorCard';
import CourseInfoBox from '../components/CourseInfoBox';
import StripePaymentModal from '../components/StripePaymentModal';
import { apiService } from '../utils/api';
import './CourseDetails.css';

const relatedCourses = [
  {
    id: 1,
    title: 'Digital Poster Design: Best Practices',
    category: 'Graphic Design',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42',
    rating: 4.5,
    ratingCount: '1233',
    price: 99
  },
  {
    id: 2,
    title: 'Build Awesome Color Palette for Your App',
    category: 'UI/UX Design',
    tag: '15% off',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
    rating: 4.5,
    ratingCount: '123',
    price: 49
  },
  {
    id: 3,
    title: 'Principles of Great UI Design System',
    category: 'UI/UX Design',
    tag: '',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
    rating: 4.5,
    ratingCount: '123',
    price: 29
  },
  {
    id: 4,
    title: 'Prototype for Your First Mobile Application',
    category: 'Photography & Video',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    rating: 4.5,
    ratingCount: '123',
    price: 49
  }
];

const CourseDetails = () => {
  const { id } = useParams();
  const [showStripe, setShowStripe] = useState(false);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(1);

  // Fetch course details + category name
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [detailPayload, categories] = await Promise.all([
          apiService.get(`/api/getCourseDetails/${id}`),
          // cache categories in localStorage; fetch only if not cached
          (async () => {
            const cached = localStorage.getItem('categoriesCache');
            if (cached) return JSON.parse(cached);
            const list = await apiService.get('/api/getAllCategory');
            localStorage.setItem('categoriesCache', JSON.stringify(list || []));
            return list;
          })()
        ]);
        if (!mounted) return;
        const details = detailPayload?.course_details || detailPayload;
        setCourse(details);
        const teacherObj = detailPayload?.["teacher name"]; // API key with space
        if (teacherObj && teacherObj.username) {
          setTeacherName(teacherObj.username);
        }
        const vids = Array.isArray(detailPayload?.videos) ? detailPayload.videos : [];
        setVideos(vids);
        setSelectedVideo(vids[0] || null);
        const cat = (categories || []).find(c => c.id === details?.category_id);
        setCategoryName(cat?.category_name || details?.category_name || '');
      } catch (e) {
        if (!mounted) return;
        setCourse(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  // Handler for following instructor
  const handleFollowInstructor = () => {
    // In a real implementation, this would make an API call
    alert('Following instructor! (API call would go here)');
  };

  // Handler for buying course
  const handleBuyCourse = () => {
    setShowStripe(true);
  };

  // Handler for adding to cart
  const handleAddToCart = () => {
    // In a real implementation, this would make an API call
    alert('Added to cart! (API call would go here)');
  };

  const placeholderImg = course?.poster && typeof course.poster === 'string'
    ? course.poster
    : `https://picsum.photos/seed/course-${id}/800/450`;

  const title = course?.course_name || '...';
  const rating = course?.rating || 0;
  const price = course?.is_paid ? (course?.price || 0) : 0;

  const Skeleton = () => (
    <div className="cd-skeleton">
      <div className="cd-skel-header">
        <div className="skel-line" style={{ width: '220px' }} />
        <div className="skel-line" style={{ width: '60%' }} />
      </div>
      <div className="cd-skel-body">
        <div className="skel-media" />
        <div className="skel-side">
          <div className="skel-card" />
          <div className="skel-card" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="course-details-page">
      <main className="cd-main">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <section className="cd-header">
              <nav className="cd-breadcrumbs">
                <Link to="/home">Home</Link> <span>/</span> <span>{categoryName || 'Category'}</span> <span>/</span> <span>{title}</span>
              </nav>
              <h1 className="cd-title">{title}</h1>
              <div className="cd-meta">
                <span className="cd-rating">★ {rating.toFixed(1)}</span>
                <span className="cd-instructor">{teacherName || 'Instructor'}</span>
                <span className="cd-videos-count">Videos: {course?.videos_count ?? videos.length}</span>
              </div>
            </section>
        
            <section className="cd-content-wrapper">
              <div className="cd-main-content">
                {videos.length > 0 ? (
                  selectedVideo ? (
                    <video
                      key={selectedVideo.id}
                      src={selectedVideo.url}
                      poster={selectedVideo.poster || placeholderImg}
                      controls
                      preload="none"
                      style={{ width: '100%', borderRadius: 12 }}
                    />
                  ) : null
                ) : (
                  <img src={placeholderImg} alt={title} style={{ width: '100%', borderRadius: 12 }} loading="lazy" />
                )}

                {videos.length > 0 && (
                  <div className="cd-playlist">
                    {videos.slice(0, visibleCount).map(v => (
                      <button
                        key={v.id}
                        className={`cd-playlist-item ${selectedVideo?.id === v.id ? 'active' : ''}`}
                        onClick={() => setSelectedVideo(v)}
                      >
                        <div className="cd-playlist-thumb">
                          <img src={v.poster || placeholderImg} alt={v.title} loading="lazy" />
                        </div>
                        <div className="cd-playlist-meta">
                          <div className="cd-playlist-title">{v.title}</div>
                          <div className="cd-playlist-desc">{v.description}</div>
                        </div>
                        <div className="cd-playlist-duration">{v.duration}</div>
                      </button>
                    ))}
                    {visibleCount < videos.length && (
                      <button className="cd-show-more" onClick={() => setVisibleCount(Math.min(visibleCount + 5, videos.length))}>Show more</button>
                    )}
                  </div>
                )}

                <CourseTabs relatedCourses={relatedCourses} />
              </div>
              
              <aside className="cd-sidebar">
                <InstructorCard
                  avatar="https://randomuser.me/api/portraits/women/44.jpg"
                  name={teacherName || 'Instructor'}
                  role="Top teacher"
                  onFollow={handleFollowInstructor}
                />
                <CourseInfoBox
                  title={title}
                  rating={rating}
                  lessons={"-"}
                  documentStatus={course?.status || 'published'}
                  price={price}
                  onBuy={handleBuyCourse}
                  onAddToCart={handleAddToCart}
                />
              </aside>
            </section>
          </>
        )}
      </main>
      <StripePaymentModal
        open={showStripe}
        onClose={() => setShowStripe(false)}
        price={price}
      />
    </div>
  );
};

export default CourseDetails;
