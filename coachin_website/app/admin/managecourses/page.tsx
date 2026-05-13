"use client";
import React, { useState, useEffect } from 'react';
// import { courseAPI } from '../../api/api';

const STANDARD_CATEGORIES = [
  "Class 11",
  "Class 12",
  "NEET",
  "JEE Mains/Advanced",
  "Foundation (Class 9-10)"
];

const ManageCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [viewingCourse, setViewingCourse] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isOtherCategoryAdd, setIsOtherCategoryAdd] = useState(false);
  const [isOtherCategoryEdit, setIsOtherCategoryEdit] = useState(false);

  const openModal = (modalId: string) => {
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };

  const closeModal = (modalId: string) => {
    (document.getElementById(modalId) as HTMLDialogElement)?.close();
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    openModal('success_modal');
  };

  const fetchCourses = async () => {
    try {
      const data = await fetch('/api/course/get-all').then(res => res.json());
      setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (err) {
      console.error("Failed to fetch courses:", err); 
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    // Prevent sending an empty file if the user didn't select one
    const thumbnailFile = formData.get('thumbnail');
    if (thumbnailFile instanceof File && thumbnailFile.size === 0) {
      formData.delete('thumbnail');
    }
    
    try {
      const res = await fetch('/api/course/add', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add course");
      e.currentTarget.reset();
      setIsOtherCategoryAdd(false);
      closeModal('add_course_modal');
      fetchCourses(); // refresh the list
      showSuccess("Course added successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    console.log(id)
    setCourseToDelete(id);
    openModal('delete_confirm_modal');
  };

  const executeDelete = async () => {
    console.log(courseToDelete)
    if (!courseToDelete) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/course/delete/${courseToDelete}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete course");
      fetchCourses();
      showSuccess("Course deleted successfully!");
    } catch (err) {
      console.error("Failed to delete course:", err);
    } finally {
      setIsSubmitting(false);
      setCourseToDelete(null);
      closeModal('delete_confirm_modal');
    }
  };

  const openEditModal = (course: any) => {
    setEditingCourse(course);
    if (course.category && !STANDARD_CATEGORIES.includes(course.category)) {
      setIsOtherCategoryEdit(true);
    } else {
      setIsOtherCategoryEdit(false);
    }
    openModal('edit_course_modal');
  };

  const handleEditCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    // Convert FormData to a standard object so it can be viewed in the console
    console.log("Form Data being sent:", Object.fromEntries(formData.entries()));
    
    // If no new thumbnail was selected, remove it to avoid overwriting with an empty file
    const thumbnailFile = formData.get('thumbnail');
    if (thumbnailFile instanceof File && thumbnailFile.size === 0) {
      formData.delete('thumbnail');
    }

    try {
      const res = await fetch(`/api/course/update/${editingCourse._id || editingCourse.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update course");
      setEditingCourse(null);
      closeModal('edit_course_modal');
      fetchCourses();
      showSuccess("Course updated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pagination Logic
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  // Ensure current page is valid after deletions or itemsPerPage changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [courses.length, currentPage, totalPages]);

  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-base-100 mb-2">Manage Courses</h1>
          <p className="text-sm sm:text-base text-base-100/70">Create, update, and categorize courses (Class 11, 12, NEET, JEE).</p>
        </div>
        <button 
          className="btn border-none bg-brand-gradient shadow-brand-glow hover:shadow-lg hover:-translate-y-px transition-all duration-300 w-full sm:w-auto"
          onClick={() => openModal('add_course_modal')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="card bg-base-content rounded-xl shadow-level-2">
        <div className="overflow-x-auto w-full rounded-r-2xl rounded-l-2xl">
          <table className="table w-full border-t border-base-200/50 ">
            <thead>
              <tr className="bg-brand-gradient text-base-100 border-b border-base-200/50">
                <th className="whitespace-nowrap">Course Title</th>
                <th className="whitespace-nowrap">Category</th>
                <th className="whitespace-nowrap">Status</th>
                <th className="text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200/50">
              {currentCourses.map((course) => (
                <tr key={course._id || course.id} className="hover:bg-base-200/10 transition-colors duration-150 cursor-pointer" onClick={() => setViewingCourse(course)}>
                  <td className="font-bold text-base-100 min-w-[200px]">{course.courseName || course.title}</td> 
                  <td className="whitespace-nowrap">
                    <span className="badge badge-ghost badge-sm font-medium">{course.category}</span>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="badge badge-sm badge-success border-none text-white whitespace-nowrap">
                      {course.status || 'Active'}
                    </span>
                  </td>
                  <td className="text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1 sm:gap-2">
                      <button className="btn btn-sm btn-ghost text-primary border border-base-300" onClick={() => openEditModal(course)}>Edit</button>
                      <button className="btn btn-sm btn-ghost text-error border border-base-300" onClick={() => confirmDelete(course._id || course.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-base-100/60">No courses found. Add one to get started!</td>
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

      {/* Add Course Modal */}
      <dialog id="add_course_modal" className="modal" onClose={() => setIsOtherCategoryAdd(false)}>
        <div className="modal-box w-11/12 max-w-2xl rounded-2xl p-0 ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-4 top-4">✕</button>
          </form>
          <div className="p-6 border-b border-base-200 bg-base-content bg-brand-gradient">
            <h3 className="font-bold text-2xl text-base-content">Add New Course</h3>
            <p className="text-sm text-base-content/70 mt-1">Fill in the details for the new academic offering.</p>
          </div>
          
          <form onSubmit={handleAddCourse} encType="multipart/form-data">
              <div className="p-6 space-y-4 bg-white text-base-100">
                <div className="form-control w-full">
                  <label className="label pb-1"><span className="label-text font-bold text-base-100">Course Title</span></label>
                  <input name="courseName" type="text" required placeholder="e.g. Class 11th Physics Mastery" className="input input-bordered border border-black/20  w-full focus:outline-primary bg-base-content" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label pb-1"><span className="label-text font-bold text-base-100">Category (Level)</span></label>
                    <select 
                      name={isOtherCategoryAdd ? "category_dropdown" : "category"} 
                      required={!isOtherCategoryAdd} 
                      className="select select-bordered w-full border border-black/20 focus:outline-primary bg-base-content" 
                      defaultValue="Select Level"
                      onChange={(e) => setIsOtherCategoryAdd(e.target.value === 'Other')}
                    >
                      <option disabled>Select Level</option>
                      {STANDARD_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="Other">Other (Specify)</option>
                    </select>
                    {isOtherCategoryAdd && (
                      <input 
                        name="category" 
                        type="text" 
                        required 
                        placeholder="Enter custom category" 
                        className="input input-bordered w-full border border-black/20  focus:outline-primary bg-base-content mt-2" 
                        autoFocus
                      />
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label pb-1"><span className="label-text font-bold text-base-100">Redirect Link</span></label>
                    <input name="redirectLink" type="url" required placeholder="https://..." className="input input-bordered w-full border border-black/20  focus:outline-primary bg-base-content" />
                  </div>
                </div>

                <div className="form-control w-full flex flex-col">
                  <label className="label pb-1"><span className="label-text font-bold text-base-100">Course Description</span></label>
                  <textarea name="description" required className="textarea textarea-bordered h-24 w-full focus:outline-primary border border-black/20  bg-base-content" placeholder="Detail what the students will learn..."></textarea>
                </div>
                
                <div className="form-control w-full">
                  <label className="label pb-1"><span className="label-text font-bold text-base-100">Course Thumbnail</span></label>
                  <input name="thumbnail" type="file" accept="image/*" className="file-input 
                  file-input-bordered outline-black border border-black/20/10   w-full focus:outline-primary bg-base-content " />
                  <label className="label pt-1">
                    <span className="label-text-alt text-base-100/60">Upload an image (Max resolution: 800x600 pixels, up to 2MB).</span>
                  </label>
                </div>
              </div>

          <div className="p-6 border-t border-base-200 bg-base-content flex justify-end gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => { setIsOtherCategoryAdd(false); closeModal('add_course_modal'); }}>Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn border-none bg-brand-gradient shadow-elevation-soft">
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Save Course"}
              </button>
          </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button >close</button>
        </form>
      </dialog>

      {/* Edit Course Modal */}
      <dialog id="edit_course_modal" className="modal" onClose={() => { setEditingCourse(null); setIsOtherCategoryEdit(false); }}>
        <div className="modal-box w-11/12 max-w-2xl rounded-2xl p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-4 top-4" onClick={() => setEditingCourse(null)}>✕</button>
          </form>
          <div className="p-6 border-b border-base-200 bg-brand-gradient">
            <h3 className="font-bold text-2xl text-base-content">Edit Course</h3>
            <p className="text-sm text-base-content/70 mt-1">Update the details for this academic offering.</p>
          </div>
          
          <form onSubmit={handleEditCourse} key={editingCourse?._id || editingCourse?.id || 'edit-form'} encType="multipart/form-data">
              <div className="p-6 space-y-4 bg-base-content">
                <div className="form-control w-full">
                  <label className="label pb-1"><span className="label-text font-bold text-base-100">Course Title</span></label>
                  <input name="courseName" type="text" required defaultValue={editingCourse?.courseName || editingCourse?.title} placeholder="e.g. Class 11th Physics Mastery" className="input input-bordered border border-black/20 w-full focus:outline-primary bg-base-content" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label pb-1"><span className="label-text font-bold text-base-100">Category (Level)</span></label>
                    <select 
                      name={isOtherCategoryEdit ? "category_dropdown" : "category"} 
                      required={!isOtherCategoryEdit}
                      className="select select-bordered border border-black/20  w-full focus:outline-primary bg-base-content" 
                      defaultValue={editingCourse && !STANDARD_CATEGORIES.includes(editingCourse.category) ? "Other" : editingCourse?.category || "Select Level"}
                      onChange={(e) => setIsOtherCategoryEdit(e.target.value === 'Other')}
                    >
                      <option disabled>Select Level</option>
                      {STANDARD_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="Other">Other (Specify)</option>
                    </select>
                    {isOtherCategoryEdit && (
                      <input 
                        name="category" 
                        type="text" 
                        required 
                        defaultValue={editingCourse && !STANDARD_CATEGORIES.includes(editingCourse.category) ? editingCourse.category : ""}
                        placeholder="Enter custom category" 
                        className="input input-bordered border border-black/20  w-full focus:outline-primary bg-base-content mt-2" 
                      />
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label pb-1"><span className="label-text font-bold text-base-100">Redirect Link</span></label>
                    <input name="redirectLink" type="url" required defaultValue={editingCourse?.redirectLink} placeholder="https://..." className="input input-bordered  border border-black/20  w-full focus:outline-primary bg-base-content" />
                  </div>
                </div>

                <div className="form-control w-full flex flex-col">
                  <label className="label pb-1"><span className="label-text font-bold text-base-100">Course Description</span></label>
                  <textarea name="description" required defaultValue={editingCourse?.description} className="textarea textarea-bordered h-50 w-auto focus:outline-primary bg-base-content border border-black/20 " placeholder="Detail what the students will learn..."></textarea>
                </div>
                
                <div className="form-control w-full">
                  <label className="label pb-1"><span className="label-text font-bold text-base-100">Course Thumbnail</span></label>
                  <input name="thumbnail" type="file" accept="image/*" className="file-input file-input-bordered w-full focus:outline-primary bg-base-content border border-black/20 " />
                  <label className="label pt-1">
                    <span className="label-text-alt text-base-100/60">Upload a new image to replace the current one.</span>
                  </label>
                </div>
              </div>

          <div className="p-6 border-t border-base-200 bg-base-content flex justify-end gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => { setEditingCourse(null); setIsOtherCategoryEdit(false); closeModal('edit_course_modal'); }}>Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn border-none bg-brand-gradient shadow-elevation-soft">
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Update Course"}
              </button>
          </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setEditingCourse(null)}>close</button>
        </form>
      </dialog>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_confirm_modal" className="modal">
        <div className="modal-box border-t-4 border-error bg-base-content ">
          <h3 className="font-bold text-xl text-error">Confirm Deletion</h3>
          <p className="py-4 text-base-100/80">Are you sure you want to delete this course? This action cannot be undone.</p>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={() => { setCourseToDelete(null); closeModal('delete_confirm_modal'); }}>Cancel</button>
            <button type="button" className="btn btn-error text-white" onClick={executeDelete} disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner"></span> : "Yes, Delete Course"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setCourseToDelete(null)}>close</button>
        </form>
      </dialog>

      {/* Success Modal */}
      <dialog id="success_modal" className="modal">
        <div className="modal-box border-t-4 border-success bg-white">
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

      {/* View Course Drawer */}
      <div className={`fixed inset-0 z-[60] overflow-hidden ${viewingCourse ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${viewingCourse ? 'opacity-100' : 'opacity-0'}`} onClick={() => setViewingCourse(null)}></div>
        <div className={`absolute inset-y-0 right-0 max-w-xl w-full bg-base-content shadow-2xl transform transition-transform duration-300 ease-in-out ${viewingCourse ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          {viewingCourse && (
            <>
              <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-content sticky top-0 z-10">
                <h2 className="text-2xl font-bold truncate pr-4">{viewingCourse.courseName || viewingCourse.title}</h2>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setViewingCourse(null)}>✕</button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-base-50">
                {viewingCourse.thumbnail && (
                  <img src={viewingCourse.thumbnail} alt="Thumbnail" className="w-full h-64 object-cover rounded-xl shadow-sm" />
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-primary">{viewingCourse.category}</span>
                  <span className="badge badge-outline">{viewingCourse.status || 'Active'}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Description</h4>
                  <div className="prose max-w-none text-sm whitespace-pre-wrap text-base-100/80">
                    {viewingCourse.description}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Link</h4>
                  <a href={viewingCourse.redirectLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                    {viewingCourse.redirectLink}
                  </a>
                </div>
              </div>
              <div className="p-6 border-t border-base-200 bg-base-content flex justify-end gap-2">
                <button className="btn btn-outline text-primary" onClick={() => { setViewingCourse(null); openEditModal(viewingCourse); }}>Edit Course</button>
                <button className="btn btn-outline text-error" onClick={() => { setViewingCourse(null); confirmDelete(viewingCourse._id || viewingCourse.id); }}>Delete</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;