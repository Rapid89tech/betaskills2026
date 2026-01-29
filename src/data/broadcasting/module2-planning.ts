import { Module } from '@/types/course';

const broadcastingModule2: Module = {
  id: 2,
  title: 'Podcast Planning and Concept Development',
  description: 'Learn how to develop a compelling podcast concept, define your niche, identify your target audience, and create a strategic content plan that will set your podcast up for success.',
  lessons: [
    {
      id: 4,
      title: 'Developing Your Podcast Concept',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/ZJ_diFtbw_Q',
        textContent: `
# Developing Your Podcast Concept

**YOUTUBE LINK:** https://youtu.be/ZJ_diFtbw_Q

Start with the core idea of your show — this is your podcast's identity. A well-defined concept shapes content, attracts the right audience, and sets expectations. It's the foundation for branding, marketing, and listener engagement, ensuring your podcast stands out in a crowded market.

## Key Questions to Ask:

- **What is the central theme or niche?** The central theme defines your podcast's focus, such as true crime, personal finance, or wellness. A clear niche helps managers target specific listener interests, improving discoverability on platforms like Spotify.

- **Who is your target audience?** Identifying your audience—e.g., young professionals, hobbyists, or parents—guides content and tone. Managers analyze demographics and psychographics to tailor episodes, ensuring relevance.

- **What problem do you solve or what value do you offer?** Podcasts must deliver value, such as education, entertainment, or inspiration. Managers articulate this value to attract and retain audiences.

- **What makes your podcast unique?** A unique angle, like a novel storytelling style or exclusive insights, differentiates your podcast from the 5 million+ podcasts available.

## Examples:

- **Career Growth Podcast**: Helping young professionals climb the corporate ladder with actionable advice and industry insights.

- **Mystery Fiction Podcast**: Audio drama series telling one mystery per season with immersive storytelling.

- **Food & Culture Podcast**: Exploring world cuisines and the stories behind them, connecting food with cultural narratives.

## Concept Template:
"[Podcast Name]" is a [weekly/bi-weekly] show that [describe goal/purpose] for [target audience]. Each episode explores [topic or format], offering [benefit/value].
        `
      }
    },
    {
      id: 5,
      title: 'Quiz: Podcast Planning',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the first step when developing a new podcast?',
            options: [
              'Choosing your microphone',
              'Writing a script',
              'Defining your podcast concept',
              'Editing your intro music'
            ],
            correct: 2,
            explanation: 'Defining your podcast concept is the foundational first step that shapes all other decisions.'
          },
          {
            question: 'Which question is NOT part of defining your podcast concept?',
            options: [
              'What value do you offer?',
              'Who is your co-host?',
              'What makes your show unique?',
              'Who is your target audience?'
            ],
            correct: 1,
            explanation: 'Co-host selection comes after concept definition, not during the initial concept phase.'
          }
        ]
      }
    }
  ]
};

export default broadcastingModule2; 