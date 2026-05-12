"use client"
import React from 'react';

const LeadMagnet = () => {
  return (
    <div className="container mx-auto px-4 max-w-7xl py-4 md:py-6 font-sans">
      <div className="bg-brand-gradient rounded-3xl p-6 md:p-8 text-center shadow-2xl border border-white/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover"><defs><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="currentColor" fillOpacity="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#p)" /></svg>
        </div>
        
        <div className="relative z-10 text-left md:w-1/2">
          <div className="badge badge-warning font-bold mb-4 shadow-sm">Free Resource</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Master JEE & NEET Physics</h2>
          <p className="text-white/90 text-lg mb-0">
            Not ready to enroll yet? Get our exclusive <strong>Formula Sheet & Demo Lecture PDF</strong> straight to your WhatsApp.
          </p>
        </div>

        <div className="relative z-10 md:w-1/2 w-full bg-white rounded-2xl p-6 shadow-xl">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold text-base-200">Your Name</span></label>
              <input type="text" placeholder="e.g. Rahul" className="input input-bordered input-primary
             bg-white  w-full    text-base-100 transition-colors" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold text-base-200">WhatsApp Number</span></label>
              <input type="tel" placeholder="+91 98765 43210" className="input input-bordered input-primary
              bg-white  w-full    text-base-100 transition-colors" required />
            </div>
            <button className="btn btn-primary w-full lg:text-lg shadow-md hover:-translate-y-1 transition-transform border-none bg-brand-gradient shadow-brand-glow sm:text-sm">
              Send to My WhatsApp 🚀
            </button>
            <p className="text-xs text-center text-base-100/50 mt-2 font-medium">We respect your privacy. No spam.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;