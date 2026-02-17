import type { Lesson } from '@/types/course';

export const quiz6: Lesson = {
  id: 4,
  title: '📝 Module 6 Quiz: Marketing and Promotion',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of collaborating with other podcasters or brands?',
        options: [
          'To reduce production costs',
          'To increase SEO rankings',
          'To share audiences and create more value for listeners',
          'To change podcast formats'
        ],
        correct: 2,
        explanation: 'Collaboration allows for audience growth and provides more engaging content by combining forces.'
      },
      {
        question: 'Guest swaps involve one podcaster interviewing another, and vice versa.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'Guest swaps are a common collaboration technique to share audiences and build relationships.'
      },
      {
        question: 'Which of the following is NOT a recommended tool for finding collaborators?',
        options: [
          'MatchMaker.fm',
          'Podchaser',
          'Canva',
          'PodcastGuests.com'
        ],
        correct: 2,
        explanation: 'Canva is a design tool, not a networking or collaboration platform.'
      },
      {
        question: 'What is a "Trailer Swap" in cross-promotion?',
        options: [
          'Switching episode titles for SEO',
          'Exchanging promotional audio snippets between podcasters',
          'Hosting each other\'s websites',
          'Posting transcripts on social media'
        ],
        correct: 1,
        explanation: 'Trailer swaps involve each podcast playing the other\'s trailer at the beginning or end of their episode.'
      },
      {
        question: 'Which of the following is a best practice for cross-promotions?',
        options: [
          'Only promote shows in completely different genres',
          'Avoid sharing your stats with collaborators',
          'Align on audience and tone',
          'Skip tracking results unless doing paid ads'
        ],
        correct: 2,
        explanation: 'Effective cross-promotion works best when audiences and content tone align.'
      },
      {
        question: 'Building a community around your podcast helps reduce the need for consistent publishing.',
        options: [
          'True',
          'False'
        ],
        correct: 1,
        explanation: 'Community helps increase engagement, but consistent publishing is still crucial for growth and retention.'
      },
      {
        question: 'Which of the following is an example of encouraging listener involvement?',
        options: [
          'Blocking comments to avoid spam',
          'Asking questions at the end of episodes',
          'Posting only promotional content',
          'Using paid ads exclusively for discovery'
        ],
        correct: 1,
        explanation: 'Posing questions invites listener feedback and participation, increasing engagement.'
      },
      {
        question: 'Celebrating your fans (e.g., reposts or shoutouts) is a recommended community-building strategy.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'Acknowledging your listeners strengthens relationships and builds loyalty.'
      },
      {
        question: 'What is the primary benefit of using newsletters for podcast promotion?',
        options: [
          'They are cheaper than social media',
          'They provide direct, algorithm-free audience access',
          'They automatically increase SEO rankings',
          'They replace the need for social media entirely'
        ],
        correct: 1,
        explanation: 'Newsletters provide direct communication with your audience without being affected by social media algorithms, ensuring your message reaches subscribers.'
      },
      {
        question: 'Which tools are recommended for creating audiograms and social media graphics?',
        options: [
          'Audacity and GarageBand',
          'Headliner and Canva',
          'Spotify and Apple Podcasts',
          'Discord and Patreon'
        ],
        correct: 1,
        explanation: 'Headliner is used for creating audiograms, while Canva is excellent for designing social media graphics and promotional materials.'
      }
    ]
  }
};
