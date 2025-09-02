import 'dotenv/config';
import { db } from '../db';
import { mutilators } from '../db/schema';
import { eq } from 'drizzle-orm';

// Professional medical/doctor themed images from Unsplash
const unsplashImages = [
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop', // Female doctor
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop', // Male doctor
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop', // Female surgeon
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop', // Male medical professional
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop', // Female doctor portrait
  'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop', // Medical professional
  'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop', // Female medical professional
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop', // Doctor in hospital
  'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop', // Medical team member
  'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&h=400&fit=crop', // Male surgeon
];

async function addImagesToMutilators() {
  try {
    console.log('🖼️ Adding test images to mutilators...');
    
    // Fetch all mutilators
    const allMutilators = await db.select().from(mutilators);
    
    if (allMutilators.length === 0) {
      console.log('No mutilators found in database');
      return;
    }
    
    console.log(`Found ${allMutilators.length} mutilators`);
    
    // Update each mutilator with an image
    for (let i = 0; i < allMutilators.length; i++) {
      const mutilator = allMutilators[i];
      const imageUrl = unsplashImages[i % unsplashImages.length];
      
      await db
        .update(mutilators)
        .set({ imageUrl })
        .where(eq(mutilators.id, mutilator.id));
      
      console.log(`✅ Updated ${mutilator.name} with image`);
    }
    
    console.log(`\n🎉 Successfully added images to ${allMutilators.length} mutilators`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding images:', error);
    process.exit(1);
  }
}

addImagesToMutilators();