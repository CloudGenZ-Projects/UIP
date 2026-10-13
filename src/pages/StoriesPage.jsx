import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StoriesHero from '../components/Story/StoriesHero';
import CommunityStories from '../components/Story/CommunityStories';
import GlobalNews from '../components/Story/GlobalNews';
import ShareStoryForm from '../components/Story/ShareStoryForm';
import StoriesCTA from '../components/Story/StoriesCTA';
import { useUipStoriesPageLive } from '../hooks/usePayloadLive';

export default function StoriesPage() {
  const { data } = useUipStoriesPageLive();

  return (
    <div className="min-h-screen bg-white font-sans text-pride-navy">
      <Navbar />
      <main>
        <StoriesHero data={data} />
        <CommunityStories data={data} />
        <GlobalNews />
        <ShareStoryForm data={data} />
        <StoriesCTA data={data} />
      </main>
      <Footer />
    </div>
  );
}
