import type { Quiz } from '@/types/course';

export const module7Quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Natural Language Processing Fundamentals',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary focus of Natural Language Processing (NLP)?',
        options: [
          'Processing numerical data for predictions',
          'Enabling machines to understand and generate human language',
          'Visualizing text data distributions',
          'Optimizing hardware for AI tasks'
        ],
        correct: 1,
        explanation: 'NLP focuses on processing and generating human language, as described in section 7.1.'
      },
      {
        question: 'What does tokenization do in NLP preprocessing?',
        options: [
          'Removes punctuation from text',
          'Splits text into words or sentences',
          'Converts text to numerical vectors',
          'Identifies parts of speech'
        ],
        correct: 1,
        explanation: 'Tokenization breaks text into smaller units like words or sentences, as noted in section 7.2.'
      },
      {
        question: 'Which preprocessing technique reduces words to their root form, such as "running" to "run"?',
        options: [
          'Stop Words Removal',
          'Stemming',
          'Named Entity Recognition',
          'Vectorization'
        ],
        correct: 1,
        explanation: 'Stemming reduces words to their root form, as described in section 7.3.'
      },
      {
        question: 'What is the purpose of TF-IDF vectorization?',
        options: [
          'Captures semantic meaning of words',
          'Weighs words based on frequency and uniqueness',
          'Splits text into tokens',
          'Labels parts of speech'
        ],
        correct: 1,
        explanation: 'TF-IDF assigns weights to words based on their frequency in a document and rarity across documents, as explained in section 7.4.'
      },
      {
        question: 'Which NLP application involves assigning labels like "spam" or "not spam" to text?',
        options: [
          'Machine Translation',
          'Text Classification',
          'Question Answering',
          'Text Summarization'
        ],
        correct: 1,
        explanation: 'Text classification assigns labels to text, such as spam detection, as listed in section 7.5.'
      },
      {
        question: 'Which library is best suited for fast, production-ready NLP tasks like tokenization and NER?',
        options: [
          'NLTK',
          'spaCy',
          'TextBlob',
          'Gensim'
        ],
        correct: 1,
        explanation: 'spaCy is optimized for speed and production use, as noted in section 7.6.'
      },
      {
        question: 'In the sentiment analysis example using TextBlob, what does a positive polarity score indicate?',
        options: [
          'Negative sentiment',
          'Positive sentiment',
          'Neutral sentiment',
          'Objective text'
        ],
        correct: 1,
        explanation: 'A positive polarity score (e.g., 0.50) indicates positive sentiment, as shown in section 7.7.'
      },
      {
        question: 'Which pre-trained model is commonly used for contextual text understanding in NLP?',
        options: [
          'Word2Vec',
          'BERT',
          'TF-IDF',
          'Bag of Words'
        ],
        correct: 1,
        explanation: 'BERT provides contextual embeddings for advanced NLP tasks, as mentioned in section 7.6.'
      },
      {
        question: 'What is a key best practice in NLP to ensure robust models?',
        options: [
          'Use raw text without preprocessing',
          'Leverage pre-trained models for fine-tuning',
          'Ignore data biases',
          'Avoid vectorization'
        ],
        correct: 1,
        explanation: 'Fine-tuning pre-trained models like BERT improves performance and efficiency, as recommended in section 7.8.'
      },
      {
        question: 'What is a challenge in NLP related to human language?',
        options: [
          'Lack of computational resources',
          'Handling ambiguity in text',
          'Limited availability of datasets',
          'Inability to process numerical data'
        ],
        correct: 1,
        explanation: 'Ambiguity (e.g., sarcasm, idioms) is a major challenge in NLP, as noted in section 7.1.'
      }
    ]
  }
};
