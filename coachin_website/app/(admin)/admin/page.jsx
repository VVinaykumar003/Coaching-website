"use client";

import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-base-content shadow-sm rounded-[16px] border border-base-200">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <div className="stat-title font-medium text-primary">Total Students</div>
          <div className="stat-value text-primary">1,200</div>
          <div className="stat-desc text-primary">↗︎ 400 (22%)</div>
        </div>
        
        <div className="stat bg-base-content shadow-sm rounded-[16px] border border-base-200">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div className="stat-title font-medium text-secondary">Active Courses</div>
          <div className="stat-value text-secondary">24</div>
          <div className="stat-desc text-secondary">↗︎ 4 (14%)</div>
        </div>
        
        <div className="stat bg-base-content shadow-sm rounded-[16px] border border-base-200">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          </div>
          <div className="stat-title font-medium text-accent">Monthly Revenue</div>
          <div className="stat-value text-accent">$89.4k</div>
          <div className="stat-desc text-accent">↗︎ $14k (18%)</div>
        </div>

        <div className="stat bg-base-content shadow-sm rounded-[16px] border border-base-200">
          <div className="stat-figure text-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <div className="stat-title font-medium text-info">Pending Tasks</div>
          <div className="stat-value text-info">12</div>
          <div className="stat-desc text-info">↘︎ 3 less than last week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Registrations Table */}
        <div className="card bg-base-content shadow-sm border border-base-200 lg:col-span-2">
          <div className="card-body p-4 sm:p-6">
            <h2 className="card-title text-lg mb-2">Recent Registrations</h2>
            <div className="overflow-x-auto">
              <table className="table w-full ">
                <thead className="bg-brand-gradient">
                  <tr className='rounded-tl-lg'>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder hidden sm:flex">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">JD</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm sm:text-base">John Doe</div>
                          <div className="text-xs opacity-50">john@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium text-sm sm:text-base">React Mastery</td>
                    <td className="text-sm">Oct 24</td>
                    <td><span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/20">Active</span></td>
                  </tr>
                  <tr className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder hidden sm:flex">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">JS</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm sm:text-base">Jane Smith</div>
                          <div className="text-xs opacity-50">jane@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium text-sm sm:text-base">Advanced Node</td>
                    <td className="text-sm">Oct 23</td>
                    <td><span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-warning/10 text-warning border border-warning/20">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-sm btn-ghost">View All</button>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          <div className="card bg-base-content shadow-sm border border-base-200 min-w-0">
            <div className="card-body p-4 sm:p-6">
              <h2 className="card-title text-lg mb-2">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <button className="btn btn-primary w-full shadow-sm hover:-translate-y-px transition-transform">
                  Create New Course
                </button>
                <button className="btn btn-outline btn-secondary w-full">
                  Send Announcement
                </button>
                <button className="btn btn-ghost w-full border border-base-300">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}