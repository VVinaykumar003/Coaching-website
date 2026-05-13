"use client";
import React, { useState, useEffect } from 'react';
// import {blogAPI} from '../../api/api';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    document.getElementById('success_modal').showModal();
  };

  const fetchBlogs = async () => {
    try {
      const data = await fetch('/api/blogs/get-all').then(res => res.json());
      console.log("Fetched blogs from backend:", data);
      setBlogs(Array.isArray(data) ? data : data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    
    // Prevent sending an empty file if the user didn't select one
    const imageFile = formData.get('coverImage');
    if (imageFile && imageFile.size === 0) {
      formData.delete('coverImage');
    }

    try {
      const response = await fetch('/api/blogs/add', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error("Failed to add blog");
      
      e.target.reset();
      document.getElementById('add_blog_modal').close();
      fetchBlogs();
      showSuccess("Blog post published successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id) => {
    setBlogToDelete(id);
    document.getElementById('delete_confirm_modal').showModal(); 
  };

  const executeDelete = async () => {
    if (!blogToDelete) return;
    try {
      const response = await fetch(`/api/blogs/delete/${blogToDelete}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error("Failed to delete blog");
      fetchBlogs();
      setBlogToDelete(null);
      document.getElementById('delete_confirm_modal').close();
      showSuccess("Blog post deleted successfully!");
    } catch (err) {
      console.error("Failed to delete blog:", err);
      setBlogToDelete(null);
      document.getElementById('delete_confirm_modal').close();
    }
  }; 

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    document.getElementById('edit_blog_modal').showModal();
  };

  const handleEditBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    
    // Prevent sending an empty file if the user didn't select one
    const imageFile = formData.get('coverImage');
    if (imageFile && imageFile.size === 0) {
      formData.delete('coverImage');
    }

    try {
      const response = await fetch(`/api/blogs/update/${editingBlog._id || editingBlog.id}`, {
        method: 'PUT',
        body: formData
      });
      if (!response.ok) throw new Error("Failed to update blog");
      setEditingBlog(null);
      document.getElementById('edit_blog_modal').close();
      fetchBlogs();
      showSuccess("Blog post updated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pagination Logic
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Ensure current page is valid after deletions or itemsPerPage changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [blogs.length, currentPage, totalPages]);

  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Manage Blogs</h1>
          <p className="text-sm sm:text-base text-gray-500">Create, update, and manage your Study Blog and Success Stories.</p>
        </div>
        <button 
          className="btn border-none bg-brand-gradient shadow-elevation-soft hover:shadow-elevation-medium transition-shadow w-full sm:w-auto"
          onClick={() => document.getElementById('add_blog_modal').showModal()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
          Write New Post
        </button>
      </div>

      {/* Blogs Table */}
      <div className="card bg-base-content shadow-sm border border-base-200">
        <div className="overflow-x-auto w-full">
          <table className="table table-auto w-full border-t border-base-200/50">
            <thead>
              <tr className="bg-brand-gradient text-base-100 border-b border-base-200/50">
                <th className="whitespace-nowrap">Post Title</th>
                <th className="whitespace-nowrap">Category</th>
                <th className="whitespace-nowrap">Date</th>
                <th className="whitespace-nowrap">Status</th>
                <th className="text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-content/50">
              {currentBlogs.map((blog) => (
                <tr key={blog._id || blog.id} className="hover:bg-base-content/40 transition-colors duration-150 cursor-pointer" onClick={() => setViewingBlog(blog)}>
                  <td className="font-bold text-base-100 min-w-[200px]">{blog.title}</td>
                  <td className="whitespace-nowrap">
                    <span className="badge badge-ghost badge-sm font-medium">{blog.category || 'Article'}</span>
                  </td>
                  <td className="font-medium text-base-100/70 whitespace-nowrap">{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</td>
                  <td className="whitespace-nowrap">
                    <span className="badge badge-sm badge-success border-none text-white whitespace-nowrap">
                      {blog.status || 'Published'}
                    </span>
                  </td>
                  <td className="text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1 sm:gap-2">
                      <button className="btn btn-sm btn-ghost text-primary border border-base-300 hover:bg-white/35" onClick={() => openEditModal(blog)}>Edit</button>
                      <button className="btn btn-sm btn-ghost text-error border border-base-300" onClick={() => confirmDelete(blog._id || blog.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">No posts found. Start writing!</td>
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

      {/* Add Blog Modal */}
      <dialog id="add_blog_modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl rounded-2xl p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-4 top-4">✕</button>
          </form>
          <div className="p-6 border-b border-base-200 bg-brand-gradient">
            <h3 className="font-bold text-base-content text-2xl">Write New Blog Post</h3>
            <p className="text-sm text-white/50 mt-1">Draft a new success story, study tip, or philosophy post.</p>
          </div>
          
          <form onSubmit={handleAddBlog}>
            <div className="p-6 space-y-4 bg-base-content">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold text-base-100">Post Title</span></label>
              <input name="title" required type="text" placeholder="e.g. How to maintain focus during revisions" className="input input-bordered w-full focus:outline-primary bg-base-content border border-black/40" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-100">Category</span></label>
                <select name="category" className="select select-bordered w-full focus:outline-primary bg-base-content border border-black/40" defaultValue="Select Category">
                  <option disabled>Select Category</option>
                  <option>Study Tips</option>
                  <option>Success Story</option>
                  <option>Philosophy / Motivation</option>
                  <option>Announcements</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-100">Cover Image</span></label>
                <input type="file" name="coverImage" accept="image/*" className="file-input file-input-bordered w-full focus:outline-primary bg-base-content border border-black/40" />
                <label className="label">
                  <span className="label-text-alt text-base-100/60">Upload an image (Max resolution: <span className="font-bold">1200x630</span> pixels, up to 2MB).</span>
                </label>
              </div>
            </div>

            <div className="form-control  flex flex-col w-full">
              <label className="label"><span className="label-text font-bold text-base-100">Content</span></label>
              <textarea name="content" required className="textarea textarea-bordered h-54 focus:outline-primary border border-black/40 bg-base-content font-mono text-sm" placeholder="Write your content here..."></textarea>
            </div>
          </div>

          <div className="p-6 border-t border-base-200 bg-base-content flex justify-end gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('add_blog_modal').close()}>Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn border-none bg-brand-gradient shadow-elevation-soft">
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Publish Post"}
              </button>
          </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Edit Blog Modal */}
      <dialog id="edit_blog_modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl rounded-2xl p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-4 top-4" onClick={() => setEditingBlog(null)}>✕</button>
          </form>
          <div className="p-6 border-b border-base-200 bg-brand-gradient">
            <h3 className="font-bold text-2xl text-base-content">Edit Blog Post</h3>
            <p className="text-sm text-gray-100 mt-1">Update your success story, study tip, or philosophy post.</p>
          </div>
          
          <form onSubmit={handleEditBlog} key={editingBlog?._id || editingBlog?.id || 'edit-form'}>
            <div className="p-6 space-y-4 bg-base-content">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold text-base-100">Post Title</span></label>
              <input name="title" required type="text" defaultValue={editingBlog?.title} placeholder="e.g. How to maintain focus during revisions" className="input input-bordered w-full focus:outline-primary bg-base-content border border-black/40" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-100">Category</span></label>
                <select name="category" className="select select-bordered w-full focus:outline-primary bg-base-content border border-black/40" defaultValue={editingBlog?.category || "Select Category"}>
                  <option disabled>Select Category</option>
                  <option>Study Tips</option>
                  <option>Success Story</option>
                  <option>Philosophy / Motivation</option>
                  <option>Announcements</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-100">Cover Image</span></label>
                <input type="file" name="coverImage" accept="image/*" className="file-input file-input-bordered w-full focus:outline-primary bg-base-content border border-black/40" />
                <label className="label">
                  <span className="label-text-alt text-base-100/60">Upload a new image to replace the  current one.</span>
                </label>
              </div>
            </div>

            <div className="form-control w-full flex flex-col ">
              <label className="label"><span className="label-text font-bold text-base-100">Content</span></label>
              <textarea name="content" required defaultValue={editingBlog?.content} className="textarea textarea-bordered h-64 focus:outline-primary bg-base-content font-mono text-sm w-auto border border-black/40" placeholder="Write your content here..."></textarea>
            </div>
          </div>

          <div className="p-6 border-t border-base-200 bg-base-content flex justify-end gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => { setEditingBlog(null); document.getElementById('edit_blog_modal').close(); }}>Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn border-none bg-brand-gradient shadow-elevation-soft">
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Update Post"}
              </button>
          </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setEditingBlog(null)}>close</button>
        </form>
      </dialog>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_confirm_modal" className="modal">
        <div className="modal-box border-t-4 border-error bg-base-content">
          <h3 className="font-bold text-xl text-error">Confirm Deletion</h3>
          <p className="py-4 text-base-100/80">Are you sure you want to delete this blog post? This action cannot be undone.</p>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={() => { setBlogToDelete(null); document.getElementById('delete_confirm_modal').close(); }}>Cancel</button>
            <button type="button" className="btn btn-error text-white" onClick={executeDelete}>
              Yes, Delete Post
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setBlogToDelete(null)}>close</button>
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

      {/* View Blog Drawer */}
      <div className={`fixed inset-0 z-[60] overflow-hidden ${viewingBlog ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${viewingBlog ? 'opacity-100' : 'opacity-0'}`} onClick={() => setViewingBlog(null)}></div>
        <div className={`absolute inset-y-0 right-0 max-w-xl w-full bg-base-content shadow-2xl transform transition-transform duration-300 ease-in-out ${viewingBlog ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          {viewingBlog && (
            <>
              <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-content sticky top-0 z-10">
                <h2 className="text-2xl font-bold truncate pr-4">{viewingBlog.title}</h2>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setViewingBlog(null)}>✕</button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-base-50">
                {viewingBlog.coverImage && (
                  <img src={viewingBlog.coverImage} alt="Cover" className="w-full h-64 object-cover rounded-xl shadow-sm" 
                   loading='lazy'
                  />
                )}
                <div className="flex gap-2 mb-4">
                  <span className="badge badge-primary">{viewingBlog.category || 'Article'}</span>
                  <span className="badge badge-outline">{new Date(viewingBlog.createdAt || Date.now()).toLocaleDateString()}</span>
                  <span className="badge badge-success text-white">{viewingBlog.status || 'Published'}</span>
                </div>
                <div className="prose max-w-none font-mono text-sm whitespace-pre-wrap text-base-100/80">
                  {viewingBlog.content}
                </div>
              </div>
              <div className="p-6 border-t border-base-200 bg-base-content flex justify-end gap-2">
                <button className="btn btn-outline text-primary" onClick={() => { setViewingBlog(null); openEditModal(viewingBlog); }}>Edit Post</button>
                <button className="btn btn-outline text-error" onClick={() => { setViewingBlog(null); confirmDelete(viewingBlog._id || viewingBlog.id); }}>Delete</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;