
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Utensils } from 'lucide-react';
import { RESTAURANT_NAME } from '@/lib/constants';

// In a real app, this password would not be stored in the frontend.
const ADMIN_PASSWORD = "password";

export default function AdminLoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network request
        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                localStorage.setItem('tastebud-admin-session', 'true');
                toast({
                    title: "Success!",
                    description: "You are now logged in.",
                });
                router.push('/admin');
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "The password you entered is incorrect.",
                });
                setIsLoading(false);
            }
        }, 500);
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-100/50 dark:bg-transparent px-4">
            <Card className="w-full max-w-sm">
                <form onSubmit={handleLogin}>
                    <CardHeader className="text-center">
                         <div className="flex justify-center items-center gap-2 mb-4">
                            <Utensils className="h-8 w-8 text-primary" />
                            <span className="text-2xl font-bold font-headline text-primary">{RESTAURANT_NAME}</span>
                        </div>
                        <CardTitle className="text-2xl">Admin Login</CardTitle>
                        <CardDescription>Enter the password to access the dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                placeholder="••••••••"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
