"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the secure admin token
    localStorage.removeItem('adminToken');
    // Redirect back to the login page
    router.push('/admin/login');
  };

  return (
    <header className="navbar bg-base-content shadow-level-1 sticky top-0 z-50 px-4">
      <div className="flex-1 flex items-center">
        <Link href="/admin" className="btn btn-ghost border-none">
          <img src="/kunal_logo_ee1.png" alt="Eunoia Education Logo" className="h-10 md:h-12 w-auto max-w-full object-contain" loading='lazy' />
        </Link>
       
      </div>
      <div className="flex-none flex items-center gap-4">
        <div className="flex  items-center gap-2">
          <div className="avatar placeholder hidden sm:flex ">
            {/* <div className="bg-primary  text-primary-content rounded-full w-8">
              <span className="text-xs font-bold ml-2">AD</span>
            </div> */}
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="btn btn-outline btn-error btn-sm shadow-sm hover:shadow-md transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;