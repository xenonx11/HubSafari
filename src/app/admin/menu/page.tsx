
import { getAllMenuItems } from '@/lib/mongodb';
import type { MenuItem } from '@/lib/types';
import AdminMenuClientPage from './AdminMenuClientPage';

// This is now a React Server Component (RSC) responsible for data fetching.
export default async function AdminMenuPage() {
    // Data is fetched dynamically by default when not explicitly cached.
    // Revalidation is handled by server actions, ensuring fresh data after edits.
    
    let menuItems: MenuItem[] = [];
    try {
        const items = await getAllMenuItems();
        // Manually map to a plain object to avoid serialization errors
        menuItems = items.map(item => ({
            id: item._id.toString(),
            name: item.name,
            description: item.description,
            price: item.price,
            priceHalf: item.priceHalf,
            category: item.category,
            image: item.image,
            featured: item.featured || false,
        }));
    } catch (error) {
        console.error("Failed to fetch menu items for admin page:", error);
        // We can pass an empty array and let the client component handle the error display
    }

    // We pass the fetched data as a prop to the client component.
    return <AdminMenuClientPage initialMenuItems={menuItems} />;
}
