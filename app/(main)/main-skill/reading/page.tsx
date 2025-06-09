import { BookOpen, Clock, Target, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function ReadingPage() {
  const readingMaterials = [
    {
      title: 'News Articles',
      description: 'Current events and news stories for intermediate to advanced readers',
      level: 'Intermediate',
      time: '10-15 min',
      category: 'News',
      progress: 65
    },
    {
      title: 'Short Stories',
      description: 'Engaging fiction stories to improve comprehension',
      level: 'Beginner',
      time: '15-20 min',
      category: 'Fiction',
      progress: 80
    },
    {
      title: 'Academic Texts',
      description: 'Scientific and academic papers for advanced readers',
      level: 'Advanced',
      time: '20-30 min',
      category: 'Academic',
      progress: 30
    },
    {
      title: 'Business Reports',
      description: 'Professional documents and business communications',
      level: 'Intermediate',
      time: '12-18 min',
      category: 'Business',
      progress: 45
    }
  ];

  const strategies = [
    'Skimming: Read quickly to get the main idea',
    'Scanning: Look for specific information',
    'Prediction: Guess what comes next based on context',
    'Context clues: Use surrounding words to understand unfamiliar terms',
    'Summary: Recap what you\'ve read in your own words'
  ];

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-lg">
        <div className="flex items-center mb-4">
          <BookOpen className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">Reading Comprehension</h2>
        </div>
        <p className="text-lg mb-6">
          Enhance your reading skills with diverse texts and proven comprehension strategies.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">200+</div>
            <div className="text-sm opacity-90">Reading Passages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">8</div>
            <div className="text-sm opacity-90">Text Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">94%</div>
            <div className="text-sm opacity-90">Improvement Rate</div>
          </div>
        </div>
      </div>

      {/* Reading Materials */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Reading Materials</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {readingMaterials.map((material, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{material.title}</CardTitle>
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardDescription>{material.description}</CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline">{material.level}</Badge>
                  <Badge variant="secondary">{material.time}</Badge>
                  <Badge>{material.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{material.progress}%</span>
                  </div>
                  <Progress value={material.progress} className="h-2" />
                </div>
                <Button className="w-full">
                  {material.progress > 0 ? 'Continue Reading' : 'Start Reading'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reading Strategies and Tools */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Reading Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {strategies.map((strategy, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{strategy}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Reading Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Use our built-in tools to enhance your reading experience and track your progress.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Dictionary Lookup
              </Button>
              <Button variant="outline" className="w-full">
                Speed Reading Test
              </Button>
              <Button variant="outline" className="w-full">
                Comprehension Quiz
              </Button>
              <Button variant="outline" className="w-full">
                Reading Statistics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}