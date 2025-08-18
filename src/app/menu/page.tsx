import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuItemCard from "@/components/MenuItemCard";
import { Metadata } from "next";
import { getAllMenuItems } from "@/lib/mongodb";
import type { MenuItem } from "@/lib/types";
import { unstable_noStore as noStore } from 'next/cache';


export const metadata: Metadata = {
    title: "Our Menu - HubSafari",
    description: "Explore our delicious selection of appetizers, main courses, desserts, and drinks.",
};

async function getMenuItems() {
    noStore();
    try {
        const items = await getAllMenuItems();
        return items.map(item => ({
            ...item,
            id: item._id!.toString(),
        }));
    } catch (error) {
        console.error("Failed to fetch menu items:", error);
        return [];
    }
}


export default async function MenuPage() {
    const menuItems = await getMenuItems();
    const categories: ('Appetizers' | 'Main Courses' | 'Desserts' | 'Drinks')[] = ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'];
    
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Menu</h1>
                <p className="mt-2 text-md text-muted-foreground">Crafted with passion, served with pride.</p>
            </div>
            
            <Tabs defaultValue="Appetizers" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    {categories.map(category => (
                         <TabsTrigger key={category} value={category} className="py-2 text-sm">{category}</TabsTrigger>
                    ))}
                </TabsList>
                {categories.map(category => (
                     <TabsContent key={category} value={category}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-6">
                            {menuItems.filter(item => item.category === category).map(item => (
                                <MenuItemCard key={item.id} item={item} />
                            ))}
                        </div>
                     </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
