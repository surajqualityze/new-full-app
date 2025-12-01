'use server';

import { getDatabase } from '@/lib/mongodb';
import { getSession } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import type { Training, TrainingFormData } from '@/types/training';

// Helper to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Create training
export async function createTraining(formData: TrainingFormData) {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const db = await getDatabase();

    // Generate slug
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug exists
    const existing = await db.collection('trainings').findOne({ slug });
    if (existing) {
      return { success: false, error: 'Training with this title already exists' };
    }

    // Get speaker details
    const speaker = await db.collection('speakers').findOne({ 
      _id: new ObjectId(formData.speakerId) 
    });
    
    if (!speaker) {
      return { success: false, error: 'Speaker not found' };
    }

    // Convert pricingOptions to string array
    const pricingOptionStrings = formData.pricingOptions?.map(option => 
      typeof option === 'string' ? option : option.name
    ) || [];

    const training: Omit<Training, '_id'> = {
      ...formData,
      slug,
      speakerName: speaker.name,
      pricingOptions: pricingOptionStrings,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
    };

    const result = await db.collection('trainings').insertOne(training);

    revalidatePath('/admin/trainings');
    revalidatePath('/trainings');
    
    return { 
      success: true, 
      trainingId: result.insertedId.toString() 
    };
  } catch (error: any) {
    console.error('Create training error:', error);
    return { success: false, error: error.message };
  }
}

// Update training
export async function updateTraining(id: string, formData: TrainingFormData) {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const db = await getDatabase();
    
    // Get speaker details if speakerId changed
    let speakerName;
    if (formData.speakerId) {
      const speaker = await db.collection('speakers').findOne({ 
        _id: new ObjectId(formData.speakerId) 
      });
      if (speaker) {
        speakerName = speaker.name;
      }
    }

    // Convert pricingOptions to string array
    const pricingOptionStrings = formData.pricingOptions?.map(option => 
      typeof option === 'string' ? option : option.name
    ) || [];

    const updateData: any = {
      ...formData,
      pricingOptions: pricingOptionStrings,
      updatedAt: new Date(),
    };

    if (speakerName) {
      updateData.speakerName = speakerName;
    }

    await db.collection('trainings').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    revalidatePath('/admin/trainings');
    revalidatePath('/trainings');
    revalidatePath(`/trainings/${id}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Update training error:', error);
    return { success: false, error: error.message };
  }
}

// Delete training
export async function deleteTraining(id: string) {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const db = await getDatabase();
    await db.collection('trainings').deleteOne({ _id: new ObjectId(id) });

    revalidatePath('/admin/trainings');
    return { success: true };
  } catch (error: any) {
    console.error('Delete training error:', error);
    return { success: false, error: error.message };
  }
}

// Get single training - FIXED with proper typing
export async function getTraining(id: string): Promise<(Training & { _id: string }) | null> {
  try {
    const db = await getDatabase();
    const training = await db.collection('trainings').findOne({ _id: new ObjectId(id) });
    
    if (!training) {
      return null;
    }

    return {
      ...training,
      _id: training._id.toString(),
    } as Training & { _id: string };
  } catch (error) {
    console.error('Get training error:', error);
    return null;
  }
}

// Toggle featured
export async function toggleFeatured(id: string) {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const db = await getDatabase();
    const training = await db.collection('trainings').findOne({ _id: new ObjectId(id) });
    
    if (!training) {
      return { success: false, error: 'Training not found' };
    }

    await db.collection('trainings').updateOne(
      { _id: new ObjectId(id) },
      { $set: { featured: !training.featured, updatedAt: new Date() } }
    );

    revalidatePath('/admin/trainings');
    return { success: true };
  } catch (error: any) {
    console.error('Toggle featured error:', error);
    return { success: false, error: error.message };
  }
}

// Get all trainings
export async function getAllTrainings() {
  try {
    const db = await getDatabase();
    const trainings = await db
      .collection('trainings')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return trainings.map((training) => ({
      ...training,
      _id: training._id.toString(),
    }));
  } catch (error) {
    console.error('Get trainings error:', error);
    return [];
  }
}
