import Header from "../(user)/components/layouts/Header";
import Footer from "../(user)/components/layouts/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">

      <Header />

      <main>
        {children}
      </main>

      <Footer />

    </div>
  );
}