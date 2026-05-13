import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import StickyContact from "./components/layouts/StickyContact";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">

      <Header />

      <main>
        {children}
      </main>
      <StickyContact />

      <Footer />

    </div>
  );
}