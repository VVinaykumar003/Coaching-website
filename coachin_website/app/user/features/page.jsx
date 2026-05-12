"use client"

import React from 'react';
import  Link  from 'next/link';

const featuresData = [
  {
    title: "Smart Classrooms",
    description: "AC classrooms with smart board enabled learning, supporting concept-based teaching with diagrams, illustrations, and structured notes.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
    )
  },
  {
    title: "Digital Learning App",
    description: "Access to study materials and updates through our coaching app. Regular sharing of assignments, test papers, and solutions in digital format.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
    )
  },
  {
    title: "Library",
    description: "A dedicated on-site library providing a quiet environment and comprehensive resources for focused study.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
    )
  },
  {
    title: "Events & Workshops",
    description: "Regularly conducted workshops, seminars, and guest lectures to broaden knowledge and enhance problem-solving skills.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-info"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    )
  }
];

const Features = () => {
  return (
    <main className="min-h-screen pb-12 font-sans">
      {/* Hero Section with subtle gradient background */}
      <div className="relative pt-12 pb-10 lg:pt-16 lg:pb-12 overflow-hidden border-b border-base-200 bg-linear-to-b from-primary/5 to-transparent">
        {/* Background "Blob" decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-base-100 mb-4 tracking-tight">
            Why Choose <span className="text-brand-gradient">Eunoia Education?</span>
          </h1>
          <p className="text-lg md:text-xl text-base-100/70 max-w-3xl mx-auto mb-6">
            Discover the proven methodology that blends the accessibility of free YouTube lessons with the structure of premium coaching.
          </p>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="card bg-brand-gradient   shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-base-300">
              <div className="card-body p-8 ">
                <div className='flex items-center justify-start gap-3'>

                <div className="w-14 h-14 rounded-2xl bg-base-content shadow-sm flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="card-title text-xl font-bold mb-2 text-base-content">{feature.title}</h3>
                </div>

                <p className=" leading-relaxed  text-pretty text-white">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Process Section */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Admission Process</h2>
        <p className="text-lg text-base-100/70 max-w-2xl mx-auto mb-8">
          We follow a simple and transparent admission process to ensure every student finds the right fit.
        </p>
        <div className="overflow-x-auto pb-4 custom-scrollbar flex justify-center w-full">
          <ul className="steps steps-vertical lg:steps-horizontal w-full lg:min-w-[800px] max-w-5xl mx-auto">
            <li className="step step-primary font-bold" data-content="1">
              <div className="text-left lg:text-center ml-2 lg:ml-0 lg:mt-2">
                <div className="text-base-100">Inquiry</div>
                <div className="text-xs font-normal text-base-100/60 mt-1 whitespace-normal max-w-[200px] lg:max-w-[150px] lg:mx-auto">Call, WhatsApp, or visit the institute</div>
              </div>
            </li>
            <li className="step step-primary font-bold" data-content="2">
              <div className="text-left lg:text-center ml-2 lg:ml-0 lg:mt-2">
                <div className="text-base-100">Counseling</div>
                <div className="text-xs font-normal text-base-100/60 mt-1 whitespace-normal max-w-[200px] lg:max-w-[150px] lg:mx-auto">Understand student’s current level and goals</div>
              </div>
            </li>
            <li className="step step-primary font-bold" data-content="3">
              <div className="text-left lg:text-center ml-2 lg:ml-0 lg:mt-2">
                <div className="text-base-100">Recommendation</div>
                <div className="text-xs font-normal text-base-100/60 mt-1 whitespace-normal max-w-[200px] lg:max-w-[150px] lg:mx-auto">Batch allocation based on preparation level</div>
              </div>
            </li>
            <li className="step step-primary font-bold" data-content="4">
              <div className="text-left lg:text-center ml-2 lg:ml-0 lg:mt-2">
                <div className="text-base-100">Registration</div>
                <div className="text-xs font-normal text-base-100/60 mt-1 whitespace-normal max-w-[200px] lg:max-w-[150px] lg:mx-auto">Registration and fee submission</div>
              </div>
            </li>
            <li className="step step-primary font-bold" data-content="5">
              <div className="text-left lg:text-center ml-2 lg:ml-0 lg:mt-2">
                <div className="text-base-100">Orientation</div>
                <div className="text-xs font-normal text-base-100/60 mt-1 whitespace-normal max-w-[200px] lg:max-w-[150px] lg:mx-auto">Orientation and class commencement</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-linear-to-r from-base-content to-base-content/90 rounded-3xl p-6 sm:p-8 md:p-10 text-center shadow-md border border-base-200 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-base-100/70 max-w-2xl mb-8">
            Join thousands of students who are achieving their dreams with our structured approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Link href="/courses" className="btn bg-brand-gradient  btn-lg shadow-lg hover:scale-105 transition-transform px-8">
              Explore Courses
            </Link>
            <a href=" https://youtube.com/@theeunoiaeducation?si=ww24QGtiUsl4pt5_" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg text-emerald-50 bg-red-500 hover:scale-105 transition-transform px-8">
              Visit YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Features;