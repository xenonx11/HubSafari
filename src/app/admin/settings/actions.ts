'use server';

import { revalidatePath } from 'next/cache';
import { updateHeroImage } from '@/lib/mongodb';

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
