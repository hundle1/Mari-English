import { Clock, Target, BarChart, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function ToeicPage() {
  const practiceTests = [
    {
      title: 'TOEIC Practice Test 1',
      description: 'Full-length practice test with 200 questions',
      duration: '2 hours',
      sections: 'Listening & Reading',
      difficulty: 'Standard',
      completed: false
    },
    {
      title: 'TOEIC Listening Focus',
      description: 'Concentrated listening practice with 100 questions',
      duration: '45 min',
      sections: 'Listening Only',
      difficulty: 'Standard',
      completed: true
    },
    {
      title: 'TOEIC Reading Focus',
      description: 'Reading comprehension practice with 100 questions',
      duration: '75 min',
      sections: 'Reading Only',
      difficulty: 'Standard',
      completed: false
    },
    {
      title: 'TOEIC Challenge Test',
      description: 'Advanced level practice for high scorers',
      duration: '2 hours',
      sections: 'Listening & Reading',
      difficulty: 'Advanced',
      completed: false
    }
  ];

  const testSections = [
    {
      name: 'Listening',
      parts: [
        'Part 1: Photographs (6 questions)',
        'Part 2: Question-Response (25 questions)',
        'Part 3: Conversations (39 questions)',
        'Part 4: Talks (30 questions)'
      ],
      totalQuestions: 100,
      timeLimit: '45 minutes'
    },
    {
      name: 'Reading',
      parts: [
        'Part 5: Incomplete Sentences (30 questions)',
        'Part 6: Text Completion (16 questions)',
        'Part 7: Reading Comprehension (54 questions)'
      ],
      totalQuestions: 100,
      timeLimit: '75 minutes'
    }
  ];

  const tips = [
    'Practice time management - pace yourself throughout the test',
    'Read all answer choices before selecting your answer',
    'Don\'t spend too much time on difficult questions',
    'Use process of elimination for multiple choice questions',
    'Practice with authentic TOEIC materials'
  ];

  return (
    <div className="space-y-8">
      {/* TOEIC Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg">
        <div className="flex items-center mb-4">
          <Target className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">TOEIC Test Preparation</h2>
        </div>
        <p className="text-lg mb-6">
          Master the Test of English for International Communication with our comprehensive practice materials.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">200</div>
            <div className="text-sm opacity-90">Total Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">2</div>
            <div className="text-sm opacity-90">Main Sections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">990</div>
            <div className="text-sm opacity-90">Maximum Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">2h</div>
            <div className="text-sm opacity-90">Test Duration</div>
          </div>
        </div>
      </div>

      {/* Practice Tests */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Practice Tests</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {practiceTests.map((test, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{test.title}</CardTitle>
                  {test.completed && <CheckCircle className="w-6 h-6 text-green-600" />}
                </div>
                <CardDescription>{test.description}</CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {test.duration}
                  </Badge>
                  <Badge variant="secondary">{test.sections}</Badge>
                  <Badge className={test.difficulty === 'Advanced' ? 'bg-red-600' : 'bg-blue-600'}>
                    {test.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant={test.completed ? 'outline' : 'default'}>
                  {test.completed ? 'Retake Test' : 'Start Test'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Test Structure */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Test Structure</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {testSections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                  {section.name} Section
                </CardTitle>
                <CardDescription>
                  {section.totalQuestions} questions • {section.timeLimit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.parts.map((part, partIndex) => (
                    <li key={partIndex} className="text-sm text-gray-700 flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {part}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Practice This Section
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Test Tips and Score Guide */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Test-Taking Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Guide</CardTitle>
            <CardDescription>TOEIC scoring system and proficiency levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Advanced (860-990)</span>
                <Badge className="bg-green-600">Expert</Badge>
              </div>
              <Progress value={95} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Upper-Intermediate (730-855)</span>
                <Badge className="bg-blue-600">Proficient</Badge>
              </div>
              <Progress value={75} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Intermediate (470-725)</span>
                <Badge className="bg-yellow-600">Competent</Badge>
              </div>
              <Progress value={55} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Elementary (220-465)</span>
                <Badge className="bg-orange-600">Basic</Badge>
              </div>
              <Progress value={35} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}