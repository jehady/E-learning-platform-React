import React, { useEffect, useState } from 'react'; 
import { Link, useParams } from 'react-router-dom';
import CourseTabs from '../components/CourseTabs';
import InstructorCard from '../components/InstructorCard';
import CourseInfoBox from '../components/CourseInfoBox';
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
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [point, setPoint] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccessLoading, setPaymentSuccessLoading] = useState(false);

  // Fetch course details + check Stripe success
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);

        const [detailPayload, categories] = await Promise.all([
          apiService.get(`/api/getCourseDetails/${id}`),
          (async () => {
            
            const cached = localStorage.getItem('categoriesCache');
            if (cached) return JSON.parse(cached);
            const list = await apiService.get('/api/getAllCategory');
            localStorage.setItem('categoriesCache', JSON.stringify(list || []));
            return list;
          })()
        ]);

        if (!mounted) return; 

        

        const details = detailPayload?.course_details?.[0] || null;
console.log("details", details);
setCourse(details);

const teacherName = detailPayload?.course_details?.[1]?.teacher_name || '';
setTeacherName(teacherName);

        const sessionId = new URLSearchParams(window.location.search).get("session_id");
        if (sessionId) {
          const verifyPayment = async () => {
            try {
              setPaymentSuccessLoading(true);
              const response = await apiService.get(`/api/payment/success?session_id=${sessionId}`);

              if (!mounted) return;

              if (response?.status === 200 || response?.success) {
                setPaymentSuccess(response);
              } else {
                setPaymentError("Payment verification failed. Please try again.");
                alert("Payment verification failed.");
              }

              // Clean URL
              window.history.replaceState({}, document.title, window.location.pathname);
            } catch (err) {
              console.error("Error verifying Stripe session:", err);
              setPaymentError("Error verifying payment.");
              alert("An error occurred while verifying your payment.");
            } finally {
              if (mounted) setPaymentSuccessLoading(false);
            }
          };

          verifyPayment();
        }

        const cat = (categories || []).find(c => c.id === course?.category_id);
        setCategoryName(cat?.category_name || course?.category_name || '');
      } catch (e) {
        console.error('Error fetching course details:', e);
        if (!mounted) return;
        setCourse(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [id]);

          useEffect(() => {
  if (course) {
    console.log("Updated course state:", course);
  }
}, [course]);
  // Buy with points
  const handleProcessPayment1 = async () => {
    try {
      const response = await apiService.post('/api/payment', {
        course_id: id,
        payment_method: 'points',
        promo_code: promoCode || undefined,
        point: point || undefined
      });

      if (response.status === 200) {
        alert('Payment successful.');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred while processing your payment. Please try again.');
    }
  };

  // Buy with Stripe
  const handleProcessPayment = async () => {
    try {
      const response = await apiService.post('/api/payment', {
        course_id: id,
        payment_method: 'stripe',
        promo_code: promoCode || undefined,
        point: point || undefined
      });

      if (response?.checkout_url) {
        window.location.href = response.checkout_url;
      } else {
        console.error('Invalid response from payment API:', response);
        alert('An error occurred while processing your payment. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred while processing your payment. Please try again.');
    }
  };

  const handleBuyCourse = () => {
    setShowPaymentForm(true);
  };

  const handleAddToCart = () => {
    alert('Added to cart! (API call would go here)');
  };

  const placeholderImg = course?.poster && typeof course.poster === 'string'
    ? course.poster
    : `https://picsum.photos/seed/course-${id}/800/450`;

  const title = course?.course_name || '...';
  const rating = course?.rating || 0;
  const price = course?.price || 0;

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

                <CourseTabs
                  relatedCourses={relatedCourses}
                  description={course?.description || ''}
                  requirements={course?.requirements || []}
                />

                {/* ✅ Payment Messages */}
                {paymentSuccess && (
                  <div className="cd-payment-success">
                    <h3>✅ Payment Successful!</h3>
                    <p>Your session ID: {paymentSuccess.session_id}</p>
                  </div>
                )}
                {paymentError && (
                  <div className="cd-payment-error">
                    <h3>❌ Payment Failed</h3>
                    <p>{paymentError}</p>
                  </div>
                )}
                
                {/* Payment Form */}
                {showPaymentForm && (
                  <div className="cd-payment-form">
                    <h3>Payment Information</h3>
                    
                    <div className="cd-form-group">
                      <label htmlFor="promoCode">Promo Code (Optional)</label>
                      <input
                        type="text"
                        id="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="cd-form-input"
                      />
                    </div>
                    <div className="cd-form-actions">
                      <button
                        className="cd-course-buy"
                        onClick={handleProcessPayment1}
                      >
                        Buy With Point
                      </button>
                      <button
                        className="cd-course-buy"
                        onClick={handleProcessPayment}
                      >
                        Buy With Stripe
                      </button>
                      <button
                        className="cd-course-cart"
                        onClick={() => setShowPaymentForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <aside className="cd-sidebar">
                <InstructorCard
                  avatar="https://randomuser.me/api/portraits/women/44.jpg"
                  name={teacherName || 'Instructor'}
                  role="Top teacher"
                  onFollow={() => {}}
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
    </div>
  );
};

export default CourseDetails;
