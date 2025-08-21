
'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { updateAboutImageAction } from './actions';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface AboutSettingsClientPageProps {
  currentImages: { [key: string]: string | null };
}

const settingsSchema = z.object({
  aboutOurStoryImage: z.string().optional(),
  aboutCulinaryStoryImage: z.string().optional(),
  aboutChefLeoAvatar: z.string().optional(),
  aboutMariaAvatar: z.string().optional(),
  aboutSofiaAvatar: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function AboutSettingsClientPage({ currentImages }: AboutSettingsClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      aboutOurStoryImage: currentImages.aboutOurStoryImage || '',
      aboutCulinaryStoryImage: currentImages.aboutCulinaryStoryImage || '',
      aboutChefLeoAvatar: currentImages.aboutChefLeoAvatar || '',
      aboutMariaAvatar: currentImages.aboutMariaAvatar || '',
      aboutSofiaAvatar: currentImages.aboutSofiaAvatar || '',
    },
  });

  useEffect(() => {
    const session = localStorage.getItem('tastebud-admin-session');
    if (session !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    form.reset(currentImages);
  }, [currentImages, form]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof SettingsFormValues) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        form.setValue(fieldName, result, { shouldValidate: true, shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: SettingsFormValues) => {
    startTransition(async () => {
      const dirtyFields = form.formState.dirtyFields;
      let allSucceeded = true;

      for (const key of Object.keys(dirtyFields)) {
        const fieldKey = key as keyof SettingsFormValues;
        if (data[fieldKey]) {
          const result = await updateAboutImageAction(fieldKey, data[fieldKey]!);
          if (!result.success) {
            allSucceeded = false;
            toast({
              variant: 'destructive',
              title: 'Error',
              description: result.message,
            });
          }
        }
      }

      if (allSucceeded) {
        toast({
          title: 'Success!',
          description: 'About Us images have been updated successfully.',
        });
        router.refresh();
        form.reset(data); // Resets dirty fields state
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-8">
        <Skeleton className="h-12 w-1/3 mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const ImageUploadField = ({ name, label, description }: { name: keyof SettingsFormValues; label: string; description: string }) => {
    const imageValue = form.watch(name);
    return (
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormMessage />
            <p className="text-xs text-muted-foreground">{description}</p>
            <FormControl>
              <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, name)} className="max-w-sm" />
            </FormControl>
            {imageValue && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <div className="flex justify-start rounded-md border p-2 max-w-md">
                  <Image src={imageValue} alt={`${label} preview`} width={300} height={175} className="object-contain" />
                </div>
              </div>
            )}
          </FormItem>
        )}
      />
    );
  };


  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">About Us Settings</h1>
        <p className="text-muted-foreground">Manage images for your "About Us" page and homepage snippet.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <Card>
            <CardHeader>
              <CardTitle>Page Images</CardTitle>
              <CardDescription>Update the main images displayed on your site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ImageUploadField name="aboutOurStoryImage" label="Main 'Our Story' Image" description="Displayed on the main About Us page." />
                <Separator/>
                <ImageUploadField name="aboutCulinaryStoryImage" label="'Culinary Story' Image" description="Displayed in the 'About Us' section on the Homepage." />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Avatars</CardTitle>
              <CardDescription>Update the images for your team members.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImageUploadField name="aboutChefLeoAvatar" label="Chef Leo's Avatar" description="Founder & Head Chef" />
                <ImageUploadField name="aboutMariaAvatar" label="Maria's Avatar" description="General Manager" />
                <ImageUploadField name="aboutSofiaAvatar" label="Sofia's Avatar" description="Pastry Chef" />
            </CardContent>
          </Card>
          
          <Button type="submit" disabled={isPending || !form.formState.isDirty}>
            {isPending ? 'Saving...' : 'Save All Changes'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
