"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
// import { courseAPI } from '../../api/api';

const UdemyCourseCard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [showAll, setShowAll] = useState(false);
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

    // Determine courses to display based on 'showAll' toggle
    const visibleCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <div className="container mx-auto py-2 md:py-4 font-sans">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12 w-full">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Course Grid */}
      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleCourses.slice(0, showAll ? courses.length : 4).map ((course) => {
            const courseId = course._id || course.id;
            
            return (
            <div 
              key={courseId} 
              className="card bg-brand-gradient shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-200 group flex flex-col h-full relative overflow-hidden cursor-pointer"
              onClick={() => setActiveCard(activeCard === courseId ? null : courseId)}
            >
              {/* Image & Hover Overlay Container */}
              <figure className="relative w-full aspect-video bg-base-300 overflow-hidden">
                {/* Thumbnail with slight zoom on hover */}
                <img

                  src={course.thumbnail || course.image || 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop'} 
                  alt={course.courseName || course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3 badge badge-primary shadow-sm font-semibold border-none z-10 text-xs">
                  {course.category || "General"}
                </div>
              </figure>
              
              {/* Content Section */}
              <div className="card-body p-5 flex flex-col flex-grow bg-brand-gradient rounded-b-[inherit]">
                <h3 className="card-title text-base-100 text-[16px] md:text-[17px] font-extrabold leading-snug line-clamp-2">
                  {course.courseName || course.title}
                </h3>
                
                <div className="mt-auto pt-4 w-full">
                  <a 
                    href={course.redirectLink || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary bg-grad w-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Explore Course
                  </a>
                </div>
              </div>

              {/* Full Card Hover Overlay */}
              <div className={`absolute inset-0 z-40 bg-white/95 backdrop-blur-sm p-6 flex flex-col transition-all duration-300 overflow-y-auto custom-scrollbar ${activeCard === courseId ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <h4 className="font-bold text-sm text-primary uppercase tracking-wider">
                    Course Overview
                  </h4>
                  <button 
                    className="btn btn-sm btn-circle btn-ghost lg:hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCard(null);
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm text-base-content/80 font-medium leading-relaxed whitespace-pre-wrap flex-grow overflow-scroll "> 
                  {course.description || "Master the concepts with this comprehensive course. Enroll to elevate your skills."}
                </div>
                <div className="mt-6 shrink-0 w-full">
                  <a 
                    href={course.redirectLink || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary w-full shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Explore Course
                  </a>
                </div>
              </div>
            </div>
          )})}
        </div>
      )}

      {/* Show More / Less Toggle */}
      {!loading && courses.length > 4 && (
        <div className="flex justify-center mt-6">
          <button 
            className="btn btn-outline btn-primary px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View Less' : 'View More Courses'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UdemyCourseCard;