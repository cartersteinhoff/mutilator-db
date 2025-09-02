import 'dotenv/config';
import { db } from '../db';
import { mutilators } from '../db/schema';

const testMutilators = [
  {
    name: 'Dr. Sarah Chen',
    age: 34,
    hospital: 'St. Mary\'s General Hospital',
    profession: 'Cardiothoracic Surgeon',
    description: 'Specialized in minimally invasive cardiac procedures with over 500 successful operations'
  },
  {
    name: 'Marcus Thompson',
    age: 28,
    hospital: 'Memorial Healthcare Center',
    profession: 'Emergency Medicine Physician',
    description: 'Trauma specialist with expertise in critical care and rapid response situations'
  },
  {
    name: 'Dr. Emily Rodriguez',
    age: 41,
    hospital: 'Children\'s Medical Institute',
    profession: 'Pediatric Neurosurgeon',
    description: 'Leading expert in pediatric brain tumor removal and spinal cord surgery'
  },
  {
    name: 'James Wilson',
    age: 37,
    hospital: 'Metropolitan Trauma Center',
    profession: 'Orthopedic Surgeon',
    description: 'Sports medicine specialist focusing on joint reconstruction and arthroscopic surgery'
  },
  {
    name: 'Dr. Aisha Patel',
    age: 45,
    hospital: 'University Medical Center',
    profession: 'Transplant Surgeon',
    description: 'Liver and kidney transplant specialist with highest success rates in the region'
  },
  {
    name: 'Robert Kim',
    age: 32,
    hospital: 'Riverside Community Hospital',
    profession: 'General Surgeon',
    description: 'Expertise in laparoscopic procedures and emergency abdominal surgery'
  },
  {
    name: 'Dr. Lisa Johnson',
    age: 39,
    hospital: 'Advanced Surgical Institute',
    profession: 'Plastic & Reconstructive Surgeon',
    description: 'Specializing in burn reconstruction and microsurgery techniques'
  },
  {
    name: 'Michael Chang',
    age: 36,
    hospital: 'Regional Medical Center',
    profession: 'Vascular Surgeon',
    description: 'Expert in endovascular procedures and complex arterial repairs'
  },
  {
    name: 'Dr. Rebecca Martinez',
    age: 43,
    hospital: 'Women\'s Health Center',
    profession: 'Obstetric Surgeon',
    description: 'High-risk pregnancy specialist with expertise in fetal surgery'
  },
  {
    name: 'David Anderson',
    age: 31,
    hospital: 'City General Hospital',
    profession: 'Trauma Surgeon',
    description: 'Combat medicine veteran with extensive experience in emergency surgical interventions'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    const inserted = await db.insert(mutilators).values(testMutilators).returning();
    
    console.log(`✅ Successfully inserted ${inserted.length} mutilators`);
    console.log('Inserted mutilators:', inserted.map(m => m.name).join(', '));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();