import { Module } from '@/types/course';

const broadcastingModule5: Module = {
  id: 5,
  title: 'Publishing and Distribution',
  description: 'Learn how to publish your podcast on major platforms, optimize metadata for discoverability, and distribute your content effectively.',
  lessons: [
    {
      id: 9,
      title: 'Publishing Your Podcast',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/example',
        textContent: `
# Publishing Your Podcast

Learn how to publish your podcast on major platforms and optimize it for maximum discoverability and reach.

## Major Podcast Platforms:

### Apple Podcasts:
- Industry standard with largest audience
- Requires Apple ID and podcast submission
- Strict review process and guidelines
- Excellent for discoverability

### Spotify:
- Growing rapidly with younger demographics
- Built-in music integration
- Podcast playlists and recommendations
- Direct upload option available

### Google Podcasts:
- Integrated with Google ecosystem
- Automatic indexing from RSS feeds
- Good for Android users
- SEO benefits from Google integration

### Amazon Music:
- Growing platform with Amazon backing
- Exclusive content opportunities
- Integration with Alexa devices
- Competitive monetization options

## RSS Feed Setup:

### What is RSS?
- Really Simple Syndication
- XML file that contains episode information
- Automatically updates when new episodes are published
- Required by most podcast platforms

### Essential RSS Elements:
- Podcast title and description
- Episode titles and descriptions
- Audio file URLs
- Publication dates
- Categories and tags

### Hosting Platforms:
- **Libsyn**: Industry standard, reliable
- **Buzzsprout**: User-friendly, good analytics
- **Anchor**: Free, Spotify-owned
- **Podbean**: Comprehensive features
- **Transistor**: Professional hosting

## Metadata Optimization:

### Episode Titles:
- Clear, descriptive, and engaging
- Include relevant keywords
- Keep under 60 characters
- Avoid clickbait or misleading titles

### Descriptions:
- Compelling episode summary
- Include key topics and guests
- Add relevant keywords naturally
- Include call-to-action or links

### Categories and Tags:
- Choose appropriate categories
- Use relevant tags for discoverability
- Research trending topics
- Update regularly based on content

## Publishing Workflow:

1. **Prepare Your Audio**: Ensure high quality and proper format
2. **Write Compelling Metadata**: Title, description, and tags
3. **Upload to Hosting Platform**: Add episode to your RSS feed
4. **Submit to Directories**: Apple Podcasts, Spotify, etc.
5. **Promote Your Episode**: Social media, email, website
6. **Monitor Performance**: Track downloads and engagement

## Best Practices:

- **Consistent Publishing Schedule**: Build audience expectations
- **Quality Over Quantity**: Focus on content value
- **Engage with Listeners**: Respond to reviews and feedback
- **Cross-Promotion**: Collaborate with other podcasters
- **Analytics Review**: Monitor performance and adjust strategy
        `
      }
    }
  ]
};

export default broadcastingModule5; 