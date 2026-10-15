import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Ticker from '../components/Ticker';
import About from '../components/About';
import Programs from '../components/Program';
import Donate from '../components/Donate';
import Gallery from '../components/Gallery';
import Events from '../components/Event';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import WhatWeDo from '../components/WhatWeDo';
import CommunityGallery from '../components/CommunityGallery';
import CommunityVid from '../components/CommunityVid';
import { useUipHomePageLive } from '../hooks/usePayloadLive';

export default function Home() {
  const { data } = useUipHomePageLive();

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden text-[#1e1e2e]">
      <Navbar />
      <main>
        <Hero data={data} />
        <Stats data={data} />
        <Ticker data={data} />
        <WhatWeDo data={data} />
        <About data={data} />
        <CommunityVid data={data} />
        <Partners data={data} />
        {/* <Programs /> */}
        <Donate data={data} />
        {/* <Gallery /> */}
        <Events />
        {/* <Stories /> */}
      </main>
      <Footer />
    </div>
  );
}
