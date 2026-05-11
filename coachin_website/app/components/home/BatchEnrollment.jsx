"use client"

import React, { useRef } from 'react';
import  Link  from 'next/link';


// JSON Structure to manage offline batches
const batches = [
  {
    id: 1,
    name: "High Focus Dropper (JEE/NEET)",
    timing: "8:00 AM – 2:00 PM",
    startDate: "12 May, 2026",
    totalSeats: 10,
    filledSeats: 8
  },
  {
    id: 2,
    name: "Standard Batch (Class 12)",
    timing: "4:00 PM – 7:00 PM",
    startDate: "15 May, 2026",
    totalSeats: 20,
    filledSeats: 18
  },
  {
    id: 3,
    name: "Standard Batch (Class 11)",
    timing: "5:00 PM – 6:30 PM",
    startDate: "01 Jun, 2026",
    totalSeats: 20,
    filledSeats: 15
  }
];

const BatchEnrollment = () => {
  const mapModalRef = useRef(null);

  return (
    <div className="container mx-auto px-4 max-w-7xl py-4 md:py-6 font-sans border-b border-[#E2E8F0]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-base-100 mb-3">Offline Center Admissions</h2>
          <p className="text-lg text-base-100/70 max-w-2xl">
            Secure your seat in our upcoming physical batches in Raipur. We provide conceptual, brainstorming classes to develop the required temperament for JEE and NEET.
          </p>
        </div>
        <button
          className="btn bg-transparent border-[#1A237E] text-[#1A237E] hover:bg-[#1A237E] hover:border-[#1A237E] hover:text-white shadow-sm hover:shadow-md transition-all shrink-0"
          onClick={() => mapModalRef.current?.showModal()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          Locate Center
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {batches.map((batch) => {
          return (
            <div key={batch.id} className="card bg-white shadow-soft-elevation  rounded-[16px] hover:shadow-level-3 hover:-translate-y-2 transition-all duration-300 border-2 border-base-300 shadow-md">
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="card-title text-2xl font-bold leading-tight pr-2">{batch.name}</h3>
                </div>
                <div className="text-sm font-bold text-primary mb-1">
                  {batch.totalSeats <= 10 ? "High Intensity (Max 10 Seats)" : "Personalized Focus (Max 20 Seats)"}
                </div>

                <div className="space-y-3 mt-4 mb-6 text-base-100/80 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <span>{batch.timing}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>
                    <span>Starts: {batch.startDate}</span>
                  </div>
                </div>

                <div className="card-actions mt-auto pt-4">
                  <Link 
                    href="/contact" 
                    className="btn w-full transition-all duration-300 border-none bg-brand-gradient text-white shadow-brand-glow hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,188,212,0.7)]"
                  >
                    Book My Seat
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Google Maps Modal (DaisyUI Dialog) */}
      <dialog ref={mapModalRef} id="map_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl p-0 overflow-hidden bg-white shadow-layered-card border border-[#E2E8F0] rounded-[24px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10 bg-base-100 shadow-sm">✕</button>
          </form>
          <div className="p-6 bg-base-100 border-b border-base-200">
            <h3 className="font-bold text-2xl">Our Offline Center</h3>
            <p className="text-base-100/70 mt-1">New Rajendra Nagar, behind SBI Bank, Near RDA Building, Raipur, CG 492001</p>
          </div>
          <div className="aspect-video w-full bg-base-300">
            <iframe
              title="Center Location"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.9189729881666!2d81.65089181534063!3d21.235071185888062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddbb148ce1df%3A0x5e56d47b7b12cb7!2sNew%20Rajendra%20Nagar%2C%20Raipur%2C%20Chhattisgarh%20492001!5e0!3m2!1sen!2sin!4v1689880000000!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default BatchEnrollment;