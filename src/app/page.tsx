import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { menuItems } from "@/data/menu";
import MenuItemCard from "@/components/MenuItemCard";
import { Star, ChefHat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredItems = menuItems.filter(item => item.featured).slice(0, 4);

  const testimonials = [
    { name: "Sarah J.", quote: "The best Italian food I've had outside of Italy! The atmosphere is cozy and the service is impeccable." },
    { name: "Mike R.", quote: "A true gem. Every dish is crafted with love. The Spaghetti Carbonara is to die for. Highly recommend!" },
    { name: "Chen W.", quote: "TasteBud has become our go-to for special occasions. The food is consistently amazing and the staff make you feel like family." },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src="https://placehold.co/1920x1080.png" layout="fill" objectFit="cover" alt="Ambiance of the restaurant" className="z-0" data-ai-hint="restaurant ambiance" />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline tracking-tight text-shadow-lg">
            Savor the Moment
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-body text-shadow">
            Experience authentic flavors, crafted with passion and served with love.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-accent text-primary-foreground font-bold text-lg py-6 px-10 rounded-full transition-transform duration-300 hover:scale-105">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </section>

      {/* Featured Items Section */}
      <section id="featured" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Featured Dishes</h2>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked by our chef, loved by our guests.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      
      <Separator className="my-0"/>

      {/* About Us Snippet Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <Image src="https://placehold.co/800x600.png" width={800} height={600} alt="Our Restaurant" className="rounded-lg shadow-xl" data-ai-hint="restaurant interior" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <ChefHat className="h-12 w-12 text-primary mx-auto md:mx-0 mb-4" />
                <h2 className="text-4xl md:text-5xl font-bold font-headline">Our Culinary Story</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    From a small family kitchen to a beloved neighborhood eatery, TasteBud is the realization of a lifelong dream. We believe in the power of food to bring people together, using only the freshest local ingredients to create dishes that are both comforting and exciting.
                </p>
                <Button asChild variant="link" className="mt-6 text-primary text-lg px-0">
                    <Link href="/about">Learn More About Us &rarr;</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">From Our Guests</h2>
            <p className="mt-2 text-lg text-muted-foreground">Don't just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-secondary/30 border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary rounded-full p-2 text-primary-foreground">
                      <Star className="text-accent" fill="currentColor"/>
                    </div>
                    <CardTitle className="font-headline text-2xl">{testimonial.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
