#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __dirname = dirname(fileURLToPath(import.meta.url));

async function pushSchema() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    console.log('🔄 Checking if description column exists...');
    
    // Check if column already exists
    const checkColumn = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'mutilators' 
      AND column_name = 'description'
    `;
    
    if (checkColumn.length > 0) {
      console.log('✅ Description column already exists');
      return;
    }
    
    console.log('📝 Adding description column to mutilators table...');
    
    // Add the description column
    await sql`
      ALTER TABLE mutilators 
      ADD COLUMN IF NOT EXISTS description TEXT
    `;
    
    console.log('✅ Successfully added description column!');
    
    // Verify the column was added
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'mutilators'
      ORDER BY ordinal_position
    `;
    
    console.log('\n📊 Current table structure:');
    columns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`);
    });
    
  } catch (error) {
    console.error('❌ Error pushing schema:', error);
    process.exit(1);
  }
}

// Run the script
pushSchema().then(() => {
  console.log('\n🎉 Schema push completed!');
  process.exit(0);
}).catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});