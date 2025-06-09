export interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  pronunciation: string;
  example: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  createdAt: Date;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'toeic' | 'ielts';
  section: string;
}

export interface SkillContent {
  id: string;
  title: string;
  description: string;
  content: string;
  skill: 'speaking' | 'reading' | 'writing' | 'listening';
  level: 'beginner' | 'intermediate' | 'advanced';
}