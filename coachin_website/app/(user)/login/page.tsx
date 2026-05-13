"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { adminAPI } from '../api/api';

const Login = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useRouter();
  
  // Forgot Password States
  const [newPassword, setNewPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminId, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        navigate.push("/admin/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateMessage(null);

    try {
      const res = await fetch("/api/admin/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update password.');
      
      setUpdateMessage(data.message || 'Password updated successfully!');
      setNewPassword('');
    } catch (err: any) {
      setUpdateError(err.message || 'Failed to update password.');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden font-sans p-4">
      
      {/* Ambient Background Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-secondary/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel shadow-level-3 rounded-[24px] p-8 md:p-10 border border-white/60">
          
          {/* Header */}
          <div className="text-center mb-8">
            <img src="/kunal_logo_ee1.png" alt="Eunoia Education" className="h-20 mx-auto mb-6 drop-shadow-sm" />
            <h1 className="text-3xl font-extrabold text-base-100 tracking-tight">Admin Portal</h1>
            <p className="text-sm text-base-100/70 mt-2">Log in to manage courses, blogs, and students securely.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="alert alert-error p-3 rounded-lg text-sm mb-2">
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-control w-full">
              <label className="label py-1.5">
                <span className="label-text font-bold text-base-100/80">Admin ID</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter Admin ID" 
                className="input input-bordered input-bg-brand-gradient w-full bg-white  focus:outline-primary transition-colors" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-control w-full">
              <label className="label py-1.5">
                <span className="label-text font-bold text-base-100/80">Password</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter Password" 
                  className="input input-bordered input-bg-brand-gradient w-full bg-white  focus:outline-primary transition-colors pr-10" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/60 hover:text-base-content" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              </div>
              
              <div className="flex justify-end mt-2">
                <label 
                  htmlFor="forgot_password_modal" 
                  className="text-xs font-bold text-primary hover:text-secondary cursor-pointer transition-colors" 
                >
                  Forgot password?
                </label>
              </div>
            </div>
            
            <button type="submit" className="btn border-none bg-brand-gradient text-white w-full shadow-brand-glow hover:shadow-lg hover:-translate-y-px transition-all duration-300 mt-4" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Secure Login'}
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <input type="checkbox" id="forgot_password_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box glass-panel shadow-level-3 rounded-[24px] border border-white/60 p-8">
          <h3 className="text-2xl font-bold mb-1 text-base-content">Reset Password</h3>
          <p className="text-sm text-base-content/70 mb-4">Enter your new secure password below.</p>
          <form onSubmit={handleUpdatePassword} className="space-y-4 py-2">
            {updateMessage && (
              <div className="alert alert-success p-3 rounded-lg text-sm">
                <span>{updateMessage}</span>
              </div>
            )}
            {updateError && (
              <div className="alert alert-error p-3 rounded-lg text-sm">
                <span>{updateError}</span>
              </div>
            )}
            
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-base-content/80">New Password</span>
              </label>
              <input 
                type="password" 
                placeholder="Enter new password" 
                className="input input-bordered w-full bg-white/50 focus:bg-white focus:outline-primary transition-colors" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
              />
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn border-none bg-brand-gradient shadow-elevation-soft transition-shadow" disabled={updateLoading}>
                {updateLoading ? <span className="loading loading-spinner"></span> : 'Update Password'}
              </button>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="forgot_password_modal" className="btn btn-ghost" onClick={() => { setUpdateMessage(null); setUpdateError(null); setNewPassword(''); }}>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;