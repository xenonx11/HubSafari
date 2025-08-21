
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MenuItemCard from "@/components/MenuItemCard";
import { Star, ChefHat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedMenuItems, getHeroImage } from "@/lib/mongodb";
import { unstable_noStore as noStore } from 'next/cache';
import type { MenuItem } from "@/lib/types";

async function getFeaturedItems(): Promise<MenuItem[]> {
    noStore(); // Ensures the data is fetched dynamically on every request
    try {
        const items = await getFeaturedMenuItems();
        // Manually map to a plain object to avoid serialization errors
        return items.map(item => ({
            id: item._id.toString(),
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image: item.image,
            featured: item.featured || false,
        }));
    } catch (error) {
        console.error("Failed to fetch featured menu items:", error);
        return []; // Return an empty array as a fallback
    }
}

async function getHeroImageSrc(): Promise<string> {
    noStore();
    try {
        const heroImage = await getHeroImage();
        return heroImage || "https://placehold.co/1920x1080.png";
    } catch (error) {
        console.error("Failed to fetch hero image:", error);
        return "https://placehold.co/1920x1080.png";
    }
}


export default async function Home() {
  const featuredItems = await getFeaturedItems();
  const heroImageSrc = await getHeroImageSrc();

  const testimonials = [
    { name: "Sarah J.", quote: "The best Italian food I've had outside of Italy! The atmosphere is cozy and the service is impeccable." },
    { name: "Mike R.", quote: "A true gem. Every dish is crafted with love. The Spaghetti Carbonara is to die for. Highly recommend!" },
    { name: "Chen W.", quote: "TasteBud has become our go-to for special occasions. The food is consistently amazing and the staff make you feel like family." },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-screen w-full flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src={heroImageSrc} layout="fill" objectFit="cover" alt="Ambiance of the restaurant" className="z-0" data-ai-hint="restaurant ambiance" priority />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight text-shadow-lg">
            Savor the Moment
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-md md:text-lg font-body text-shadow">
            Experience authentic flavors, crafted with passion and served with love.
          </p>
          <Button asChild size="lg" className="mt-6 bg-primary hover:bg-accent text-primary-foreground font-bold text-base py-4 px-8 rounded-full transition-transform duration-300 hover:scale-105">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </section>

      {/* Featured Items Section */}
      <section id="featured" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Dishes</h2>
            <p className="mt-2 text-md text-muted-foreground">Handpicked by our chef, loved by our guests.</p>
          </div>
          {featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
             <div className="text-center text-muted-foreground">
                <p>Could not load featured dishes. Please check the connection or try again later.</p>
             </div>
          )}
        </div>
      </section>
      
      <Separator className="my-0"/>

      {/* About Us Snippet Section */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
                <Image src="https://placehold.co/800x600.png" width={800} height={600} alt="Our Restaurant" className="rounded-lg shadow-xl" data-ai-hint="restaurant interior" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <ChefHat className="h-10 w-10 text-primary mx-auto md:mx-0 mb-3" />
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Culinary Story</h2>
                <p className="mt-3 text-md text-muted-foreground">
                    From a small family kitchen to a beloved neighborhood eatery, HubSafari is the realization of a lifelong dream. We believe in the power of food to bring people together, using only the freshest local ingredients to create dishes that are both comforting and exciting.
                </p>
                <Button asChild variant="link" className="mt-4 text-primary text-base px-0">
                    <Link href="/about">Learn More About Us &rarr;</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">From Our Guests</h2>
            <p className="mt-2 text-md text-muted-foreground">Don't just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-secondary/30 border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-2 text-primary-foreground">
                      <Star className="text-accent h-5 w-5" fill="currentColor"/>
                    </div>
                    <CardTitle className="font-headline text-xl">{testimonial.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
