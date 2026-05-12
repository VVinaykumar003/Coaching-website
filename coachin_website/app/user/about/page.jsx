"use client"
import React from 'react';

const About = () => {
  return (
    <main className="py-8 pb-12 font-sans">
      <div className="container mx-auto px-4">
        
        {/* Hero / Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-base-100 mb-4">About Eunoia Education</h1>
          <p className="text-xl text-primary font-bold italic mb-6">&apos;Where Concepts Become Confidence.&apos;</p>
          <p className="text-lg text-base-100/80 max-w-4xl mx-auto leading-relaxed mb-6">
            At Eunoia Education, we are driven by a single purpose—transforming the way students experience learning. With over <strong className="text-base-100">7 years of teaching excellence</strong>, we specialize in Physics and Chemistry for Classes 11–12, JEE, and NEET. What sets us apart is our ability to break down complex concepts into simple, intuitive ideas, making even the most challenging topics engaging and easy to understand.
          </p>
          <p className="text-lg text-base-100/80 max-w-4xl mx-auto leading-relaxed">
            We believe that true education goes beyond syllabus completion. Our approach focuses on deep conceptual clarity, structured practice, and continuous mentorship. At Eunoia Education, quality is non-negotiable. From carefully designed lectures to regular testing and performance tracking, our mission is simple: to build strong thinkers, problem-solvers, and achievers who are fully prepared to excel in competitive exams and beyond.
          </p>
        </div>

        {/* Our Journey / History */}
        <div className="max-w-4xl mx-auto text-center mb-10 bg-base-content/50 p-6 md:p-8 rounded-3xl border border-gray-300 shadow-md shadow-stone-400">
          <h2 className="text-3xl font-bold mb-6 text-base-100">Our Journey</h2>
          <p className="text-lg text-base-100/80 leading-relaxed">
            Eunoia Education began 7 years ago with a mission to simplify Physics and Chemistry for students. What started as small, focused batches has evolved into a structured coaching platform built on concept clarity, personal attention, and consistent results in JEE and NEET preparation.
          </p>
        </div>

        {/* Vision, Mission & Values Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          
          {/* Left Column: Vision & Core Values Stack */}
          <div className="flex flex-col gap-6 md:col-span-1">
            {/* Vision Box */}
            <div className="bg-primary/10 p-6 rounded-3xl shadow-sm hover:-translate-y-1 transition-transform duration-300 flex-1">
            <div className='flex items-center gap-4 justify-start mb-4'>

              <div className="w-14 h-14 bg-primary text-primary-content rounded-2xl flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-base-100">Our Vision</h2>
            </div>
              <p className="text-base lg:text-lg text-base-100/80 leading-normal">
                To redefine science education by making concept-based learning the standard, and to become a trusted name for students striving for excellence.
              </p>
            </div>

            {/* Core Values Box */}
            <div className="bg-accent/10 p-6 rounded-3xl border border-accent/20 shadow-sm hover:-translate-y-1 transition-transform duration-300 flex-1">
            <div className='flex items-center gap-4 justify-start mb-4'>

              <div className="w-14 h-14 bg-accent text-accent-content rounded-2xl flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-base-100">Core Values</h2>
            </div>
              <p className="text-base lg:text-lg text-base-100/80 leading-normal">
                Integrity, Discipline, and Excellence. We believe in building a strong foundation of knowledge that empowers students for a lifetime.
              </p>
            </div>
          </div>

          {/* Right Column: Mission Box */}
          <div className="bg-secondary/10 p-4 lg:py-6 lg:px-10 rounded-3xl border border-secondary/20 shadow-sm hover:-translate-y-1 transition-transform duration-300 md:col-span-2 flex flex-col justify-center">
          <div className='flex items-center gap-4 justify-start mb-4'>

            <div className="w-14 h-14 bg-secondary text-secondary-content rounded-2xl flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-base-100">Our Mission</h2>
          </div>
            <p className="text-lg text-base-100/80 leading-normal mb-4">
              To deliver high-quality, concept-driven education through structured teaching, personal mentorship, and continuous performance tracking.
            </p>
            <ul className="list-none space-y-4 md:space-y-8 mt-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-base-100/80 text-lg leading-snug">Simplifying complex concepts in Physics and Chemistry.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-base-100/80 text-lg leading-snug">Conducting regular tests with detailed analysis and feedback.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-base-100/80 text-lg leading-snug">Providing personal attention and continuous doubt-solving.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-base-100/80 text-lg leading-snug">Building discipline, consistency, and problem-solving ability.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Two-Column Layout for Founder & Message */}
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center mb-12 bg-base-content/10 p-8 md:p-10 rounded-3xl shadow-sm border border-base-200 max-w-5xl mx-auto">
          <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <div className="avatar mb-6">
              <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg">
                <img src="/kunal.png" alt="Kunal Madaria"
                 loading='lazy'
                />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-base-100">Kunal Madaria</h3>
            <p className="text-primary font-bold text-sm uppercase tracking-wider mt-2">Founder & Lead Faculty</p>
            <p className="text-base-100/60 text-sm mt-1">Physics & Chemistry</p>
          </div>
          
          <div className="w-full md:w-2/3 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold mb-6 text-base-100">Director&apos;s Message</h2>
            <div className="prose prose-lg text-base-100/80 text-left">
              <blockquote className="border-l-4 border-primary pl-6 italic font-medium text-xl mb-6">
                &apos;Having taught students across multiple batches over the past 7 years, my focus has always been on delivering personalized mentorship and measurable improvement in every student’s performance.&apos;
              </blockquote>
              <p className="leading-relaxed mb-6">
                With over 7 years of teaching experience, I lead Eunoia Education with a hands-on, student-first approach. Specializing in Physics and Chemistry for Classes 11–12, JEE, and NEET, I strive to simplify complex concepts and make learning engaging and effective.
              </p>
              <p className="leading-relaxed mb-8">
                As the sole faculty, I am personally involved in every aspect of a student’s journey—from teaching and doubt-solving to test analysis and performance tracking. This ensures consistent quality, individual attention, and a deep understanding of each student’s progress.
              </p>
              <p className="text-2xl font-bold text-primary leading-relaxed">
                &apos;Here, every student is mentored directly—not managed.&apos;
              </p>
            </div>
          </div>
        </div>

        {/* Teaching Methodology Section */}
        <div className="mt-12 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-100">Teaching Methodology</h2>
          <p className="text-lg text-base-100/70 max-w-2xl mx-auto">
            At Eunoia Education, our teaching approach is designed to ensure deep understanding, consistent practice, and measurable improvement.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Method 1 */}
          <div className="bg-brand-gradient p-6 md:p-8 rounded-3xl shadow-md border border-base-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-base-content mb-3">Concept-Focused Live Classes</h3>
            <p className="text-base-100/80 leading-relaxed flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 shrink-0 bg-base-content rounded-full"></span>
              <span className='text-white'>Interactive classroom sessions where complex topics in Physics and Chemistry are simplified step-by-step for clear understanding.</span>
            </p>
          </div>

          {/* Method 2 */}
          <div className="bg-brand-gradient p-6 md:p-8 rounded-3xl shadow-md border border-base-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-base-content mb-3">Structured Learning Plan</h3>
            <p className="text-base-100/80 leading-relaxed flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 shrink-0 bg-base-content rounded-full"></span>
              <span className='text-white' >Syllabus is covered in a planned manner with proper sequencing, revision slots, and exam-oriented focus.</span>
            </p>
          </div>

          {/* Method 3 */}
          <div className="bg-brand-gradient p-6 md:p-8 rounded-3xl shadow-md border border-base-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-base-content mb-3">Regular Tests & Analysis</h3>
            <p className="text-base-100/80 leading-relaxed flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 shrink-0 bg-base-content rounded-full"></span>
              <span className='text-white' >Weekly tests followed by detailed discussion and analysis to identify strengths and areas of improvement.</span>
            </p>
          </div>

          {/* Method 4 */}
          <div className="bg-brand-gradient p-6 md:p-8 rounded-3xl shadow-md border border-base-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-base-content mb-3">Continuous Doubt Support</h3>
            <p className="text-base-100/80 leading-relaxed flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 shrink-0 bg-base-content rounded-full"></span>
              <span className='text-white' >Dedicated doubt-solving sessions and one-on-one support to ensure no student is left behind.</span>
            </p>
          </div>

          {/* Method 5 */}
          <div className="bg-brand-gradient p-6 md:p-8 rounded-3xl shadow-md border border-base-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-base-content mb-3">Practice & Revision System</h3>
            <p className="text-base-100/80 leading-relaxed flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 shrink-0 bg-base-content rounded-full"></span>
              <span className='text-white' >Assignments, numerical practice, and periodic revision to strengthen retention and problem-solving speed.</span>
            </p>
          </div>

          {/* Method 6 */}
          <div className="bg-brand-gradient p-6 md:p-8 rounded-3xl shadow-md border border-base-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-base-content mb-3">Comprehensive Study Material</h3>
            <p className="text-base-100/80 leading-relaxed flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 shrink-0 bg-base-content rounded-full"></span>
              <span className='text-white' >Well-researched, exam-oriented study materials including notes, formula sheets, and question banks.</span>
            </p>
          </div>
        </div>

        {/* Code of Conduct Section */}
        <div className="mt-12 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-100">Rules & Code of Conduct</h2>
          <p className="text-lg text-base-100/70 max-w-2xl mx-auto">
            To maintain a focused and disciplined learning environment, all students are expected to follow these rules:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-brand-gradient p-6 rounded-2xl shadow-sm border border-base-200 border-l-4 border-l-error hover:-translate-y-1 transition-transform duration-300">
             <h3 className="font-bold text-lg mb-2 text-base-content">Regular Attendance</h3>
             <p className="text-sm text-white">Students must attend classes consistently and be punctually on time.</p>
          </div>
          <div className="bg-brand-gradient p-6 rounded-2xl shadow-sm border border-base-200 border-l-4 border-l-warning hover:-translate-y-1 transition-transform duration-300">
             <h3 className="font-bold text-lg mb-2 text-base-content">Discipline in Class</h3>
             <p className="text-sm text-white">Maintain a serious and distraction-free environment during lectures.</p>
          </div>
          <div className="bg-brand-gradient p-6 rounded-2xl shadow-sm border border-base-200 border-l-4 border-l-success hover:-translate-y-1 transition-transform duration-300">
             <h3 className="font-bold text-lg mb-2 text-base-content">Timely Completion</h3>
             <p className="text-sm text-white">Assignments and tests must be completed on time to track progress effectively.</p>
          </div>
          <div className="bg-brand-gradient p-6 rounded-2xl shadow-sm border border-base-200 border-l-4 border-l-info hover:-translate-y-1 transition-transform duration-300">
             <h3 className="font-bold text-lg mb-2 text-base-content">Respectful Behavior</h3>
             <p className="text-sm text-white">Students should maintain respect towards faculty and fellow students at all times.</p>
          </div>
          <div className="bg-brand-gradient p-6 rounded-2xl shadow-sm border border-base-200 border-l-4 border-l-primary hover:-translate-y-1 transition-transform duration-300">
             <h3 className="font-bold text-lg mb-2 text-base-content">Limited Mobile Use</h3>
             <p className="text-sm text-white">Mobile usage is strictly restricted during class hours unless required for academic purposes.</p>
          </div>
          <div className="bg-brand-gradient p-6 rounded-2xl shadow-sm border border-base-200 border-l-4 border-l-secondary hover:-translate-y-1 transition-transform duration-300">
             <h3 className="font-bold text-lg mb-2 text-base-content">Commitment to Improvement</h3>
             <p className="text-sm text-white">Students are expected to actively participate and put in consistent effort.</p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default About;