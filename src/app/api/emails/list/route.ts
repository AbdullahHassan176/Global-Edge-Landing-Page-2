import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const emailsDir = path.join(process.cwd(), 'emails');
    
    // Check if emails directory exists
    if (!fs.existsSync(emailsDir)) {
      return NextResponse.json({ emails: [] });
    }
    
    // Read all email files
    const files = fs.readdirSync(emailsDir).filter(file => file.endsWith('.json'));
    
    const emails = files.map(file => {
      try {
        const filePath = path.join(emailsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
      } catch (error) {
        console.error(`Error reading email file ${file}:`, error);
        return null;
      }
    }).filter(email => email !== null);
    
    // Sort by timestamp (newest first)
    emails.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return NextResponse.json({ emails });
    
  } catch (error) {
    console.error('Error listing emails:', error);
    return NextResponse.json(
      { error: 'Failed to list emails' },
      { status: 500 }
    );
  }
}
