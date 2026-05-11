"use client"
import React from 'react'
import { useState, useEffect } from 'react';
// import { courseAPI } from '../../api/api';
import { Star, StarHalf } from 'lucide-react';

const NewCardSection = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetch('/api/course/get-all').then(res => res.json()); 
        console.log("Fetched courses from backend:", data);
        setCourses(Array.isArray(data) ? data : data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
  
    <div className="container mx-auto px-4 max-w-7xl font-sans">
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 bg-gradient-to-r from-[#1A237E] to-[#121a71] rounded-3xl p-6 lg:p-8 items-center shadow-xl">
        {/* Left Side Content */}
        <div className="lg:col-span-1 text-white flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-4">
          <h3 className="text-2xl text-white font-extrabold mb-4 leading-tight">Our Courses</h3>
          <p className="text-lg opacity-90 mb-6">
            Structured programs designed for deep conceptual clarity and competitive exam success.
          </p>
          <a href="/courses" className="btn btn-warning shadow-lg hover:scale-105 transition-transform w-full sm:w-auto">
            Explore All
          </a>
        </div>

        {/* Right Side Cards */}
        <div className="lg:col-span-3">
          <div className="flex flex-wrap justify-center gap-6">
            {loading && <div className="w-full py-12 flex justify-center col-span-full"><span className="loading loading-spinner loading-lg text-primary"></span></div>}
            
            {courses.slice(0, 3).map((course) => {
              // Calculate full, half, and empty stars for the rating
              const rating = Number(course.rating || 4.8);
              const fullStars = Math.floor(rating);
              const hasHalfStar = rating % 1 !== 0;
              const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
              const courseId = course._id || course.id;

              return (
                <div key={courseId} onClick={() => setActiveCard(activeCard === courseId ? null : courseId)} className="w-[280px] flex flex-col bg-base-content rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 font-sans cursor-pointer group relative">
                  
                  {/* Image: Top-aligned, 16:9 aspect ratio */}
                  <div className="w-full aspect-video border border-base-200 rounded-t-md overflow-hidden bg-base-200/50">
                    <img 
                      src={course.thumbnail || course.image || 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop'} 
                      alt={course.courseName || course.title} 
                      className="w-full h-full object-cover"
                       loading='lazy'
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-3 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="font-bold text-base-100 text-[15px] leading-tight line-clamp-2">
                      {course.courseName || course.title}
                    </h3>
                    
                    {/* Instructor */}
                    <p className="text-xs text-base-100/70 mt-1.5 truncate">
                      {course.instructor || "Kunal Sir"}
                    </p>
                    
                    {/* Star Rating Row */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="font-bold text-sm text-amber-700">{rating.toFixed(1)}</span>
                      <div className="flex items-center">
                        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                        {hasHalfStar && <StarHalf className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />}
                        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-amber-500" />)}
                      </div>
                      <span className="text-xs text-base-100/60">({course.reviews || "321,456"})</span>
                    </div>
                    
                    {/* Price & Action */}
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="font-extrabold text-base-100 text-lg">
                        {course.price || "₹4,999"}
                      </div>
                      <a 
                        href={course.redirectLink || course.externalLink || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm px-3 py-1.5 bg-primary/10 text-primary rounded-md font-bold hover:bg-primary hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Enroll Now
                      </a>
                    </div>
                  </div>

                  {/* Full Card Hover Overlay */}
                  <div className={`absolute inset-0 bg-white/98 backdrop-blur-sm border border-slate-200 rounded-md p-5 z-50 flex flex-col transition-all duration-300 overflow-y-auto custom-scrollbar ${activeCard === courseId ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto'}`}>
                    <div className="flex justify-between items-start mb-1.5 shrink-0 gap-2">
                      <h4 className="text-lg font-bold text-slate-900 leading-tight">
                        {course.courseName || course.title}
                      </h4>
                      <button 
                        className="btn btn-xs btn-circle btn-ghost lg:hidden shrink-0 mt-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCard(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 font-medium shrink-0">
                      Updated {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'Recent'} • {course.category || 'All Levels'}
                    </p>
                    <p className="text-sm text-slate-700 mb-3 line-clamp-3 shrink-0">
                      {course.description || "Master the concepts with this comprehensive course. Includes live sessions, weekly reports, and doubt solving."}
                    </p>
                    <ul className="space-y-1.5 text-sm text-slate-600 font-medium mb-4 flex-grow">
                      <li className="flex items-start gap-2">
                        <span className="shrink-0 text-primary">✓</span>
                        <span>Live hybrid classes & recordings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="shrink-0 text-primary">✓</span>
                        <span>Weekly WhatsApp progress reports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="shrink-0 text-primary">✓</span>
                        <span>Personal mentorship</span>
                      </li>
                    </ul>
                    <a href={course.redirectLink || course.externalLink || '#'} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="btn border-none bg-brand-gradient text-white w-full shadow-brand-glow hover:shadow-[0_0_20px_rgba(0,188,212,0.7)] min-h-[40px] h-[40px] shrink-0 mt-auto">
                      Enroll Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default NewCardSection
