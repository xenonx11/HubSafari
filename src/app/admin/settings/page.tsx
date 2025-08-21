import { getHeroImage } from '@/lib/mongodb';
import SiteSettingsClientPage from './SiteSettingsClientPage';
import { unstable_noStore as noStore } from 'next/cache';

export default async function SiteSettingsPage() {
    noStore();
    
    let heroImage = null;
    try {
        heroImage = await getHeroImage();
    } catch (error) {
        console.error("Failed to fetch site settings:", error);
    }

    return <SiteSettingsClientPage currentHeroImage={heroImage} />;
}
