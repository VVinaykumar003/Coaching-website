"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => {
    // Exact match for dashboard, partial for others to highlight nested routes
    if (path === '/admin') {
      return pathname === path ? "bg-brand-gradient text-white font-bold shadow-sm" : "hover:bg-white text-base-100/80";
    }
    return pathname.startsWith(path) ? "bg-brand-gradient text-white font-bold shadow-sm" : "hover:bg-white text-base-100/80";
  };

  const handleLogout = () => {
    // Clear any admin session/token
    localStorage.removeItem('adminToken');
    // Redirect back to the login page
    router.push('/login');
  };

  return (
    <aside className="min-h-screen w-40 md:w-64 bg-base-content md:min-h-screen p-3 md:p-4 border-b md:border-b-0 md:border-r border-base-200 flex flex-col shadow-level-1 relative z-10 shrink-0">
      <div className="px-2 pb-4 hidden md:flex items-center justify-start gap-2">
        <Link href="/admin" className="btn btn-ghost p-0 h-auto hover:bg-transparent hover:border-none hover:shadow-none">
          <img src="/kunal_logo_ee1.png" alt="Eunoia Education Logo" className="h-10 md:h-12 w-auto max-w-full object-contain" />
        </Link>
      </div>
      <hr className=''/>

      <div className="flex-1 overflow-y-auto mb-2 md:mb-4">
        <ul className="menu menu-horizontal md:menu-vertical bg-base-content text-base-200 w-full rounded-box gap-1 md:gap-2 flex-nowrap overflow-x-auto custom-scrollbar p-2">
          <li className="menu-title hidden md:block text-base-200  uppercase tracking-wider font-bold mb-2">
            <span>Admin Menu</span>
          </li>
          <li>
            <Link href="/admin" className={`whitespace-nowrap rounded-lg transition-colors ${isActive('/admin')} text-base-200 `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/managecourses" className={`whitespace-nowrap rounded-lg transition-colors ${isActive('/admin/managecourses')} text-base-200 `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              Manage Courses
            </Link>
          </li>
          <li>
            <Link href="/admin/manageblogs" className={`whitespace-nowrap rounded-lg transition-colors ${isActive('/admin/manageblogs')} text-base-200 `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              Manage Blogs
            </Link>
          </li>
          {/* <li>
            <Link href="/admin/manageusers" className={`whitespace-nowrap rounded-lg transition-colors ${isActive('/admin/manageusers')}`}>Manage Students</Link>
          </li> */}
          <li>
            <Link href="/admin/managetestimonial" className={`whitespace-nowrap rounded-lg transition-colors ${isActive('/admin/managetestimonial')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
              Manage Testimonials
            </Link>
          </li>
        </ul>
      </div>

      <div className='mt-auto border-t border-base-200 pt-4'>
        <button 
          onClick={handleLogout}
          className="btn btn-outline btn-error w-full mb-4 md:mb-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
          Logout
        </button>
        <p className="text-xs text-center text-base-100/50 hidden md:block">© {new Date().getFullYear()} Eunoia Education</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;