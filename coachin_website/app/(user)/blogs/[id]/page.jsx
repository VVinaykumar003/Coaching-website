"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';


const BlogPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetch("/api/blogs/get-all").then(res => res.json());
        setBlogPosts(Array.isArray(data) ? data : data.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  // Scroll to top whenever the URL ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const selectedFeaturedPost = id ? blogPosts.find(p => (p._id === id || p.id === id)) : null;

  return (
    <main className="pt-10 lg:pt-8 pb-16 min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        
        {loading && <div className="text-center py-8"><span className="loading loading-spinner loading-lg text-primary"></span></div>}

        {!loading && selectedFeaturedPost ? (
          <div className="flex flex-col lg:flex-row gap-8 text-left mb-8">
            {/* Full Article View */}
            <article className="lg:w-2/3">
              <button 
                className="btn btn-sm btn-ghost mb-6 pl-0 hover:bg-transparent hover:underline text-base-content/70"
                onClick={() => router.push('/blogs')}
              >
                &larr; Back to all posts
              </button>
              <img 
                src={selectedFeaturedPost.coverImage || "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1200&auto=format&fit=crop"} 
                alt={selectedFeaturedPost.title} 
                className="w-full rounded-3xl mb-8 object-cover max-h-[500px] shadow-sm" 
                 loading='lazy'
              />
              <div className="flex gap-3 items-center mb-6">
                <span className="badge badge-primary px-3 py-3 text-xs uppercase tracking-wider font-semibold  text-white">
                  {selectedFeaturedPost.category || 'Article'}
                </span>
                <span className=" text-base-content font-medium">
                  {new Date(selectedFeaturedPost.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold  text-base-content leading-tight mb-8">
                {selectedFeaturedPost.title}
              </h2>
              <div className="prose max-w-none  text-base-content whitespace-pre-wrap leading-relaxed text-lg">
                {selectedFeaturedPost.content || "No content available."}
              </div>
            </article>

            {/* Sidebar with other posts */}
            <aside className="lg:w-1/3 flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-base-content border-b border-base-200 pb-4 mb-2">Read More</h3>
              <div className="flex flex-col gap-4 custom-scrollbar overflow-y-auto max-h-[800px] pr-2">
                {blogPosts.filter(p => (p._id || p.id) !== (selectedFeaturedPost._id || selectedFeaturedPost.id)).map(post => (
                  <div 
                    key={post._id || post.id} 
                    className="card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex-row overflow-hidden h-28 border border-base-200" 
                    onClick={() => router.push(`/blogs/${post._id || post.id}`)}
                  >
                    <img 
                      src={post.coverImage || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop"} 
                      className="w-1/3 object-cover" 
                      alt={post.title}
                       loading='lazy'
                    />
                    <div className="p-4 w-2/3 flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{post.category || 'Article'}</span>
                      <h4 className="font-bold text-sm leading-snug line-clamp-2">{post.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        ) : !loading && !selectedFeaturedPost ? (
          <div className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
            <p className="text-base-content/60 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <button className="btn btn-primary" onClick={() => router.push('/blogs')}>Go Back to Blog</button>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default BlogPage;
