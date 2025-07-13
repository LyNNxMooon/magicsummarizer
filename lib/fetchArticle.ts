import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchArticle(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Remove script and style elements
    $('script, style, nav, header, footer, aside, .ad, .advertisement, .sidebar').remove();
    
    // Try to find the main content using common selectors
    let content = '';
    const contentSelectors = [
      'article',
      '[role="main"]',
      '.main-content',
      '.content',
      '.post-content',
      '.entry-content',
      '.article-content',
      'main'
    ];
    
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0 && element.text().trim().length > content.length) {
        content = element.text().trim();
      }
    }
    
    // Fallback to body if no specific content found
    if (!content || content.length < 100) {
      content = $('body').text().trim();
    }
    
    // Clean up the content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
    
    if (!content || content.length < 50) {
      return "Could not extract meaningful content from this article. The page might be protected or require JavaScript to load content.";
    }
    
    // Limit content length to avoid API limits
    if (content.length > 10000) {
      content = content.substring(0, 10000) + "...";
    }
    
    return content;
    
  } catch (error) {
    console.error('Error fetching article:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ENOTFOUND') {
        return "Could not reach the website. Please check the URL and try again.";
      }
      if (error.response?.status === 403 || error.response?.status === 401) {
        return "Access denied. This website blocks automated content extraction.";
      }
      if (error.response?.status === 404) {
        return "Article not found. Please check the URL and try again.";
      }
    }
    
    return "Failed to fetch article content. Please try again or check if the URL is accessible.";
  }
}