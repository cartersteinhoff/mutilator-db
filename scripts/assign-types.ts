import 'dotenv/config';
import { db } from '../db';
import { mutilators } from '../db/schema';
import { eq } from 'drizzle-orm';

async function assignTypesToMutilators() {
  try {
    console.log('🏥 Assigning types to existing mutilators...');
    
    // Fetch all mutilators
    const allMutilators = await db.select().from(mutilators);
    
    for (const mutilator of allMutilators) {
      let type: 'doctor' | 'nurse' | 'mohel';
      
      // Assign type based on profession
      const professionLower = mutilator.profession.toLowerCase();
      
      if (professionLower.includes('nurse') || professionLower.includes('nursing')) {
        type = 'nurse';
      } else if (professionLower.includes('mohel')) {
        type = 'mohel';
      } else {
        // Default to doctor for surgeons, physicians, etc.
        type = 'doctor';
      }
      
      await db
        .update(mutilators)
        .set({ type })
        .where(eq(mutilators.id, mutilator.id));
      
      console.log(`✅ Updated ${mutilator.name}: ${type}`);
    }
    
    // Add a mohel to demonstrate the type
    console.log('\n📝 Adding a mohel to the database...');
    await db.insert(mutilators).values({
      name: 'Rabbi Abraham Cohen',
      age: 52,
      hospital: 'Beth Israel Medical Center',
      profession: 'Certified Mohel',
      type: 'mohel',
      description: 'Certified mohel with over 25 years of experience in ritual circumcision',
      imageUrl: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop'
    });
    
    // Add some nurses
    console.log('📝 Adding nurses to the database...');
    const nurses = [
      {
        name: 'Jennifer Martinez',
        age: 29,
        hospital: 'City General Hospital',
        profession: 'Registered Nurse - ICU',
        type: 'nurse' as const,
        description: 'Specialized in intensive care unit patient management',
        imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop'
      },
      {
        name: 'Thomas Williams',
        age: 35,
        hospital: 'Memorial Healthcare Center',
        profession: 'Emergency Room Nurse',
        type: 'nurse' as const,
        description: 'Expert in emergency and trauma care nursing',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop'
      }
    ];
    
    await db.insert(mutilators).values(nurses);
    
    console.log(`\n🎉 Successfully updated all mutilators with types and added new entries`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error assigning types:', error);
    process.exit(1);
  }
}

assignTypesToMutilators();