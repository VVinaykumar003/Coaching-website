import Hero from "@/app/(user)/components/home/Hero";
import NewCardSection from "@/app/(user)/components/home/NewCardSection";
import YoutubePromo from "@/app/(user)/components/home/YoutubePromo";
import BatchEnrollment from "@/app/(user)/components/home/BatchEnrollment";
import Cards from "@/app/(user)/components/home/Cards";
import LeadMagnet from "@/app/(user)/components/home/LeadMagnet";
import GeoTestimonials from "@/app/(user)/components/home/GeoTestimonials";

export default function Home() {
  return (
    <div className="">
      <section>
        <Hero />
      </section>
      <section>
        <NewCardSection />
      </section>
      <section>
        <Cards />
      </section>
      <section>
        <LeadMagnet />
      </section>

      <section>
        <BatchEnrollment />
      </section>
      <section>
        <GeoTestimonials />
      </section>
      <section className="container mx-auto px-4 max-w-7xl">
        <YoutubePromo />
      </section>
    </div>
  );
}
