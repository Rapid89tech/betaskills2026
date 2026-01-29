const quiz = {
  id: 7,
  title: 'Module 5 Quiz: Empathy',
  duration: '20 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What is empathy?',
        options: [
          'Feeling sorry for someone',
          'Understanding and sharing another\'s emotions',
          'Ignoring your own feelings',
          'Avoiding emotional conversations'
        ],
        correct: 1,
        explanation: 'Empathy is the capacity to deeply understand and share the emotions, perspectives, and experiences of another person, going beyond mere sympathy.'
      },
      {
        question: 'Which of these is an example of cognitive empathy?',
        options: [
          'Giving someone money',
          'Understanding someone\'s point of view',
          'Crying with a friend',
          'Avoiding emotional talks'
        ],
        correct: 1,
        explanation: 'Cognitive empathy involves understanding another person\'s thoughts, beliefs, or point of view without necessarily feeling their emotions.'
      },
      {
        question: 'What is emotional empathy?',
        options: [
          'Solving someone\'s problem',
          'Feeling what another person feels',
          'Judging someone\'s behaviour',
          'Reading a story'
        ],
        correct: 1,
        explanation: 'Emotional empathy, also known as affective empathy, is the ability to feel and share the emotions of another person, resonating with their emotional state.'
      },
      {
        question: 'What\'s a key element of active listening?',
        options: [
          'Interrupting with advice',
          'Looking away while they talk',
          'Paying attention and showing interest',
          'Planning your reply while they talk'
        ],
        correct: 2,
        explanation: 'Active listening involves fully engaging with a speaker by focusing on their message, showing interest through body language, and responding thoughtfully.'
      },
      {
        question: 'How can you show empathy nonverbally?',
        options: [
          'Rolling your eyes',
          'Folding arms',
          'Smiling and maintaining eye contact',
          'Looking at your phone'
        ],
        correct: 2,
        explanation: 'Nonverbal empathy is shown through positive body language such as smiling, maintaining appropriate eye contact, and using open posture to signal attentiveness and care.'
      },
      {
        question: 'Which is a benefit of empathy?',
        options: [
          'It increases conflict',
          'It promotes miscommunication',
          'It builds stronger relationships',
          'It causes confusion'
        ],
        correct: 2,
        explanation: 'Empathy builds trust and deeper relationships by creating a sense of understanding and validation, fostering stronger bonds between people.'
      },
      {
        question: 'What does compassionate empathy involve?',
        options: [
          'Only understanding someone\'s thoughts',
          'Feeling emotions and offering help',
          'Copying emotions',
          'Talking over someone'
        ],
        correct: 1,
        explanation: 'Compassionate empathy combines cognitive and emotional empathy with a desire to take action to alleviate someone\'s suffering or support their needs.'
      },
      {
        question: 'Empathy helps in teamwork by:',
        options: [
          'Encouraging silence',
          'Increasing understanding and cooperation',
          'Discouraging new ideas',
          'Making decisions alone'
        ],
        correct: 1,
        explanation: 'Empathy enhances teamwork by improving communication clarity, fostering collaboration, and helping team members understand and value diverse perspectives.'
      },
      {
        question: 'What is a good way to build empathy?',
        options: [
          'Avoid emotional conversations',
          'Spend time only with people like you',
          'Read books and listen to people\'s stories',
          'Talk more than you listen'
        ],
        correct: 2,
        explanation: 'Reading fiction, watching diverse stories, and listening to people\'s experiences exposes you to different viewpoints and helps build empathy by understanding various perspectives.'
      },
      {
        question: 'Reflecting someone\'s feelings back to them shows:',
        options: [
          'Passive aggression',
          'Emotional manipulation',
          'Active listening and empathy',
          'Avoidance'
        ],
        correct: 2,
        explanation: 'Reflecting back what someone says by paraphrasing or summarizing their message demonstrates active listening and empathy, confirming understanding and validating their feelings.'
      }
    ]
  }
};

export default quiz;
