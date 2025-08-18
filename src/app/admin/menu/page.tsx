
'use client';

import { useState, useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { MenuItem } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import MenuItemForm from './MenuItemForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { getAllMenuItems } from '@/lib/mongodb';
import { createMenuItemAction, updateMenuItemAction, deleteMenuItemAction } from '../actions';
import { Skeleton } from '@/components/ui/skeleton';


// Since this is a client component, we fetch initial data via a server function prop
// or an effect, but actions will be handled by server actions.
async function fetchMenuItems(): Promise<MenuItem[]> {
    try {
        const items = await getAllMenuItems();
        return items.map(item => ({
            ...item,
            id: item._id!.toString(), // Convert ObjectId to string
        }));
    } catch (error) {
        console.error("Failed to fetch menu items for admin page:", error);
        return [];
    }
}


export default function AdminMenuPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    useEffect(() => {
        const session = localStorage.getItem('tastebud-admin-session');
        if (session !== 'true') {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
            fetchMenuItems().then(items => {
                setMenuItems(items);
                setIsLoading(false);
            });
        }
    }, [router]);

    const refreshMenuItems = () => {
        setIsLoading(true);
        fetchMenuItems().then(items => {
            setMenuItems(items);
            setIsLoading(false);
        });
    }

    const handleAddNew = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: MenuItem) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (itemId: string) => {
        startTransition(async () => {
            const result = await deleteMenuItemAction(itemId);
            if (result.success) {
                toast({ title: "Success", description: "Menu item has been deleted." });
                refreshMenuItems();
            } else {
                toast({ variant: 'destructive', title: "Error", description: result.message });
            }
        });
    };

    const handleFormSubmit = async (itemData: Omit<MenuItem, 'id' | '_id'>, id?: string) => {
        startTransition(async () => {
            const action = id ? updateMenuItemAction(id, itemData) : createMenuItemAction(itemData);
            const result = await action;

            if (result.success) {
                toast({ title: "Success", description: result.message });
                refreshMenuItems();
            } else {
                toast({ variant: 'destructive', title: "Error", description: result.message });
            }
        });
        setIsFormOpen(false);
    };

    if (!isAuthenticated) {
        return <div className="container mx-auto p-8"><Skeleton className="h-64 w-full"/></div>;
    }

    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Manage Menu</h1>
                        <p className="text-muted-foreground">A list of all the dishes in your restaurant.</p>
                    </div>
                    <Button onClick={handleAddNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Item
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Featured</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-16 w-16 rounded-md"/></TableCell>
                                            <TableCell><Skeleton className="h-6 w-32"/></TableCell>
                                            <TableCell><Skeleton className="h-6 w-24"/></TableCell>
                                            <TableCell><Skeleton className="h-6 w-16"/></TableCell>
                                            <TableCell><Skeleton className="h-6 w-12"/></TableCell>
                                            <TableCell><Skeleton className="h-8 w-8"/></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    menuItems.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" />
                                            </TableCell>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>${item.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                {item.featured && <Badge>Yes</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                <AlertDialog>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                <span>Edit</span>
                                                            </DropdownMenuItem>
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    <span>Delete</span>
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the menu item.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-destructive hover:bg-destructive/90">
                                                                Yes, delete it
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <MenuItemForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSubmit={handleFormSubmit}
                item={editingItem}
            />
        </>
    );
}
