import { VocabularyWord, TestQuestion, SkillContent } from '@/types';

// Sample vocabulary data (5000+ words would be too large for this example, so showing structure)
export const vocabularyData: VocabularyWord[] = [
  {
    id: '1',
    word: 'abundant',
    definition: 'existing in large quantities; plentiful',
    pronunciation: '/əˈbʌndənt/',
    example: 'The region has abundant natural resources.',
    level: 'intermediate',
    category: 'adjective',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    word: 'analyze',
    definition: 'examine methodically and in detail',
    pronunciation: '/ˈænəlaɪz/',
    example: 'We need to analyze the data carefully.',
    level: 'intermediate',
    category: 'verb',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    word: 'comprehend',
    definition: 'grasp mentally; understand',
    pronunciation: '/ˌkɒmprɪˈhend/',
    example: 'It is difficult to comprehend the vastness of space.',
    level: 'advanced',
    category: 'verb',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '4',
    word: 'diligent',
    definition: 'having or showing care and conscientiousness',
    pronunciation: '/ˈdɪlɪdʒənt/',
    example: 'She was diligent in her studies.',
    level: 'intermediate',
    category: 'adjective',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '5',
    word: 'elaborate',
    definition: 'involving many carefully arranged parts; detailed',
    pronunciation: '/ɪˈlæbərət/',
    example: 'They made elaborate plans for the wedding.',
    level: 'advanced',
    category: 'adjective',
    createdAt: new Date('2024-01-01')
  },
  // Add more words following this pattern...
  ...Array.from({ length: 95 }, (_, i) => ({
    id: `${i + 6}`,
    word: `word${i + 6}`,
    definition: `Definition for word ${i + 6}`,
    pronunciation: `/wɜːrd${i + 6}/`,
    example: `Example sentence for word ${i + 6}.`,
    level: (['beginner', 'intermediate', 'advanced'] as const)[i % 3],
    category: ['noun', 'verb', 'adjective', 'adverb'][i % 4],
    createdAt: new Date('2024-01-01')
  }))
];

export const testQuestions: TestQuestion[] = [
  {
    id: '1',
    question: 'What is the main idea of the passage?',
    options: [
      'The importance of education',
      'The benefits of technology',
      'The challenges of modern life',
      'The need for environmental protection'
    ],
    correctAnswer: 0,
    explanation: 'The passage primarily discusses the importance of education in modern society.',
    type: 'toeic',
    section: 'reading'
  },
  {
    id: '2',
    question: 'Choose the best word to complete the sentence: "The company has experienced _____ growth this year."',
    options: ['significant', 'significantly', 'significance', 'signify'],
    correctAnswer: 0,
    explanation: 'An adjective is needed to modify the noun "growth".',
    type: 'toeic',
    section: 'grammar'
  }
];

export const skillContent: SkillContent[] = [
  {
    id: '1',
    title: 'Introduction to English Speaking',
    description: 'Learn the fundamentals of English pronunciation and conversation',
    content: 'Speaking English fluently requires practice and confidence...',
    skill: 'speaking',
    level: 'beginner'
  },
  {
    id: '2',
    title: 'Reading Comprehension Strategies',
    description: 'Improve your reading skills with proven techniques',
    content: 'Effective reading involves understanding context, vocabulary, and main ideas...',
    skill: 'reading',
    level: 'intermediate'
  }
];