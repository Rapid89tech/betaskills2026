import { Lesson } from '@/types/course';

const lessonConfig = {
  id: 5,
  title: 'Module 1 Quiz: Fundamentals and Applications of Sound',
  duration: '30 minutes',
  type: 'interactive' as const,
  questions: [
    {
      id: 1,
      question: 'What type of wave is sound in air?',
      options: ['Transverse', 'Longitudinal', 'Electromagnetic', 'Static'],
      correctAnswer: 1,
      explanation: 'Sound in air is a longitudinal wave, where particles vibrate in the same direction as the wave travels.'
    },
    {
      id: 2,
      question: 'Which property of a sound wave determines its loudness?',
      options: ['Wavelength', 'Frequency', 'Amplitude', 'Timbre'],
      correctAnswer: 2,
      explanation: 'Amplitude determines the loudness of a sound wave. Higher amplitude means louder sound.'
    },
    {
      id: 3,
      question: 'True or False: Sound can travel through a vacuum.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation: 'False. Sound requires a medium such as air, water, or solids to travel through. It cannot travel in a vacuum.'
    },
    {
      id: 4,
      question: 'Which of the following is a use of ultrasound?',
      options: ['Detecting earthquakes', 'Navigation in bats', 'Sonar in submarines', 'Medical imaging'],
      correctAnswer: 3,
      explanation: 'Medical imaging is a primary use of ultrasound, allowing doctors to see inside the body without invasive procedures.'
    },
    {
      id: 5,
      question: 'What unit is used to measure the intensity of sound?',
      options: ['Hertz', 'Newton', 'Decibel', 'Watt'],
      correctAnswer: 2,
      explanation: 'Decibels (dB) are used to measure sound intensity, providing a logarithmic scale for sound levels.'
    },
    {
      id: 6,
      question: 'Which job involves recreating everyday sounds for films and TV?',
      options: ['Audio Engineer', 'Foley Artist', 'Mastering Engineer', 'Sound Designer'],
      correctAnswer: 1,
      explanation: 'Foley artists recreate everyday sounds like footsteps, door creaks, and other ambient sounds for films and TV.'
    },
    {
      id: 7,
      question: 'In which medium does sound travel fastest?',
      options: ['Air', 'Water', 'Steel', 'Vacuum'],
      correctAnswer: 2,
      explanation: 'Sound travels fastest in solids like steel due to the tightly packed particles that can transmit vibrations more efficiently.'
    },
    {
      id: 8,
      question: 'What does the human perception of pitch correspond to in a sound wave?',
      options: ['Amplitude', 'Frequency', 'Phase', 'Wavelength'],
      correctAnswer: 1,
      explanation: 'Pitch corresponds to frequency. Higher frequencies are perceived as higher pitches, lower frequencies as lower pitches.'
    },
    {
      id: 9,
      question: 'True or False: A violin and a flute playing the same note sound different because of timbre.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'True. Timbre is the quality that makes different instruments sound distinct even when playing the same pitch and loudness.'
    },
    {
      id: 10,
      question: 'Which field is least likely to involve professional audio careers?',
      options: ['Game development', 'Architecture', 'Medical imaging', 'Construction painting'],
      correctAnswer: 3,
      explanation: 'Construction painting is least likely to involve professional audio careers, while the other fields all have significant audio applications.'
    }
  ]
};

const generateQuizContent = () => {
  let content = `# 🎓 Module 1 Quiz: Fundamentals and Applications of Sound

<div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:2rem;border-radius:16px;margin-bottom:2rem;text-align:center;">
  <h2 style="margin:0;font-size:1.8rem;">Test Your Knowledge</h2>
  <p style="margin:0.5rem 0 0 0;font-size:1.1rem;opacity:0.9;">Complete this quiz to assess your understanding of sound fundamentals and industry applications</p>
</div>

<div style="background:#f7fafc;padding:1.5rem;border-radius:12px;margin-bottom:2rem;border-left:4px solid #667eea;">
  <h3 style="margin:0 0 1rem 0;color:#2d3748;">📋 Quiz Instructions</h3>
  <ul style="margin:0;padding-left:1.5rem;color:#4a5568;">
    <li>Answer all 10 questions to test your knowledge</li>
    <li>Each question has one correct answer</li>
    <li>Review explanations after completing the quiz</li>
    <li>Aim for 80% or higher to demonstrate mastery</li>
  </ul>
</div>

`;

  lessonConfig.questions.forEach((q, index) => {
    content += `
<div style="background:white;border:2px solid #e2e8f0;border-radius:12px;padding:2rem;margin-bottom:2rem;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
  <h3 style="color:#2d3748;margin:0 0 1.5rem 0;font-size:1.3rem;">
    <span style="background:#667eea;color:white;padding:0.3rem 0.8rem;border-radius:50%;margin-right:0.8rem;font-size:0.9rem;">${index + 1}</span>
    ${q.question}
  </h3>
  
  <div style="display:grid;gap:0.8rem;">
`;

    q.options.forEach((option, optionIndex) => {
      const isCorrect = optionIndex === q.correctAnswer;
      content += `
    <div style="padding:1rem;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.2s;background:#f7fafc;" 
         onmouseover="this.style.borderColor='#667eea';this.style.background='#edf2f7'" 
         onmouseout="this.style.borderColor='#e2e8f0';this.style.background='#f7fafc'">
      <span style="font-weight:600;color:#4a5568;">${String.fromCharCode(65 + optionIndex)}.</span> ${option}
    </div>
`;
    });

    content += `
  </div>
  
  <div style="margin-top:1.5rem;padding:1rem;background:#f0fff4;border-left:4px solid #48bb78;border-radius:8px;display:none;" id="explanation-${q.id}">
    <strong style="color:#2f855a;">💡 Explanation:</strong>
    <p style="margin:0.5rem 0 0 0;color:#2f855a;">${q.explanation}</p>
  </div>
</div>
`;
  });

  content += `
<div style="text-align:center;margin:3rem 0;">
  <button style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;border:none;padding:1rem 2rem;border-radius:8px;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all 0.2s;" 
          onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(102,126,234,0.3)'" 
          onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
    Submit Quiz
  </button>
</div>

<div style="background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:white;padding:2rem;border-radius:16px;text-align:center;margin-top:3rem;">
  <h3 style="margin:0 0 1rem 0;font-size:1.5rem;">🎉 Congratulations!</h3>
  <p style="margin:0;font-size:1.1rem;opacity:0.9;">You've completed Module 1! You now have a solid foundation in sound fundamentals and industry applications.</p>
</div>
`;

  return content;
};

export const lesson5Quiz: Lesson = {
  id: lessonConfig.id,
  title: lessonConfig.title,
  duration: lessonConfig.duration,
  type: lessonConfig.type,
  content: {
    videoUrl: '',
    videoUrl2: '',
    textContent: generateQuizContent()
  }
};

export default lesson5Quiz; 
