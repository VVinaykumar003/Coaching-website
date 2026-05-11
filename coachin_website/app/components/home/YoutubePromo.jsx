"use clietn"

import React from 'react';

const YouTubePromo = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-base-content rounded-3xl">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-base-100 mb-4">Level Up with Eunoia Education</h2>
        <p className="text-lg text-base-100/70">
          Join our growing community. Get access to weekly tutorials, career tips, and live Q&A sessions.
        </p>
      </div>

      {/* Subscriber Milestone & Stats Component */}
      <div className="flex justify-center mb-12">
        <div className="stats shadow stats-vertical lg:stats-horizontal w-full max-w-3xl">
          <div className="stat place-items-center ">
            <div className="stat-title">Subscribers</div>
            <div className="stat-value text-error">50K+</div>
            <div className="stat-desc">Growing every day</div>
          </div>
          
          <div className="stat place-items-center">
            <div className="stat-title">Total Views</div>
            <div className="stat-value">2.5M</div>
            <div className="stat-desc">Across all tutorials</div>
          </div>
          
          <div className="stat place-items-center">
            <div className="stat-title">New Content</div>
            <div className="stat-value text-primary">Weekly</div>
            <div className="stat-desc">Fresh projects & tips</div>
          </div>
        </div>
      </div>

      {/* Video Wall (Embedded YouTube Videos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {[
          { id: 1, title: "Electric Charges and Fields - Lecture 1: Part 1", src: "https://www.youtube.com/embed/tKLi78LhgwU" },
          { id: 2, title: "Electric Charges and Fields - Lecture 1: Part 2", src: "https://www.youtube.com/embed/gnIWuA-qTxs" },
          { id: 3, title: "Basic Maths: Differentiation Part 1", src: "https://www.youtube.com/embed/Qca3DeVJRdU" },
          // { id: 4, title: "How to Crack JEE/NEET in 1 Year", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" } // Placeholder, please replace
        ].map((video) => (
          <div key={video.id} className="card bg-base-content shadow-xl overflow-hidden shadow-mist-600">
            <div className="aspect-video w-full bg-black">
              <iframe className="w-full h-full" src={video.src} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className="card-body p-4 text-center">
              <h3 className="card-title text-lg justify-center">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <a href="https://www.youtube.com/@TheEunoiaEducation" target="_blank" rel="noopener noreferrer" className="btn bg-[#ff0000] text-white btn-wide shadow-lg hover:scale-105 transition-transform">
          Subscribe to Channel
        </a>
      </div>
    </div>
  );
}

export default YouTubePromo;