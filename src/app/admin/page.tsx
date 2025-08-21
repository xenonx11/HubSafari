
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ClipboardList, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem('tastebud-admin-session');
        if (session !== 'true') {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('tastebud-admin-session');
        router.push('/admin/login');
    };
    
    if (!isAuthenticated) {
        return (
             <div className="container mx-auto px-4 py-12">
                <div className="mb-10">
                    <Skeleton className="h-12 w-1/2" />
                    <Skeleton className="h-4 w-1/3 mt-4" />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                 </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Admin Dashboard</h1>
                    <p className="mt-2 text-md text-muted-foreground">Manage your restaurant from here.</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                <Link href="/admin/menu">
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
                <Link href="/admin/settings">
                    <Card className="hover:bg-secondary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Settings className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Site Settings</CardTitle>
                                <CardDescription>Update hero image and other settings.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/admin/settings/about">
                     <Card className="hover:bg-secondary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Users className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>About Us Settings</CardTitle>
                                <CardDescription>Update images on the About Us page.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
