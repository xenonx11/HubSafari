
import { getHeroImage, getAboutPageImages } from '@/lib/mongodb';
import SiteSettingsClientPage from './SiteSettingsClientPage';

export default async function SiteSettingsPage() {
    
    let heroImage = null;
    let aboutImages = {};

    try {
        // Fetch all settings concurrently for better performance
        const [heroImg, aboutImgs] = await Promise.all([
            getHeroImage(),
            getAboutPageImages()
        ]);
        heroImage = heroImg;
        aboutImages = aboutImgs;
    } catch (error) {
        console.error("Failed to fetch site settings:", error);
    }

    return <SiteSettingsClientPage currentHeroImage={heroImage} currentAboutImages={aboutImages} />;
}
