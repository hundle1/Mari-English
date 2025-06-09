import { Headphones, Play, Volume2, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function ListeningPage() {
  const listeningExercises = [
    {
      title: 'Conversations',
      description: 'Real-life dialogues and everyday conversations',
      level: 'Beginner',
      duration: '3-5 min',
      type: 'Dialogue',
      progress: 75
    },
    {
      title: 'News Reports',
      description: 'Current events and news broadcasts',
      level: 'Intermediate',
      duration: '5-8 min',
      type: 'News',
      progress: 40
    },
    {
      title: 'Lectures',
      description: 'Academic lectures and presentations',
      level: 'Advanced',
      duration: '10-15 min',
      type: 'Academic',
      progress: 20
    },
    {
      title: 'Podcasts',
      description: 'Casual conversations and interviews',
      level: 'Intermediate',
      duration: '8-12 min',
      type: 'Entertainment',
      progress: 60
    }
  ];

  const listeningStrategies = [
    'Listen for main ideas first, details second',
    'Pay attention to tone and emotion',
    'Use context clues to understand unfamiliar words',
    'Take notes while listening to longer passages',
    'Practice active listening - predict what comes next'
  ];

  const accents = [
    { name: 'American English', flag: '🇺🇸', available: true },
    { name: 'British English', flag: '🇬🇧', available: true },
    { name: 'Australian English', flag: '🇦🇺', available: true },
    { name: 'Canadian English', flag: '🇨🇦', available: true },
    { name: 'Indian English', flag: '🇮🇳', available: false },
    { name: 'South African English', flag: '🇿🇦', available: false }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-8 rounded-lg">
        <div className="flex items-center mb-4">
          <Headphones className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">Listening Comprehension</h2>
        </div>
        <p className="text-lg mb-6">
          Improve your English listening skills with diverse audio content and interactive exercises.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">300+</div>
            <div className="text-sm opacity-90">Audio Exercises</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">6</div>
            <div className="text-sm opacity-90">English Accents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">HD</div>
            <div className="text-sm opacity-90">Audio Quality</div>
          </div>
        </div>
      </div>

      {/* Listening Exercises */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Listening Exercises</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {listeningExercises.map((exercise, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{exercise.title}</CardTitle>
                  <Play className="w-6 h-6 text-indigo-600" />
                </div>
                <CardDescription>{exercise.description}</CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline">{exercise.level}</Badge>
                  <Badge variant="secondary">{exercise.duration}</Badge>
                  <Badge>{exercise.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{exercise.progress}%</span>
                  </div>
                  <Progress value={exercise.progress} className="h-2" />
                </div>
                <Button className="w-full">
                  {exercise.progress > 0 ? 'Continue Listening' : 'Start Exercise'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Accent Training */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-green-600" />
            Accent Training
          </CardTitle>
          <CardDescription>
            Practice listening to different English accents from around the world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accents.map((accent, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  accent.available
                    ? 'border-green-200 bg-green-50 hover:bg-green-100'
                    : 'border-gray-200 bg-gray-50'
                } transition-colors`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{accent.flag}</span>
                  {accent.available ? (
                    <Badge className="bg-green-600">Available</Badge>
                  ) : (
                    <Badge variant="secondary">Coming Soon</Badge>
                  )}
                </div>
                <h4 className="font-semibold text-gray-800">{accent.name}</h4>
                {accent.available && (
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Practice
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Listening Strategies and Tools */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Listening Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {listeningStrategies.map((strategy, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{strategy}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listening Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Use our advanced listening tools to enhance your learning experience.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Speed Controller
              </Button>
              <Button variant="outline" className="w-full">
                Transcript Toggle
              </Button>
              <Button variant="outline" className="w-full">
                Loop Sections
              </Button>
              <Button variant="outline" className="w-full">
                Audio Dictionary
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}