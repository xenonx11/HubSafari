import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChefHat, Heart, MapPin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Us - TasteBud",
    description: "Learn about the story, mission, and team behind TasteBud.",
};

export default function AboutPage() {
    return (
        <div className="bg-secondary/30">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold font-headline">Our Story</h1>
                    <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                        A journey of flavor, family, and the love for food that brings us all together.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-lg text-foreground/80">
                        <p>
                            TasteBud began not in a fancy kitchen, but in the heart of our family home. It was born from generations of shared recipes, Sunday feasts, and the belief that a good meal is more than just food—it's a memory in the making. Our founder, Chef Leo, dreamed of sharing his grandmother's cherished recipes with the world, creating a place where every guest feels like part of the family.
                        </p>
                        <p>
                            We opened our doors in 2015 with a simple mission: to serve authentic, high-quality dishes made from locally-sourced ingredients. Every plate that leaves our kitchen is a testament to this commitment, a blend of traditional techniques and a dash of modern creativity.
                        </p>
                    </div>
                    <div>
                        <Image src="https://placehold.co/800x600.png" width={800} height={600} alt="Chef Leo" className="rounded-lg shadow-xl" data-ai-hint="chef portrait"/>
                    </div>
                </div>

                <Separator className="my-16 md:my-24" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center">
                        <Heart className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-2xl font-headline font-semibold">Our Mission</h3>
                        <p className="mt-2 text-muted-foreground">To create a warm, inviting space where guests can enjoy exceptional food, create lasting memories, and feel a genuine sense of community.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <ChefHat className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-2xl font-headline font-semibold">Our Philosophy</h3>
                        <p className="mt-2 text-muted-foreground">Fresh, local, and seasonal. We believe the best flavors come from the best ingredients, sourced from farmers and purveyors we know and trust.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <MapPin className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-2xl font-headline font-semibold">Our Home</h3>
                        <p className="mt-2 text-muted-foreground">Nestled in the heart of the city, we are proud to be a vibrant part of our local neighborhood, serving our community one delicious plate at a time.</p>
                    </div>
                </div>
                
                <Separator className="my-16 md:my-24" />

                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline">Meet the Team</h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                        The heart and soul of TasteBud.
                    </p>
                    <div className="mt-12 flex justify-center gap-8 md:gap-16 flex-wrap">
                        <div className="flex flex-col items-center">
                            <Avatar className="h-32 w-32 mb-4 border-4 border-primary">
                                <AvatarImage src="https://placehold.co/200x200.png" alt="Chef Leo" data-ai-hint="male chef"/>
                                <AvatarFallback>CL</AvatarFallback>
                            </Avatar>
                            <h4 className="text-xl font-headline font-semibold">Chef Leo</h4>
                            <p className="text-muted-foreground">Founder & Head Chef</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Avatar className="h-32 w-32 mb-4 border-4 border-primary">
                                <AvatarImage src="https://placehold.co/200x200.png" alt="Maria" data-ai-hint="female manager"/>
                                <AvatarFallback>M</AvatarFallback>
                            </Avatar>
                            <h4 className="text-xl font-headline font-semibold">Maria</h4>
                            <p className="text-muted-foreground">General Manager</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Avatar className="h-32 w-32 mb-4 border-4 border-primary">
                                <AvatarImage src="https://placehold.co/200x200.png" alt="Sofia" data-ai-hint="pastry chef"/>
                                <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                            <h4 className="text-xl font-headline font-semibold">Sofia</h4>
                            <p className="text-muted-foreground">Pastry Chef</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
