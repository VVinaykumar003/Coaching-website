'use client';

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {



  const closeMenu = () => {
    const toggle = document.getElementById('navbar-1-toggle') as HTMLInputElement | null;
    if (toggle) toggle.checked = false;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  const blurActiveElement = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // const closeDropdown = () => {
  //   const dropdown = document.getElementById('courses-desktop-dropdown');
  //   if (dropdown) dropdown.removeAttribute('open');
  //   if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  // };

  // Tailwind classes for a sleek animated blue line hover effect
  const navLinkStyle = "relative font-medium hover:text-primary focus:!bg-transparent active:!bg-transparent focus:!text-primary active:!text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left px-6 text-md font-semibold";

  return (
    <>
      <div className="bg-brand-gradient text-primary-content text-center py-2 sm:py-2.5 text-xs sm:text-sm font-bold px-2 sm:px-4 tracking-wide shadow-inner flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-3">
        <span>&quot;Crack JEE & NEET with Raipur&apos;s Most Transparent Hybrid Coaching.&quot;</span>
        <span className="hidden lg:inline opacity-60">|</span>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          <a href="tel:+918770459007" className="hover:opacity-80 transition-opacity">📞 8770459007 / 966923800</a>
          <span className="hidden sm:inline opacity-60">|</span>
          <a href="mailto:kunal@eunoiaeducation.in" className="hover:opacity-80 transition-opacity">✉️ kunal@eunoiaeducation.in</a>
        </div>
      </div>
   <header className="max-lg:collapse  backdrop-blur-md shadow-sm border-b border-base-200/50 w-full sticky top-0 z-50 transition-all duration-300">
  <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
  <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
  <div className="collapse-title navbar">
    <div className="navbar-start lg:gap-2">
      <label htmlFor="navbar-1-toggle" className="btn btn-ghost btn-sm lg:hidden pr-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <Link href="/" className="btn btn-ghost hover:bg-transparent focus:bg-transparent focus:border-none focus:text-primary border-none px-1 -ml-1">
        <Image  src="/kunal_logo_ee1.png" 
        width={190}
        height={120}
        alt="Eunoia Education Logo"  />
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-4  ">
        <li><Link href="/" className={navLinkStyle} onClick={blurActiveElement}>Home</Link></li>
        <li><Link href="/about" className={navLinkStyle} onClick={blurActiveElement}>About</Link></li>
        <li>
          <Link href="/courses" className={navLinkStyle} onClick={blurActiveElement}>Courses</Link>
          {/* <details id="courses-desktop-dropdown">
            <summary className={navLinkStyle}>Courses</summary>
            <ul className="p-2 bg-base-100 shadow-xl rounded-box w-48 z-10 border border-base-200">
              <li><Link href="/courses?category=Physics" className={navLinkStyle} onClick={closeDropdown}>Physics</Link></li>
              <li><Link href="/courses?category=Chemistry" className={navLinkStyle} onClick={closeDropdown}>Chemistry</Link></li>
              <li><Link href="/courses?category=Mathematics" className={navLinkStyle} onClick={closeDropdown}>Mathematics</Link></li>
            </ul>
          </details> */}
        </li>
        <li><Link href="/features" className={navLinkStyle} onClick={blurActiveElement}>Features</Link></li>
        <li><Link href="/blogs" className={navLinkStyle} onClick={blurActiveElement}>Blog</Link></li>
        <li><Link href="/contact" className={navLinkStyle} onClick={blurActiveElement}>Contact</Link></li>
      </ul>
    </div>
    <div className="navbar-end gap-2 pr-2">
      {/* <button className="btn btn-ghost hidden sm:inline-flex" onClick={handleLoginClick}>Log In</button> */}
      <button className="btn btn-sm md:btn-md bg-brand-gradient  hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">Enroll Now</button>
    </div>
  </div>

  <div className="collapse-content lg:hidden z-1">
    <ul className="menu">
      <li><Link href="/" className={navLinkStyle} onClick={closeMenu}>Home</Link></li>
      <li><Link href="/about" className={navLinkStyle} onClick={closeMenu}>About</Link></li>
      <li>
         <Link href="/courses" className={navLinkStyle} onClick={closeMenu}>Courses</Link>

        {/* <button className="pointer-events-none font-semibold text-base-content/50">Courses</button>
        <ul>
          <li><Link href="/courses?category=Physics" className={`${navLinkStyle} py-2`} onClick={closeMenu}>Physics</Link></li>
          <li><Link href="/courses?category=Chemistry" className={`${navLinkStyle} py-2`} onClick={closeMenu}>Chemistry</Link></li>
          <li><Link href="/courses?category=Mathematics" className={`${navLinkStyle} py-2`} onClick={closeMenu}>Mathematics</Link></li>
        </ul> */}
      </li>
      <li><Link href="/features" className={navLinkStyle} onClick={closeMenu}>Features</Link></li>
      <li><Link href="/blog" className={navLinkStyle} onClick={closeMenu}>Blog</Link></li>
      <li><Link href="/contact" className={navLinkStyle} onClick={closeMenu}>Contact</Link></li>
      {/* <li className="mt-2 sm:hidden">
        <button 
          className="btn btn-outline btn-primary btn-sm w-full" 
          onClick={() => {
            handleLoginClick();
            closeMenu();
          }}
        >
          Log In
        </button>
      </li> */}
    </ul>
  </div>
</header>
    </>
  )
}

export default Header
