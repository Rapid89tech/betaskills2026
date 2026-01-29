import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 8,
  title: 'Module 8 Quiz: Canine Health & First Aid',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is early detection of illness during grooming or training important?',
        options: [
          'It avoids unnecessary veterinary visits',
          'It improves treatment outcomes and reduces suffering',
          'It makes grooming sessions faster',
          'It prevents dogs from needing vaccines'
        ],
        correct: 1,
        explanation: 'Early detection of illness improves treatment outcomes and reduces suffering by allowing timely veterinary intervention before conditions escalate.'
      },
      {
        question: 'Which of the following is a common physical sign of illness noticed during grooming?',
        options: [
          'Increased wagging',
          'Redness, lumps, or hair loss on the skin',
          'Rolling over for belly rubs',
          'Barking for attention'
        ],
        correct: 1,
        explanation: 'Redness, lumps, or hair loss on the skin are common physical signs of illness that can be detected during grooming sessions.'
      },
      {
        question: 'A dog suddenly growls or snaps during training. What might this indicate?',
        options: [
          'The dog is disobedient',
          'The dog is bored',
          'The dog may be in pain or unwell',
          'The dog prefers a different trainer'
        ],
        correct: 2,
        explanation: 'Sudden aggression or irritability during training may indicate pain or illness, requiring veterinary evaluation rather than assuming behavioral issues.'
      },
      {
        question: 'What tool would you use to check a dog\'s body temperature?',
        options: [
          'Flashlight',
          'Thermometer',
          'Comb',
          'Grooming scissors'
        ],
        correct: 1,
        explanation: 'A pet-safe thermometer (rectal or ear) is used to check a dog\'s body temperature, with normal range being 100.5–102.5°F.'
      },
      {
        question: 'A refusal to take normally high-value treats (like chicken) during training can be a sign of:',
        options: [
          'The dog is tired of chicken',
          'The dog is distracted',
          'A potential illness or loss of appetite',
          'The dog wants play instead'
        ],
        correct: 2,
        explanation: 'Refusal of high-value treats can indicate a potential illness or loss of appetite, which should be monitored and may require veterinary evaluation.'
      },
      {
        question: 'Which breed is especially prone to ear infections, requiring closer inspection?',
        options: [
          'German Shepherd',
          'Golden Retriever',
          'Border Collie',
          'Chihuahua'
        ],
        correct: 1,
        explanation: 'Golden Retrievers and other sporting breeds with floppy ears are especially prone to ear infections, requiring closer inspection during grooming.'
      },
      {
        question: 'During grooming, a handler notices rapid, shallow breathing. What should they do?',
        options: [
          'Continue grooming to calm the dog',
          'Offer a toy to distract the dog',
          'Pause, reward calm behavior, and assess for illness',
          'Ignore it, as it\'s normal during grooming'
        ],
        correct: 2,
        explanation: 'Rapid, shallow breathing should prompt pausing the session, rewarding calm behavior, and assessing for potential illness or stress.'
      },
      {
        question: 'Which of the following stress signals may indicate illness or anxiety?',
        options: [
          'Rolling over happily',
          'Trembling or hiding',
          'Wagging tail',
          'Bringing a toy'
        ],
        correct: 1,
        explanation: 'Trembling or hiding are stress signals that may indicate illness or anxiety, especially if persistent or not alleviated by calming aids.'
      },
      {
        question: 'What is the normal temperature range for a healthy dog?',
        options: [
          '96–98°F',
          '98–99.5°F',
          '100.5–102.5°F',
          '103–105°F'
        ],
        correct: 2,
        explanation: 'The normal temperature range for a healthy dog is 100.5–102.5°F, with fever being >102.5°F and hypothermia <99.5°F.'
      },
      {
        question: 'If a dog shows persistent vomiting, diarrhea, or lethargy during training, what should the handler do?',
        options: [
          'Offer more treats to encourage activity',
          'Stop the session and recommend a veterinary evaluation',
          'Continue training gently to distract the dog',
          'Ignore symptoms and reassess at the next session'
        ],
        correct: 1,
        explanation: 'Persistent vomiting, diarrhea, or lethargy require stopping the session and recommending immediate veterinary evaluation to address potential serious health issues.'
      }
    ]
  }
};

export default quiz;

