import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
    
    // Purge the cache for the home page and other relevant routes
    revalidatePath('/')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
