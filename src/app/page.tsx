import EssentialTabs from "@/components/EssentialTabs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RecentlyInRotation from "@/components/spotify/recently-in-rotation";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EssentialTabs />
        <RecentlyInRotation />
      </main>
      <Footer />
    </>
  );
}
