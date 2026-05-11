import React from 'react';

const Contact = () => {
  const faqs = [
    {
      question: "How do I join a demo class?",
      answer: "You can request a free demo by filling out the contact form on this page. Select the course you're interested in, and our team will get in touch with you via WhatsApp to schedule a session. You can also see our teaching style on our YouTube channel."
    },
    {
      question: "Do you provide offline coaching?",
      answer: "Yes, we have offline batches at our Head Office in Raipur. You can find details about batch timings and seat availability in the 'Offline Center Admissions' section on the homepage."
    },
    {
      question: "What study materials are provided with the courses?",
      answer: "All our courses come with comprehensive study materials, including PDF notes, practice question banks, previous year question papers, and formula sheets. These are accessible through our student dashboard upon enrollment."
    },
    {
      question: "How are student doubts resolved?",
      answer: "We have multiple channels for doubt resolution. Each course includes live Q&A sessions, a dedicated WhatsApp group for quick queries, and one-on-one doubt-solving sessions that can be booked with the instructor."
    }
  ];

  return (
    <main className="pt-12 lg:pt-8 pb-12 min-h-[60vh] font-sans">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-base-100 mb-4">Get in Touch</h1>
          <p className="text-md text-base-100/70 max-w-2xl mx-auto">
            Have questions about our courses or need help getting started? We&apos;re here to help.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Left Side: Information */}
          <div>
            <div className="card bg-white shadow-layered-card border border-[#E2E8F0] rounded-2xl p-6 h-full">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
                  <div>
                    <h4 className="font-bold text-lg">Head Office</h4>
                    <p className="text-base-100/80">New Rajendra Nagar, Raipur, CG [492001]</p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                  <div>
                    <h4 className="font-bold text-lg">Support Email</h4>
                    <p className="text-base-100/80 hover:text-primary transition-colors"><a href="mailto:kunal@eunoiaeducation.in">kunal@eunoiaeducation.in</a></p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                  <div>
                    <h4 className="font-bold text-lg">Direct Call</h4>
                    <p className="text-base-100/80 hover:text-primary transition-colors"><a href="tel:+918770459007">+91 8770459007</a> / <a href="tel:+91966923800">966923800</a></p>
                  </div>
                </div>
              </div>
              <div className="divider my-6"></div>
              <div className="badge badge-lg badge-outline badge-success gap-2 p-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Usually responds in 2 hours
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div>
            <div className="card bg-white shadow-layered-card border border-[#E2E8F0] rounded-2xl p-6">
              <form className="space-y-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Full Name</span></label>
                  <input type="text" placeholder="e.g., Rahul Sharma" className="input  input-bordered w-full bg-[#F8FAFC] focus:bg-white  transition-colors" required />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">WhatsApp Number</span></label>
                  <input type="tel" placeholder="e.g., 9876543210" className="input input-bordered w-full bg-[#F8FAFC] focus:bg-white transition-colors" required />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Interested Course</span></label>
                  <select className="select select-bordered w-full bg-[#F8FAFC] focus:bg-white transition-colors">
                    <option disabled selected>Pick one</option>
                    <option>Class 12th Physics Mastery</option>
                    <option>Basic Mathematics for Physics</option>
                    <option>Foundation Science (Class 9th & 10th)</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>
                <div className="form-control flex flex-col">
                  <label className="label"><span className="label-text font-medium">Your Message </span></label>
                  <textarea className="textarea textarea-primary  text-base-100 bg-white w-full border focus:border-black" placeholder="Tell us how we can help..."></textarea>
                </div>
                <div className="form-control pt-4">
                  <button className="btn border-none bg-brand-gradient text-white shadow-brand-glow hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,188,212,0.7)] transition-all duration-300 btn-lg w-full">Request a Free Demo Class</button>
                </div>
              </form>
              <p className="text-center text-sm mt-4 text-base-100/70">
                Want to see how we teach? <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-brand-gradient font-bold hover:underline">Watch a demo on YouTube</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Map & Socials Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-4xl mx-auto mb-8">
          <div className="text-center md:text-left flex-1">
            <h3 className="text-3xl font-bold mb-4">Find Us Here</h3>
            <p className="text-base-100/70">
              Visit our head office in Raipur for in-person counseling and offline batch inquiries.
            </p>
          </div>
          <div className="w-full max-w-md aspect-video bg-base-300 rounded-2xl shadow-layered-card overflow-hidden border border-[#E2E8F0]">
            <iframe
              title="Center Location"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.9189729881666!2d81.65089181534063!3d21.235071185888062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddbb148ce1df%3A0x5e56d47b7b12cb7!2sNew%20Rajendra%20Nagar%2C%20Raipur%2C%20Chhattisgarh%20492001!5e0!3m2!1sen!2sin!4v1689880000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-deep-navy mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="collapse collapse-plus bg-white border border-[#E2E8F0] shadow-layered-card rounded-2xl transition-all hover:shadow-md">
                <input type="radio" name="my-accordion-3" defaultChecked={index === 0} /> 
                <div className="collapse-title text-xl font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content"> 
                  <p className="text-base-100/80 text-readable">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default Contact;