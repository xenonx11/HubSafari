
import { getHeroImage, getAboutPageImages } from '@/lib/mongodb';
import SiteSettingsClientPage from './SiteSettingsClientPage';
import { unstable_noStore as noStore } from 'next/cache';

export default async function SiteSettingsPage() {
    noStore();
    
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
