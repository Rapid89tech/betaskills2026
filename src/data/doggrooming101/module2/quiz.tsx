import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 1,
  title: 'Module 2 Quiz: Canine Anatomy & Behavior Basics',
  questions: [
    {
      id: 1,
      question: 'Which layer of a dog\'s skin contains fat and connective tissue?',
      options: [
        'Epidermis',
        'Dermis',
        'Subcutaneous layer',
        'Apocrine layer'
      ],
      correctAnswer: 2,
      explanation: 'The subcutaneous layer contains fat and connective tissue, providing insulation and cushioning.'
    },
    {
      id: 2,
      question: 'Why is it important to trim a dog\'s nails regularly?',
      options: [
        'To change the color of the paw',
        'To prevent overgrowth that can impair mobility and cause pain',
        'To make the dog quieter',
        'To increase shedding'
      ],
      correctAnswer: 1,
      explanation: 'Regular nail trimming prevents overgrowth that can impair mobility, cause pain, or lead to joint issues, especially in small breeds.'
    },
    {
      id: 3,
      question: 'What is a key grooming consideration for dogs with floppy ears?',
      options: [
        'Frequent bathing every 1–2 weeks',
        'Removing all ear hair completely',
        'Cleaning ears regularly to prevent infections',
        'Using human ear drops'
      ],
      correctAnswer: 2,
      explanation: 'Floppy ears trap moisture, increasing infection risk. Regular cleaning with vet-approved ear cleaners prevents infections, especially in breeds like Cocker Spaniels.'
    },
    {
      id: 4,
      question: 'Which dog body signal indicates stress or anxiety?',
      options: [
        'Relaxed ears and wagging tail',
        'Play bow with front legs down',
        'Lip licking, yawning, or tucked tail',
        'Soft, relaxed eyes'
      ],
      correctAnswer: 2,
      explanation: 'Stress cues include lip licking, yawning, tucked tail, pinned ears, and trembling, indicating discomfort or anxiety.'
    },
    {
      id: 5,
      question: 'Why are double-coated breeds like Huskies sensitive to overheating during training?',
      options: [
        'They have thin skin',
        'Their heavy undercoat insulates against heat',
        'They have short legs',
        'They dislike water'
      ],
      correctAnswer: 1,
      explanation: 'Double coats with dense undercoats insulate against both heat and cold. During training, this insulation can cause overheating, requiring cooler conditions.'
    },
    {
      id: 6,
      question: 'Which breed is prone to dental issues and requires daily tooth brushing?',
      options: [
        'Greyhound',
        'Chihuahua',
        'Labrador Retriever',
        'Siberian Husky'
      ],
      correctAnswer: 1,
      explanation: 'Small breeds like Chihuahuas are prone to dental disease and require daily tooth brushing to prevent periodontal issues.'
    },
    {
      id: 7,
      question: 'What is the most effective way to build trust with a fearful or sensitive dog during grooming?',
      options: [
        'Force the dog to sit still',
        'Use loud commands to assert control',
        'Gradually introduce tools, reward calm behavior, and create a calm environment',
        'Ignore the dog\'s signals and continue grooming'
      ],
      correctAnswer: 2,
      explanation: 'Building trust requires gradual introduction of tools, positive reinforcement with treats, creating calm environments, and respecting the dog\'s boundaries.'
    },
    {
      id: 8,
      question: 'Which grooming tool is recommended for long, curly coats such as a Poodle\'s?',
      options: [
        'Bristle brush',
        'Slicker brush',
        'Rubber curry comb',
        'None, curly coats should not be brushed'
      ],
      correctAnswer: 1,
      explanation: 'Slicker brushes are ideal for long, curly coats like Poodles, as they remove tangles and prevent matting effectively.'
    },
    {
      id: 9,
      question: 'A Border Collie shows lip licking and pacing during training. What should the trainer do?',
      options: [
        'Continue training at the same pace',
        'Pause, reduce intensity, or simplify commands to reduce stress',
        'Use louder commands to gain attention',
        'Ignore the behavior'
      ],
      correctAnswer: 1,
      explanation: 'Lip licking and pacing are stress cues. Trainers should pause, reduce intensity, or simplify commands to prevent overtraining and maintain positive associations.'
    },
    {
      id: 10,
      question: 'Which combination of factors demonstrates the interplay of anatomy and training?',
      options: [
        'Nails and muscles: overgrown nails impair mobility, affecting training performance',
        'Tail length and coat color: determines playfulness',
        'Eye color and paw size: affects obedience',
        'Ear shape and weight: determines diet preferences'
      ],
      correctAnswer: 0,
      explanation: 'Overgrown nails impair mobility, affecting training performance. Regular nail trimming supports active breeds and ensures optimal physical function during training.'
    }
  ]
};

export default quiz;

