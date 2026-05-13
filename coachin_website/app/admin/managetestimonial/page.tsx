"use client";
import React, { useState, useEffect } from 'react';
// import { testimonialAPI } from '../../api/api';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null); 
  const [viewingTestimonial, setViewingTestimonial] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const openModal = (modalId: string) => {
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };

  const closeModal = (modalId: string) => {
    (document.getElementById(modalId) as HTMLDialogElement)?.close();
  };

  const fetchTestimonials = async () => {
    try {
      const data = await fetch('/api/testimonial/get-all').then(res => res.json());
      setTestimonials(Array.isArray(data) ? data : data.testimonials || []);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    openModal('success_modal');
  };

  const handleAddTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    // Prevent sending an empty file if the user didn't select one
    const imageFile = formData.get('image');
    if (imageFile instanceof File && imageFile.size === 0) {
      formData.delete('image');
    }
    
    try {
      const res = await fetch('/api/testimonial/add', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add testimonial");
      e.currentTarget.reset();
      closeModal('add_testimonial_modal');
      fetchTestimonials(); // refresh the list
      showSuccess("Testimonial added successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    setTestimonialToDelete(id);
    openModal('delete_confirm_modal');
  };

  const executeDelete = async () => {
    if (!testimonialToDelete) return;
    try {
      const res = await fetch(`/api/testimonial/delete/${testimonialToDelete}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      fetchTestimonials();
      setTestimonialToDelete(null);
      closeModal('delete_confirm_modal');
      showSuccess("Testimonial deleted successfully!");
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
      setTestimonialToDelete(null);
      closeModal('delete_confirm_modal');
    }
  };

  const openEditModal = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    openModal('edit_testimonial_modal');
  };

  const handleEditTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    
    // Convert FormData to a standard object so it can be viewed in the console
    console.log("Form Data being sent:", Object.fromEntries(formData.entries()));

    // If no new image was selected, remove it to avoid overwriting with an empty file
    const imageFile = formData.get('image');
    if (imageFile instanceof File && imageFile.size === 0) {
      formData.delete('image');
    }

    try {
      const res = await fetch(`/api/testimonial/update/${editingTestimonial._id || editingTestimonial.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update testimonial");
      setEditingTestimonial(null);
      closeModal('edit_testimonial_modal');
      fetchTestimonials();
      showSuccess("Testimonial updated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pagination Logic
  const indexOfLastTestimonial = currentPage * itemsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - itemsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Ensure current page is valid after deletions or itemsPerPage changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [testimonials.length, currentPage, totalPages]);

  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-base-100 mb-2">Manage Testimonials</h1>
          <p className="text-sm sm:text-base text-base-100/70">Create, update, and showcase student success stories.</p>
        </div>
        <button 
          className="btn border-none bg-brand-gradient shadow-brand-glow hover:shadow-lg hover:-translate-y-px transition-all duration-300 w-full sm:w-auto"
          onClick={() => openModal('add_testimonial_modal')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Table */}
      <div className="card bg-base-content rounded-xl shadow-level-2">
        <div className="overflow-x-auto w-full">
          <table className="table w-full border-t border-base-200">
            <thead>
              <tr className="bg-brand-gradient text-white border-b border-base-200/50">
                <th className="whitespace-nowrap">Student Name</th>
                <th className="whitespace-nowrap">City/Rank</th>
                <th className="whitespace-nowrap">Center</th>
                <th className="whitespace-nowrap">Rating</th>
                <th className="whitespace-nowrap">Message</th>
                <th className="text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200/90">
              {currentTestimonials.map((testimonial) => (
                <tr key={testimonial._id || testimonial.id} className="hover:bg-white/80 transition-colors duration-150 cursor-pointer" onClick={() => setViewingTestimonial(testimonial)}>
                  <td className="font-bold text-base-100 flex items-center gap-3 min-w-[200px] whitespace-nowrap">
                    <div className="avatar">
                      <div className="mask mask-circle w-10 h-10">
                        <img src={testimonial.image || "/images/real-classroom-kunal.jpg"} alt={testimonial.name} className="w-full h-full object-cover" loading='lazy' />
                      </div>
                    </div>
                    {testimonial.name}
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="text-sm font-bold">{testimonial.rank || "Student"}</div>
                    <div className="text-xs text-base-100/70">{testimonial.city}</div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="text-sm text-base-100/80">{testimonial.center || "-"}</div>
                  </td>
                  <td className="font-medium text-warning text-lg whitespace-nowrap">
                    {'★'.repeat(testimonial.rating || 5)}{'☆'.repeat(5 - (testimonial.rating || 5))}
                  </td>
                  <td className="max-w-[200px] truncate text-sm text-base-100/80" title={testimonial.message}>
                    {testimonial.message}
                  </td>
                  <td className="text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1 sm:gap-2">
                      <button className="btn btn-sm btn-ghost text-primary hover:bg-primary hover:text-white hover:border-primary border border-base-300" onClick={() => openEditModal(testimonial)}>Edit</button>
                      <button className="btn btn-sm btn-ghost text-error border hover:bg-error hover:text-white hover:border-error border-base-300" onClick={() => confirmDelete(testimonial._id || testimonial.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-base-100/60 font-medium">No testimonials found. Add one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center p-4 border-t border-base-200/50">
            <div className="join">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="join-item btn btn-sm">«</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="join-item btn btn-sm">»</button>
            </div>
          </div>
        )}
      </div>

      {/* Reusable Form Component for Add/Edit */}
      {['add', 'edit'].map((mode) => {
        const isEdit = mode === 'edit';
        const modalId = `${mode}_testimonial_modal`;
        const onSubmit = isEdit ? handleEditTestimonial : handleAddTestimonial;
        const data = isEdit ? editingTestimonial : null;
        
        return (
          <dialog id={modalId} key={modalId} className="modal">
            <div className="modal-box w-11/12 max-w-2xl rounded-2xl p-0 ">
              <form method="dialog">
                <button className="btn btn-sm btn-ghost text-white absolute right-4 top-4 z-10 text-base-100" onClick={() => isEdit && setEditingTestimonial(null)}>✕</button>
              </form>
              <div className="p-6 border-b border-base-200 bg-brand-gradient rounded-tl-2xl rounded-tr-2xl">
                <h3 className="font-bold text-2xl text-base-content">{isEdit ? "Edit Testimonial" : "Add New Testimonial"}</h3>
                <p className="text-sm text-base-content mt-1">{isEdit ? "Update the details for this student review." : "Fill in the details for the new student review."}</p>
              </div>
              
              <form onSubmit={onSubmit} encType="multipart/form-data" key={data?._id || data?.id || mode} className="bg-base-content">
                <div className="p-6 space-y-4 bg-base-content/20">
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-bold text-base-100">Student Name</span></label>
                    <input name="name" type="text" required defaultValue={data?.name} placeholder="e.g. Rahul Sharma" className="input input-bordered border border-black/40 w-full focus:outline-primary bg-base-content" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label"><span className="label-text font-bold text-base-100">Rank / Achievement</span></label>
                      <input name="rank" type="text" defaultValue={data?.rank} placeholder="e.g. JEE Advanced AIR 842" className="input border border-black/40 input-bordered w-full focus:outline-primary bg-base-content" />
                    </div>
                    <div className="form-control w-full">
                      <label className="label"><span className="label-text font-bold text-base-100">City</span></label>
                      <input name="city" type="text" defaultValue={data?.city} placeholder="e.g. Raipur" className="input border border-black/40 input-bordered w-full focus:outline-primary bg-base-content" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label"><span className="label-text font-bold text-base-100">Rating (1-5)</span></label>
                      <select name="rating" required defaultValue={data?.rating || 5} className="select select-bordered border border-black/40 w-full focus:outline-primary bg-base-content">
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                    <div className="form-control w-full">
                      <label className="label"><span className="label-text font-bold text-base-100">Center</span></label>
                      <input name="center" type="text" defaultValue={data?.center} placeholder="e.g. Eunoia Education Raipur" className="input input-bordered border border-black/40 w-full focus:outline-primary bg-base-content" />
                    </div>
                  </div>

                  <div className="form-control w-full flex flex-col">
                    <label className="label"><span className="label-text font-bold text-base-100">Message / Quote</span></label>
                    <textarea name="message" required defaultValue={data?.message || data?.quote} className="textarea textarea-bordered border border-black/40 h-24 focus:outline-primary bg-base-content w-full" placeholder="Detail what the student said..."></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-bold text-base-100">Student Image</span></label>
                    <input name="image" type="file" accept="image/*" className="file-input file-input-bordered file-border border-black/40 w-full focus:outline-primary bg-base-content" />
                  </div>
                </div>

                <div className="p-6 border-t border-base-200 bg-base-content flex justify-end gap-2">
                    <button type="button" className="btn btn-ghost" onClick={() => { isEdit && setEditingTestimonial(null); closeModal(modalId); }}>Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="btn border-none bg-brand-gradient shadow-elevation-soft">
                      {isSubmitting ? <span className="loading loading-spinner"></span> : (isEdit ? "Update Testimonial" : "Save Testimonial")}
                    </button>
                </div>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => isEdit && setEditingTestimonial(null)}>close</button>
            </form>
          </dialog>
        );
      })}

      {/* Delete Confirmation Modal */}
      <dialog id="delete_confirm_modal" className="modal">
        <div className="modal-box border-t-4 border-error bg-base-content">
          <h3 className="font-bold text-xl text-error">Confirm Deletion</h3>
          <p className="py-4 text-base-100/80">Are you sure you want to delete this testimonial? This action cannot be undone.</p>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={() => { setTestimonialToDelete(null); closeModal('delete_confirm_modal'); }}>Cancel</button>
            <button type="button" className="btn btn-error text-white" onClick={executeDelete}>
              Yes, Delete
            </button>
          </div>
        </div> 
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setTestimonialToDelete(null)}>close</button>
        </form>
      </dialog>

      {/* Success Modal */}
      <dialog id="success_modal" className="modal">
        <div className="modal-box border-t-4 border-success bg-base-content">
          <h3 className="font-bold text-xl text-success flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Success
          </h3>
          <p className="py-4 text-base-100/80">{successMessage}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-success text-white">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* View Testimonial Drawer */}
      <div className={`fixed inset-0 z-[60] overflow-hidden ${viewingTestimonial ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${viewingTestimonial ? 'opacity-100' : 'opacity-0'}`} onClick={() => setViewingTestimonial(null)}></div>
        <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-base-content shadow-2xl transform transition-transform duration-300 ease-in-out ${viewingTestimonial ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          {viewingTestimonial && (
            <>
              <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-content sticky top-0 z-10">
                <h2 className="text-xl font-bold truncate pr-4">Testimonial Details</h2>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setViewingTestimonial(null)}>✕</button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-base-200/20">
                <div className="flex flex-col items-center text-center">
                  <div className="avatar mb-4">
                    <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={viewingTestimonial.image || "/images/real-classroom-kunal.jpg"} alt={viewingTestimonial.name} className="w-full h-full object-cover" loading='lazy' />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">{viewingTestimonial.name}</h3>
                  <p className="text-primary font-semibold">{viewingTestimonial.rank || "Student"}</p>
                  <p className="text-sm text-base-100/70">{viewingTestimonial.city} • {viewingTestimonial.center || "Center"}</p>
                  <div className="text-warning text-xl mt-2">
                    {'★'.repeat(viewingTestimonial.rating || 5)}{'☆'.repeat(5 - (viewingTestimonial.rating || 5))}
                  </div>
                </div>
                
                <div className="bg-base-content p-6 rounded-xl shadow-sm border border-base-200 relative">
                  <div className="absolute top-2 left-2 text-primary/20 text-4xl leading-none font-serif">"</div>
                  <p className="text-base-100/80 relative z-10 italic pt-2">
                    {viewingTestimonial.message}
                  </p>
                </div>
              </div>
              <div className="p-6 border-t border-base-200 bg-base-content flex justify-end gap-2">
                <button className="btn btn-outline text-primary hover:bg-primary hover:text-white hover:border-primary" onClick={() => { setViewingTestimonial(null); openEditModal(viewingTestimonial); }}>Edit</button>
                <button className="btn btn-outline text-error hover:bg-error hover:text-white hover:border-error" onClick={() => { setViewingTestimonial(null); confirmDelete(viewingTestimonial._id || viewingTestimonial.id); }}>Delete</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTestimonials;