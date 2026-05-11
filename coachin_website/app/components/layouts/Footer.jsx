import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-brand-gradient text-neutral-content pt-10 pb-16 md:pb-6 font-sans">
      <div className="container mx-auto px-4">
        <div className="footer grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {/* Branding Column */}
          <aside className="max-w-xs">
            <Image src="/kunal_logo_ee1.png" 
            width={200}
            height={120}
            alt="Eunoia Education Logo" className="h-20 w-auto mb-2 bg-white rounded-2xl"
             loading='lazy'
            />
            <p className="text-neutral-content/80 text-base">
              <span className="font-bold text-lg block mb-1">Eunoia Education</span>
              <span className="italic text-sm">&quot; Where Concepts Become Confidence.&quot;</span>
            </p>
            {/* Social Icons */}
            <div className="flex gap-2 mt-4">
              <a href=" https://youtube.com/@theeunoiaeducation?si=ww24QGtiUsl4pt5_" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm btn-circle" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
              </a>
              <a href=" https://www.instagram.com/eunoia_raipur?igsh=MWs5bXQyOWwzd2QxYQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm btn-circle" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/share/18dnYJnGiC/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm btn-circle" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </aside>
          
          {/* Courses Column */}
          <nav>
            <h6 className="footer-title opacity-100 text-[#00BCD4] font-extrabold tracking-wide">Courses</h6>
            <Link href="/courses" className="link link-hover text-white/80 hover:text-white transition-colors">Physics (Class 11 & 12)</Link>
            <Link href="/courses" className="link link-hover text-white/80 hover:text-white transition-colors">NEET Prep</Link>
            <Link href="/courses" className="link link-hover text-white/80 hover:text-white transition-colors">JEE Mains/Advanced</Link>
          </nav>

          {/* Student Corner Column */}
          <nav>
            <h6 className="footer-title opacity-100 text-[#00BCD4] font-extrabold tracking-wide">Student Corner</h6>
            <Link href="/features" className="link link-hover text-white/80 hover:text-white transition-colors">Success Stories</Link>
            {/* <Link href="/features" className="link link-hover text-white/80 hover:text-white transition-colors">Student Results</Link> */}
            <Link href="/blog" className="link link-hover text-white/80 hover:text-white transition-colors">Study Blog</Link>
            {/* <Link href="/courses" className="link link-hover text-white/80 hover:text-white transition-colors">Free Resources</Link> */}
          </nav>

          {/* Support Column */}
          <nav>
            <h6 className="footer-title opacity-100 text-[#00BCD4] font-extrabold tracking-wide">Support</h6>
            <Link href="/contact" className="link link-hover text-white/80 hover:text-white transition-colors">Contact Us</Link>
            <Link href="/contact" className="link link-hover text-white/80 hover:text-white transition-colors">FAQ</Link>
            <a href="#" className="link link-hover text-white/80 hover:text-white transition-colors">Terms & Privacy</a>
            {/* <a href="#" className="link link-hover text-white/80 hover:text-white transition-colors">Refund Policy</a> */}
          </nav>

          {/* Contact Details Column */}
          <nav>
            <h6 className="footer-title opacity-100 text-[#00BCD4] font-extrabold tracking-wide">Reach Us</h6>
            <div className="text-white/80 text-sm space-y-3 mt-1 leading-relaxed">
              {/* <p><strong className="text-white">Founder:</strong> Kunal Madaria<br/>(Physics & Chemistry Expert)</p> */}
              <p>New Rajendra Nagar, behind SBI Bank,<br/>Near RDA Building, Raipur, CG [492001]</p>
              <p>📞 <a href="tel:+918770459007" className="hover:text-primary transition-colors">8770459007</a> / <a href="tel:+91966923800" className="hover:text-primary transition-colors">966923800</a></p>
              <p>✉️ <a href="mailto:kunal@eunoiaeducation.in" className="hover:text-primary transition-colors">kunal@eunoiaeducation.in</a></p>
            </div>
          </nav>

          {/* Newsletter Column */}
          {/* <form className="w-full max-w-xs" onSubmit={(e) => e.preventDefault()}>
            <h6 className="footer-title text-white font-bold">Newsletter</h6>
            <p className="text-sm text-white/80 mb-4">Get free notes and exam updates in your inbox.</p>
            <div className="join w-full">
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered join-item w-full focus:outline-primary"
                required
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </form> */}
        </div>

        {/* Bottom Bar */}
        <div className="divider border-base-300 my-0"></div>
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4 text-sm text-neutral-content/70">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
            <p>© {new Date().getFullYear()} Eunoia Education. All rights reserved.</p>
            <span className="hidden md:inline-block opacity-50">|</span> 
            <hr className="border-neutral-content/20 w-12 md:hidden my-1"/>
            <Link href="/login" className="hover:text-neutral-content transition-colors font-medium">Log in</Link>
          </div>
          <p className="text-center md:text-right">Powered by: <a href="https://www.zager.in/" target="_blank" rel="noopener noreferrer" className="font-bold text-neutral-content hover:text-primary transition-colors ml-1">Zager</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
