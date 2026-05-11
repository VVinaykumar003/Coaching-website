"use client"
import React from 'react'
import UdemyCourseCard from './UdemyCourseCard';



const Cards = () => {


  return (
    <div className=" pb-4 md:pt-2 md:pb-4 w-full font-sans border-b border-[#E0E7FF] relative overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Main Content Wrapper */}
        <div className="bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(30,27,75,0.05)] border border-white rounded-3xl p-6 md:p-12 overflow-hidden">
          <div className="text-center mb-8 shadow-level-1 pb-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-[#1E1B4B]">Master Your Subjects</h2>
            <p className="text-lg text-base-100/70">Pick the path that aligns with your goals and start building a strong foundation today.</p>
          </div>
          
          {/* Founder's Message & Transparency Timeline */}
          <div className="mb-12 flex flex-col lg:flex-row gap-10 items-center justify-center max-w-5xl mx-auto">
            <div className="w-full lg:w-5/12 flex flex-col items-center text-center">
              <div className="avatar mb-6">
                <div className="w-56 h-56 rounded-full p-[3px] bg-brand-gradient shadow-lg">
                  <img src="/kunal.png" alt="Kunal Sir" className="rounded-full w-full h-full object-cover border-4 border-white bg-white" 
                   loading='lazy'
                  />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1E1B4B]">Kunal Sir</h3>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mt-2">Founder & Lead Instructor</p>
            </div>
            
            <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-5 italic tracking-[-0.01em] leading-[1.4] text-[#1E1B4B]">
                "Crack JEE & NEET with Raipur's Most Transparent Hybrid Coaching. Join Kunal Sir's Next Batch."
              </h3>
              <p className="text-base text-base-100/80 leading-relaxed max-w-lg">
                At Eunoia Education, we believe in a <strong>"No Hiding" philosophy</strong>. Education is a transparent partnership between the student, parents, and teacher.
              </p>
              
              {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E0E7FF] hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#E0E7FF] group-hover:bg-brand-gradient transition-colors duration-300"></div>
                  <div className="w-10 h-10 rounded-full bg-[#E0F7FA] text-[#1A237E] flex items-center justify-center mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <h4 className="font-extrabold text-[#1E1B4B] mb-2 text-lg">Day 1-5</h4>
                  <p className="text-sm text-base-100/80 leading-relaxed">Physical Classes + <strong>Hybrid Guarantee</strong> (Join live stream instantly if unwell).</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E0E7FF] hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#E0E7FF] group-hover:bg-brand-gradient transition-colors duration-300"></div>
                  <div className="w-10 h-10 rounded-full bg-[#E0F7FA] text-[#1A237E] flex items-center justify-center mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <h4 className="font-extrabold text-[#1E1B4B] mb-2 text-lg">Day 6</h4>
                  <p className="text-sm text-base-100/80 leading-relaxed">Daily verbal check-ins & personalized doubt solving with Kunal Sir.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E0E7FF] hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#E0E7FF] group-hover:bg-brand-gradient transition-colors duration-300"></div>
                  <div className="w-10 h-10 rounded-full bg-[#E0F7FA] text-[#1A237E] flex items-center justify-center mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  </div>
                  <h4 className="font-extrabold text-[#1E1B4B] mb-2 text-lg">Day 7</h4>
                  <p className="text-sm text-base-100/80 leading-relaxed">Weekly performance report sent directly to parents' WhatsApp.</p>
                </div>
              </div> */}
            </div>
          </div>
          <UdemyCourseCard/>

     
    </div>
    </div>
    </div>
  )
}

export default Cards
