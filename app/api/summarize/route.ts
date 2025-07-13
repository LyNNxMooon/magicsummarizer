import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { fetchTranscript } from '@/lib/fetchTranscript';
import { fetchTiktokTranscript } from '@/lib/fetchTiktokTranscript';
import { fetchArticle } from '@/lib/fetchArticle';
import { generateSummary } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    let content: string;
    let contentType: "YouTube" | "TikTok" | "article";

    // Determine content type and extract accordingly
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      contentType = "YouTube";
      content = await fetchTranscript(url);
    } else if (url.includes('tiktok.com') || url.includes('vm.tiktok.com')) {
      contentType = "TikTok";
      content = await fetchTiktokTranscript(url);
    } else {
      contentType = "article";
      content = await fetchArticle(url);
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract content from the provided URL' },
        { status: 400 }
      );
    }

    // Generate summary using Gemini
    const summary = await generateSummary(content, contentType);

    return NextResponse.json({
      summary,
      contentType,
      url
    });

  } catch (error) {
    console.error('Error in summarize API:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}