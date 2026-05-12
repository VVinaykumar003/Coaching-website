"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 1. Perform your authentication logic here (e.g., fetch API / check credentials)
    // const response = await fetch('/api/login', { ... });
    
    // 2. On successful login, redirect the user to the Dashboard
    // We use a timeout here just to simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin'); // This lands them on the dashboard
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form onSubmit={handleLogin} className="card w-full max-w-sm bg-base-100 shadow-xl p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center text-base-content">Admin Login</h2>
        <input type="email" placeholder="Email" required className="input input-bordered w-full" />
        <input type="password" placeholder="Password" required className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner"></span> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;