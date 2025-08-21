'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { updateHeroImageAction } from './actions';
import Image from 'next/image';

interface SiteSettingsClientPageProps {
  currentHeroImage: string | null;
}

const settingsSchema = z.object({
  heroImage: z.string().min(1, 'Please upload an image.'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SiteSettingsClientPage({ currentHeroImage }: SiteSettingsClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      heroImage: currentHeroImage || '',
    },
  });
  
  const imageValue = form.watch('heroImage');

  useEffect(() => {
    const session = localStorage.getItem('tastebud-admin-session');
    if (session !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    if (currentHeroImage) {
        form.setValue('heroImage', currentHeroImage);
    }
  }, [currentHeroImage, form]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('heroImage', reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: SettingsFormValues) => {
    startTransition(async () => {
      const result = await updateHeroImageAction(data.heroImage);
      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        router.refresh(); // Refresh to show changes if any are displayed on this page
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-8">
        <Skeleton className="h-12 w-1/3 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Site Settings</h1>
        <p className="text-muted-foreground">Manage general content for your website.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Update the main image displayed on your homepage.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="heroImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Image</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" onChange={handleImageChange} className="max-w-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imageValue && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <div className="flex justify-start rounded-md border p-2 max-w-md">
                    <Image src={imageValue} alt="Hero image preview" width={400} height={225} className="object-contain" />
                  </div>
                </div>
              )}

              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
