
import { getAboutPageImages } from '@/lib/mongodb';
import AboutSettingsClientPage from './AboutSettingsClientPage';

export default async function AboutSettingsPage() {
    
    let aboutImages = {};
    try {
        aboutImages = await getAboutPageImages();
    } catch (error) {
        console.error("Failed to fetch about page settings:", error);
    }

    return <AboutSettingsClientPage currentImages={aboutImages} />;
}
