// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

// import AdminSidebar from "../admin/component/adminsidebar";
// import AdminHeader from "../admin/component/adminheader";

// export default function AdminLayout({ children }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check for login token in localStorage
//     const token = localStorage.getItem("adminToken");
    
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//       // Redirect to login if trying to access admin pages without a token
//       if (pathname !== "/login") {
//         router.push("/login");
//       }
//     }
//     setIsLoading(false);
//   }, [pathname, router]);

//   // Don't render the sidebar/header on the login page itself
//   const isLoginPage = pathname === "/login";

//   if (isLoading) {
//     return <div className="flex h-screen w-full items-center justify-center bg-base-200">Loading...</div>;
//   }

//   if (isLoginPage) {
//     return <main className="min-h-screen bg-base-200">{children}</main>;
//   }

//   return (
//     <div className="flex h-screen w-full bg-base-200 text-base-content overflow-hidden">
//       {isAuthenticated && <AdminSidebar />}
//       <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
//         {isAuthenticated && <AdminHeader />}
//         <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import AdminSidebar from "./component/adminsidebar";
import AdminHeader from "./component/adminheader";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-base-content overflow-hidden">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* ADMIN HEADER */}
        <AdminHeader />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}