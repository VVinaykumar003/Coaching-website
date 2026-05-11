"use client";
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import {useRouter} from 'next/navigation';
// import {blogAPI } from '../api/api';

const Blog = () => {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetch("/api/blogs/get-all").then(res => res.json());
       
        setBlogPosts(Array.isArray(data) ? data : data.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Dynamically extract categories from the fetched posts
  const categories = ['All', ...new Set(blogPosts.map(post => post.category || 'Article'))];

  // Filter posts based on selected category
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => (post.category || 'Article') === activeCategory);

  // Reusable card render function
  const renderCard = (post) => (
    <div 
      key={post._id || post.id} 
      onClick={() => router.push(`/blogs/${post._id || post.id}`)}
      className="card bg-base-100 w-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-200 group flex flex-col cursor-pointer overflow-hidden"
    >
      <figure className="h-52 w-full relative overflow-hidden">
        <img src={post.coverImage || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop"} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
         loading='lazy'
        />
        {post.badge && (
          <div className={`absolute top-4 right-4 badge ${post.badgeColor} shadow-sm font-semibold`}>{post.badge}</div>
        )}
      </figure>
      
      <div className="card-body p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category || 'Article'}</span>
          <span className="text-xs text-base-100/50 font-medium">{new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
        <h2 className="card-title text-xl font-bold leading-snug mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
        <p className="text-base-100/70 line-clamp-3 leading-relaxed mb-4 flex-grow">
          {post.content || "Read the full post to discover more insights and tips for your exam preparation."}
        </p>
        <div className="card-actions mt-auto w-full pt-2">
          <button className="btn btn-primary w-full shadow-sm hover:shadow-md transition-all">Read More</button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="pt-10 lg:pt-8 pb-16 min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-base-100 mb-4 tracking-tight">Our Blog</h1>
          <p className="text-lg text-base-100/70 max-w-2xl mx-auto leading-relaxed">Fuel your learning journey with our latest study tips, exam updates, and deep-dive conceptual breakdowns.</p>
        </div>

        {/* Filter / Category Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 custom-scrollbar justify-start md:justify-center">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`btn btn-sm rounded-full whitespace-nowrap transition-all border border-[#1A237E] ${activeCategory === cat ? 'bg-[#1A237E] text-white' : 'bg-transparent text-[#1A237E] hover:bg-[#1A237E] hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && <div className="text-center py-16"><span className="loading loading-spinner loading-lg text-primary"></span></div>}

        {!loading && (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left mb-8">
              {filteredPosts.map(renderCard)}
            </div>

            {/* Newsletter Interstitial */}
            {filteredPosts.length > 0 && (
              <div className="rounded-3xl p-8 mb-8 text-center shadow-elevation-medium bg-brand-gradient text-base-100 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover"><defs><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="currentColor" fillOpacity="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#p)" /></svg>
                </div>
                <div className="relative z-10 w-full max-w-2xl">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-base-100">Get Exam Tips in your Inbox</h3>
                  <p className="text-primary-content/90 mb-8 text-lg">Join 10,000+ students receiving weekly study hacks, formula sheets, and strategy breakdowns.</p>
                  <form className="join w-full justify-center shadow-xl rounded-full" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Enter your email address..." className="input input-bordered join-item w-full max-w-sm text-base-100 border-none focus:outline-none focus:ring-2 focus:ring-base-100" required />
                    <button className="btn btn-neutral join-item border-none">Subscribe</button>
                  </form>
                </div>
              </div>
            )}

            {/* Empty State Fallback */}
            {filteredPosts.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-xl text-base-100/60">No posts found for this category yet. Check back soon!</p>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
};

export default Blog;