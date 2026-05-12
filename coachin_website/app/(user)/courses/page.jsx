"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { courseAPI } from '../api/api';
import { Star, StarHalf, Search } from 'lucide-react';

const CoursesContent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Keep category in sync if URL changes externally (like from global Header)
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setActiveCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      router.push('/courses');
    } else {
      router.push(`/courses?category=${cat}`);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await fetch('/api/course/get-all').then(res => res.json());
      console.log(data)
      setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const categories = ['All', 'Physics', 'Chemistry', 'Mathematics'];

  // Filter courses by category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || (course.category && course.category.toLowerCase().includes(activeCategory.toLowerCase()));
    const matchesSearch = (course.courseName || course.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-white min-h-screen font-sans text-slate-800">
      {/* Secondary Navigation / Search Bar */}
      <div className="border-b border-slate-200 bg-white shadow-sm z-30 relative">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories Nav */}
          <nav className="flex items-center gap-2 overflow-x-auto w-full md:w-auto custom-scrollbar pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 flex items-center">
            <input 
              type="text" 
              placeholder="Search for courses..." 
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors text-sm bg-slate-50 focus:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3.5 text-slate-400 w-4 h-4" />
          </div>

        </div>
      </div>

      {/* Welcome Back Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-12 md:py-16 relative overflow-hidden">
        {/* Abstract shapes for background elegance */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Welcome Back, Future Topper!
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Pick up where you left off and master the concepts. Explore our expertly crafted {activeCategory !== 'All' ? <strong className="text-white">{activeCategory}</strong> : 'Science & Math'} courses.
          </p>
        </div>
      </div>

      {/* Recommended Courses Grid */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
          {activeCategory === 'All' ? 'Recommended for You' : `Top ${activeCategory} Courses`}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <span className="loading loading-spinner loading-lg text-slate-800"></span>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => {
              const rating = Number(course.rating || 4.8);
              const fullStars = Math.floor(rating);
              const hasHalfStar = rating % 1 !== 0;
              const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
              
              return (
                <div key={course._id || course.id} className="flex flex-col bg-white border border-slate-200 rounded-[16px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  {/* Thumbnail */}
                  <div className="w-full aspect-video overflow-hidden bg-slate-100 relative border-b border-slate-100">
                    <img 
                      src={course.thumbnail || course.image || 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop'} 
                      alt={course.courseName || course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                       loading='lazy'
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm border border-slate-200/50">
                      {course.category || "General"}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <h3 className="font-extrabold text-slate-900 text-base md:text-lg leading-snug line-clamp-2 mb-1.5 group-hover:text-indigo-600 transition-colors">
                      {course.courseName || course.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2 truncate">
                      {course.instructor || "Kunal Sir"}
                    </p>
                    
                    {/* Ratings */}
                    <div className="flex items-center gap-1 mb-4">
                      <span className="font-bold text-sm text-amber-700 mr-1">{rating.toFixed(1)}</span>
                      <div className="flex items-center">
                        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                        {hasHalfStar && <StarHalf className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />}
                        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-slate-300" />)}
                      </div>
                      <span className="text-xs text-slate-400 ml-1">({course.reviews || "1,234"})</span>
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="font-black text-slate-900 text-xl">
                        {course.price || "₹4,999"}
                      </div>
                      <a 
                        href={course.redirectLink || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm border border-indigo-400 p-1 rounded-md font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        Explore Course
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-xl text-slate-500 font-medium">No courses found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); handleCategoryChange('All'); }}
              className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

const Courses = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20 min-h-screen w-full"><span className="loading loading-spinner loading-lg text-slate-800"></span></div>}>
      <CoursesContent />
    </Suspense>
  );
};

export default Courses;