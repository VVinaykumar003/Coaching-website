"use client";

import React, { useState, useEffect } from "react";

interface Blog {
  _id?: string;
  id?: string;
  title: string;
  content: string;
  category?: string;
  coverImage?: string;
  createdAt?: string;
  status?: string;
}

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [editingBlog, setEditingBlog] =
    useState<Blog | null>(null);

  const [blogToDelete, setBlogToDelete] =
    useState<string | null>(null);

  const [viewingBlog, setViewingBlog] =
    useState<Blog | null>(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage] = useState(10);

  const openModal = (modalId: string) => {
    (
      document.getElementById(
        modalId
      ) as HTMLDialogElement
    )?.showModal();
  };

  const closeModal = (modalId: string) => {
    (
      document.getElementById(
        modalId
      ) as HTMLDialogElement
    )?.close();
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);

    openModal("success_modal");
  };

  const fetchBlogs = async () => {
    try {
      const data = await fetch(
        "/api/blogs/get-all"
      ).then((res) => res.json());

      setBlogs(
        Array.isArray(data)
          ? data
          : data.blogs || []
      );
    } catch (err) {
      console.error(
        "Failed to fetch blogs:",
        err
      );
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // =========================
  // ADD BLOG
  // =========================

  const handleAddBlog = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(
      e.currentTarget
    );

    const imageFile =
      formData.get("coverImage");

    if (
      imageFile instanceof File &&
      imageFile.size === 0
    ) {
      formData.delete("coverImage");
    }

    try {
      const response = await fetch(
        "/api/blogs/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to add blog"
        );
      }

      e.currentTarget.reset();

      closeModal("add_blog_modal");

      fetchBlogs();

      showSuccess(
        "Blog post published successfully!"
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // DELETE BLOG
  // =========================

  const confirmDelete = (id: string) => {
    setBlogToDelete(id);

    openModal("delete_confirm_modal");
  };

  const executeDelete = async () => {
    if (!blogToDelete) return;

    try {
      const response = await fetch(
        `/api/blogs/delete/${blogToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete blog"
        );
      }

      fetchBlogs();

      setBlogToDelete(null);

      closeModal(
        "delete_confirm_modal"
      );

      showSuccess(
        "Blog post deleted successfully!"
      );
    } catch (err) {
      console.error(
        "Failed to delete blog:",
        err
      );

      setBlogToDelete(null);

      closeModal(
        "delete_confirm_modal"
      );
    }
  };

  // =========================
  // EDIT BLOG
  // =========================

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);

    openModal("edit_blog_modal");
  };

  const handleEditBlog = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editingBlog) return;

    setIsSubmitting(true);

    const formData = new FormData(
      e.currentTarget
    );

    const imageFile =
      formData.get("coverImage");

    if (
      imageFile instanceof File &&
      imageFile.size === 0
    ) {
      formData.delete("coverImage");
    }

    const blogId =
      editingBlog._id ||
      editingBlog.id;

    try {
      const response = await fetch(
        `/api/blogs/update/${blogId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update blog"
        );
      }

      setEditingBlog(null);

      closeModal("edit_blog_modal");

      fetchBlogs();

      showSuccess(
        "Blog post updated successfully!"
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // PAGINATION
  // =========================

  const indexOfLastBlog =
    currentPage * itemsPerPage;

  const indexOfFirstBlog =
    indexOfLastBlog - itemsPerPage;

  const currentBlogs = blogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  const totalPages = Math.ceil(
    blogs.length / itemsPerPage
  );

  useEffect(() => {
    if (
      currentPage > totalPages &&
      totalPages > 0
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    blogs.length,
    currentPage,
    totalPages,
  ]);

  return (
    <div className="font-sans p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Manage Blogs
          </h1>

          <p className="text-gray-500">
            Create and manage blogs
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            openModal("add_blog_modal")
          }
        >
          Add Blog
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {currentBlogs.map((blog) => (
              <tr
                key={
                  blog._id || blog.id
                }
              >
                <td>{blog.title}</td>

                <td>
                  {blog.category ||
                    "Article"}
                </td>

                <td>
                  {new Date(
                    blog.createdAt ||
                      Date.now()
                  ).toLocaleDateString()}
                </td>

                <td>
                  <span className="badge badge-success">
                    {blog.status ||
                      "Published"}
                  </span>
                </td>

                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        openEditModal(blog)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() =>
                        confirmDelete(
                          blog._id ||
                            blog.id ||
                            ""
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {blogs.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8"
                >
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlogs;