import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'How to Get Started with UI/UX Design',
    date: 'June 2024',
    author: 'Jane Doe',
    excerpt: 'Learn the basics of UI/UX design and how to start your journey as a designer.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  },
  {
    id: 2,
    title: 'Top 10 Tools for Modern Web Designers',
    date: 'May 2024',
    author: 'John Smith',
    excerpt: 'Discover the best tools every web designer should know about in 2024.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167'
  },
  {
    id: 3,
    title: 'Design Systems: Why They Matter',
    date: 'April 2024',
    author: 'Emily Clark',
    excerpt: 'Understand the importance of design systems and how they can improve your workflow.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e'
  }
];

const Blog = () => (
  <div className="blog-page">
    <Header />
    <main className="blog-main">
      <h1 className="blog-title">Blog</h1>
      <div className="blog-list-grid">
        {blogPosts.map(post => (
          <div className="blog-card-modern" key={post.id}>
            <img src={post.image} alt={post.title} className="blog-card-img-modern" />
            <div className="blog-card-content-modern">
              <h2 className="blog-card-title-modern">{post.title}</h2>
              <div className="blog-card-meta-modern">{post.date} · {post.author}</div>
              <p className="blog-card-excerpt-modern">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Blog; 