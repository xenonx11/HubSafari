
'use server';

import { revalidatePath } from 'next/cache';
import { updateHeroImage, updateAboutImage } from '@/lib/mongodb';

export async function updateHeroImageAction(imageUrl: string) {
  try {
    await updateHeroImage(imageUrl);
    revalidatePath('/'); // Revalidate the homepage to show the new image
    return { success: true, message: 'Hero image updated successfully.' };
  } catch (error) {
    console.error('Error updating hero image:', error);
    return { success: false, message: 'Failed to update hero image.' };
  }
}


export async function updateAboutImageAction(imageKey: string, imageUrl: string) {
  try {
    await updateAboutImage(imageKey, imageUrl);
    revalidatePath('/'); // Revalidate the homepage to show the new image
    revalidatePath('/about'); // Revalidate the about page
    return { success: true, message: `Image for ${imageKey} updated successfully.` };
  } catch (error) {
    console.error(`Error updating image for ${imageKey}:`, error);
    return { success: false, message: `Failed to update image for ${imageKey}.` };
  }
}
