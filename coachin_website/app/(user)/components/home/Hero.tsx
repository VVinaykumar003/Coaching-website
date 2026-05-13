"use client"
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides = [
    { desktop: '/banner/banner_1.png', mobile: '/mobile/mobile_1.png' },
    { desktop: '/banner/banner_2.png', mobile: '/mobile/mobile_2.png' },
  ];

 

  const scrollPrev = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      if (scrollLeft <= 0) {
        carouselRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
      }
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      // Check if we are near the end of the scrollable area
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
      }
    }
  };

   // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      scrollNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full group">
      {/* Carousel Container */}
      <div ref={carouselRef} className="carousel w-full scroll-smooth">
        {slides.map((slide, index) => (
          <div key={index} className="carousel-item relative w-full">
            <picture className="w-full flex">
              <source media="(max-width: 768px)" srcSet={slide.mobile} />
              <img src={slide.desktop} className="w-full object-cover" alt={`Slide ${index + 1}`} />
            </picture>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={scrollPrev} className="btn btn-circle pointer-events-auto shadow-md">❮</button>
        <button onClick={scrollNext} className="btn btn-circle pointer-events-auto shadow-md">❯</button>
      </div>
    </div>
  );
};

export default Hero;
