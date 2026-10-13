import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // <-- Import useLocation
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VolunteerHero from '../components/volunteer/VolunteerHero';
import Partnerships from '../components/volunteer/Partnerships'; 
import VolunteerCTA from '../components/volunteer/VolunteerCTA';
import PartnershipHero from '../components/volunteer/PartnershipHero';
import VolunteerRoles from '../components/volunteer/VolunteerRoles';
import TrainingSupport from '../components/volunteer/TrainingSupport';
import { useUipWaysToGivePageLive } from '../hooks/usePayloadLive';



export default function PartnershipPage() {
    const { data } = useUipWaysToGivePageLive();
    const location = useLocation(); // <-- Add this

    // Add this useEffect block
    useEffect(() => {
        if (location.hash) {
            // Remove the '#' to get the exact ID
            const id = location.hash.replace('#', '');
            
            // Wait slightly for Framer Motion to render elements into the DOM
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    // Scroll to the element smoothly
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300); // 300ms is usually the sweet spot for animations to finish
        } else {
            // Scroll to top if there is no hash
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-white font-sans text-[#3A3556]">
            <Navbar />

            <main id="partnerships" className="relative">
                <PartnershipHero data={data} />
                <TrainingSupport />
                {/* Ensure WaysToGiveOptions or the components with the IDs are rendered here */}
            </main>

            <Footer />
        </div>
    );
}