"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
// import { testimonialAPI } from '../../api/api';

const defaultTestimonials = [
  {
    _id: "t1",
    name: "Rahul Sharma",
    rank: "JEE Advanced AIR 842",
    city: "Raipur",
    rating: 5,
    center: "Eunoia Education Raipur",
    school: "DPS Raipur",
    message: "Kunal Sir's concept-driven approach completely changed how I viewed Physics. The hybrid classes were a lifesaver!",
    image: "https://i.pravatar.cc/150?img=11",
    videoId: "dQw4w9WgXcQ"
  },
  {
    _id: "t2",
    name: "Priya Singh",
    rank: "NEET Score 680/720",
    city: "Bhilai",
    school: "KPS Bhilai",
    rating: 5,
    center: "Eunoia Education Raipur",
    message: "The daily doubt-solving and personal mentorship kept me on track.",
    image: "https://i.pravatar.cc/150?img=5",
    videoId: "LXb3EKWsInQ"
  },
  {
    _id: "t3",
    name: "Amit Patel",
    rank: "JEE Mains 99.8 %ile",
    city: "Raipur",
    school: "Holy Cross",
    rating: 5,
    center: "Eunoia Education Raipur",
    message: "The testing system and performance analytics showed me exactly where I needed to improve.",
    image: "https://i.pravatar.cc/150?img=15",
    videoId: null
  },
  {
    _id: "t4",
    name: "Sneha Reddy",
    rank: "Class 12th Board 96%",
    city: "Bilaspur",
    school: "Brilliant Public School",
    rating: 4,
    center: "Eunoia Education Raipur",
    message: "A very disciplined and structured environment. The focus on fundamentals helped me ace my boards.",
    image: "https://i.pravatar.cc/150?img=9",
    videoId: null
  }
];

const GeoTestimonials = () => {
  const [userCity, setUserCity] = useState('');
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const initData = async () => {
      try {
        // 1. Fetch Testimonials from Backend
        const data = await fetch('/api/testimonial/get-all').then(res => res.json());
        
        console.log("Fetched testimonials from backend:", data);
        const fetchedTestimonials = Array.isArray(data) ? data : data.testimonials || [];
        
        // Fallback to default testimonials if the backend returns an empty array
        setAllTestimonials(fetchedTestimonials.length > 0 ? fetchedTestimonials : defaultTestimonials);
      } catch(err) {
        console.error("Failed to load testimonials:", err);
        setAllTestimonials(defaultTestimonials); // Fallback on error
      }

      try {
        // 2. Detect User Location based on IP
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.city) {
          setUserCity(data.city);
        }
      } catch (error) {
        console.warn("Location detection failed, falling back to default.");
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  // 3. Sort Testimonials logically (Locals first)
  const displayedTestimonials = useMemo(() => {
    if (!userCity) return allTestimonials;

    return [...allTestimonials].sort((a, b) => {
      const aIsLocal = a.city && a.city.toLowerCase() === userCity.toLowerCase();
      const bIsLocal = b.city && b.city.toLowerCase() === userCity.toLowerCase();
      
      if (aIsLocal && !bIsLocal) return -1;
      if (!aIsLocal && bIsLocal) return 1;
      return 0;
    });
  }, [allTestimonials, userCity]);

  return (
    <div className="container mx-auto px-4 max-w-7xl py-4 md:py-6 font-sans">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-base-100 mb-4">
          Our Success Stories 
          {/* <span className="text-brand-gradient">{userCity ? `in ${userCity}` : 'Nationwide'}</span> */}
        </h2>
        <p className="text-lg text-base-100/70">
          Join hundreds of students from your area who have cracked the toughest exams with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading && <div className="col-span-full py-6 text-center"><span className="loading loading-dots loading-lg text-primary"></span></div>}
        
        {displayedTestimonials.map((topper, index) => {
          const isLocal = userCity && topper.city && topper.city.toLowerCase() === userCity.toLowerCase();
          const cardId = topper._id || index;
          
          return (
            <div key={cardId} onClick={() => setActiveCard(activeCard === cardId ? null : cardId)} className={`group relative cursor-pointer bg-base-content rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-72 border border-base-200 flex flex-col ${isLocal ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
              
              {/* Background Image & Default State */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={topper.videoId ? `https://img.youtube.com/vi/${topper.videoId}/hqdefault.jpg` : (topper.image || "/images/real-classroom-kunal.jpg")} 
                  alt={topper.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>

              {/* Video Play Icon Overlay (if video exists) */}
              {topper.videoId && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              )}

              {isLocal && (
                <div className="absolute top-4 right-4 badge badge-primary border-none shadow-md z-10 animate-fade-in-up">Local Topper</div>
              )}

              {/* Bottom Info (Always visible, but pushed down slightly on hover for effect) */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end z-10 transform group-hover:translate-y-full transition-transform duration-300">
                <h3 className="text-xl font-bold text-white leading-tight">{topper.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm font-bold text-primary bg-white/90 backdrop-blur-sm w-fit px-2.5 py-0.5 rounded-md shadow-sm">{topper.rank || "Eunoia Student"}</div>
                  <div className="flex gap-1 text-warning bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${i < (topper.rating || 5) ? 'fill-current' : 'text-gray-400'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Overlay Details */}
              <div className={`absolute inset-0 bg-base-content/98 backdrop-blur-md p-6 flex flex-col transition-transform duration-300 z-20 overflow-y-auto custom-scrollbar ${activeCard === cardId ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-lg font-bold text-base-content leading-tight">{topper.name}</h3>
                  <button 
                    className="btn btn-xs btn-circle btn-ghost lg:hidden shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCard(null);
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div className="text-xs font-bold text-primary mb-2">{topper.school || "Local High School"} • {topper.city}</div>
                
                <div className="flex gap-1 mb-3 text-warning">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${i < (topper.rating || 5) ? 'fill-current' : 'text-base-300'}`} viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                   ))}
                </div>

                <p className="text-sm text-base-content/80 italic mb-4 flex-grow line-clamp-4">"{topper.message || topper.quote}"</p>

                {topper.videoId ? (
                   <a href={`https://www.youtube.com/watch?v=${topper.videoId}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="btn border-none bg-red-600 text-white hover:bg-red-700 w-full mt-auto shadow-sm flex items-center justify-center gap-2 min-h-[48px]">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                     Watch Testimonial
                   </a>
                ) : (
                  <div className="text-xs text-base-content/70 font-medium mt-auto flex items-center justify-center gap-1.5 bg-base-200/50 p-2.5 rounded-lg border border-base-content min-h-[48px] border-dashed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary shrink-0"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                    <span className="truncate">{topper.center || "Eunoia Education Raipur"}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeoTestimonials;
