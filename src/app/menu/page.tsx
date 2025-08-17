import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { menuItems } from "@/data/menu";
import MenuItemCard from "@/components/MenuItemCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Menu - TasteBud",
    description: "Explore our delicious selection of appetizers, main courses, desserts, and drinks.",
};


export default function MenuPage() {
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
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
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
