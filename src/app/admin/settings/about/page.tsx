
import { getAboutPageImages } from '@/lib/mongodb';
import AboutSettingsClientPage from './AboutSettingsClientPage';
import { unstable_noStore as noStore } from 'next/cache';

export default async function AboutSettingsPage() {
    noStore();
    
    let aboutImages = {};
    try {
        aboutImages = await getAboutPageImages();
    } catch (error) {
        console.error("Failed to fetch about page settings:", error);
    }

    return <AboutSettingsClientPage currentImages={aboutImages} />;
}
