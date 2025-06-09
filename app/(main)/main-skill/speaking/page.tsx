import { Mic, PlayCircle, Users, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SpeakingPage() {
  const exercises = [
    {
      title: 'Pronunciation Practice',
      description: 'Perfect your English pronunciation with guided exercises',
      level: 'All Levels',
      duration: '15 min',
      type: 'Interactive'
    },
    {
      title: 'Conversation Starters',
      description: 'Learn how to start and maintain conversations in English',
      level: 'Beginner',
      duration: '20 min',
      type: 'Practice'
    },
    {
      title: 'Business Presentations',
      description: 'Master professional speaking skills for the workplace',
      level: 'Advanced',
      duration: '30 min',
      type: 'Professional'
    },
    {
      title: 'Accent Reduction',
      description: 'Improve your English accent and clarity',
      level: 'Intermediate',
      duration: '25 min',
      type: 'Specialized'
    }
  ];

  const tips = [
    'Practice speaking daily, even if just for 5 minutes',
    'Record yourself speaking and listen back for improvement',
    'Focus on one sound at a time when practicing pronunciation',
    'Use tongue twisters to improve articulation',
    'Practice with native speakers when possible'
  ];

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
        <div className="flex items-center mb-4">
          <Mic className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">Speaking Skills</h2>
        </div>
        <p className="text-lg mb-6">
          Develop confidence and fluency in English speaking through our comprehensive training modules.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">150+</div>
            <div className="text-sm opacity-90">Speaking Exercises</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">4</div>
            <div className="text-sm opacity-90">Skill Levels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">24/7</div>
            <div className="text-sm opacity-90">Practice Access</div>
          </div>
        </div>
      </div>

      {/* Speaking Exercises */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Speaking Exercises</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {exercises.map((exercise, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{exercise.title}</CardTitle>
                  <PlayCircle className="w-6 h-6 text-blue-600" />
                </div>
                <CardDescription>{exercise.description}</CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline">{exercise.level}</Badge>
                  <Badge variant="secondary">{exercise.duration}</Badge>
                  <Badge>{exercise.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Start Exercise
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Speaking Tips */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Speaking Tips
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
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-500" />
              Practice Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Connect with other learners or native speakers to practice your speaking skills in real conversations.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Find Practice Partner
              </Button>
              <Button variant="outline" className="w-full">
                Join Speaking Club
              </Button>
              <Button variant="outline" className="w-full">
                Schedule with Tutor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}