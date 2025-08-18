
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { MenuItem } from '@/lib/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface MenuItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<MenuItem, 'id' | '_id'>, id?: string) => void;
  item: MenuItem | null;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().min(0.01, { message: 'Price must be a positive number.' }),
  category: z.enum(['Appetizers', 'Main Courses', 'Desserts', 'Drinks']),
  image: z.string().min(1, { message: 'Please upload an image.' }),
  featured: z.boolean().default(false),
});

type MenuItemFormValues = z.infer<typeof formSchema>;

export default function MenuItemForm({ open, onOpenChange, onSubmit, item }: MenuItemFormProps) {
  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: 'Main Courses',
      image: '',
      featured: false,
    },
  });

  const imageValue = form.watch('image');

  useEffect(() => {
    if (open) {
      if (item) {
        form.reset(item);
      } else {
        form.reset({
          name: '',
          description: '',
          price: 0,
          category: 'Main Courses',
          image: '',
          featured: false,
        });
      }
    }
  }, [item, open, form]);

  const handleFormSubmit = (values: MenuItemFormValues) => {
    onSubmit(values, item?.id);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the menu item. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto pr-6 -mr-6 pl-1 -ml-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Spaghetti Carbonara" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the dish..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                  <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                          <Input type="number" step="0.01" placeholder="15.99" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              <SelectItem value="Appetizers">Appetizers</SelectItem>
                              <SelectItem value="Main Courses">Main Courses</SelectItem>
                              <SelectItem value="Desserts">Desserts</SelectItem>
                              <SelectItem value="Drinks">Drinks</SelectItem>
                          </SelectContent>
                      </Select>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imageValue && (
                  <div className="flex justify-center rounded-md border p-2">
                    <Image src={imageValue} alt="Image preview" width={200} height={200} className="object-contain" />
                  </div>
              )}
              
              <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                              <FormLabel>Featured</FormLabel>
                              <FormDescription>
                                  Show this item on the homepage.
                              </FormDescription>
                          </div>
                          <FormControl>
                              <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              />
                          </FormControl>
                      </FormItem>
                  )}
                  />
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
