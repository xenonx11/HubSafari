import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ClipboardList, Package } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Admin Dashboard - TasteBud",
    description: "Manage your restaurant menu and orders.",
};

export default function AdminDashboardPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Admin Dashboard</h1>
                <p className="mt-2 text-md text-muted-foreground">Manage your restaurant from here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/menu">
                    <Card className="hover:bg-secondary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <ClipboardList className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Manage Menu</CardTitle>
                                <CardDescription>Add, edit, or remove menu items.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
                <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
                     <CardHeader className="flex flex-row items-center gap-4">
                        <Package className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>View Orders</CardTitle>
                            <CardDescription>See incoming and past orders.</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}