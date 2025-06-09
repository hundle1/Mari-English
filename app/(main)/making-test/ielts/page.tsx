import { Award, Clock, Globe, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function IeltsPage() {
    
  const practiceTests = [
    {
      title: 'IELTS Academic Practice Test 1',
      description: 'Complete Academic IELTS test with all four skills',
      duration: '2h 45min',
      type: 'Academic',
      sections: 'All Skills',
      completed: false
    },
    {
      title: 'IELTS General Training Practice',
      description: 'Full General Training test for immigration/work',
      duration: '2h 45min',
      type: 'General Training',
      sections: 'All Skills',
      completed: true
    },
    {
      title: 'IELTS Speaking Practice',
      description: 'Interactive speaking test simulation',
      duration: '15 min',
      type: 'Both',
      sections: 'Speaking Only',
      completed: false
    },
    {
      title: 'IELTS Writing Task Focus',
      description: 'Concentrated practice for Writing Tasks 1 & 2',
      duration: '60 min',
      type: 'Both',
      sections: 'Writing Only',
      completed: false
    }
  ];

  const testSections = [
    {
      name: 'Listening',
      duration: '30 minutes',
      questions: '40 questions',
      description: '4 sections with increasing difficulty',
      skills: ['Note completion', 'Multiple choice', 'Matching', 'Plan/map labeling']
    },
    {
      name: 'Reading',
      duration: '60 minutes',
      questions: '40 questions',
      description: '3 passages with various question types',
      skills: ['True/False/Not Given', 'Multiple choice', 'Matching headings', 'Summary completion']
    },
    {
      name: 'Writing',
      duration: '60 minutes',
      questions: '2 tasks',
      description: 'Task 1: 150 words, Task 2: 250 words',
      skills: ['Data description', 'Essay writing', 'Argument development', 'Coherence & cohesion']
    },
    {
      name: 'Speaking',
      duration: '11-14 minutes',
      questions: '3 parts',
      description: 'Face-to-face interview with examiner',
      skills: ['Introduction & interview', 'Long turn', 'Discussion', 'Fluency & pronunciation']
    }
  ];

  const bandScores = [
    { band: '9', level: 'Expert', description: 'Fully operational command' },
    { band: '8', level: 'Very Good', description: 'Fully operational with minor errors' },
    { band: '7', level: 'Good', description: 'Operational command with occasional errors' },
    { band: '6', level: 'Competent', description: 'Generally effective command' },
    { band: '5', level: 'Modest', description: 'Partial command with frequent errors' }
  ];

  return (
    <div className="space-y-8">
      {/* IELTS Overview */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-700 text-white p-8 rounded-lg">
        <div className="flex items-center mb-4">
          <Award className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">IELTS Test Preparation</h2>
        </div>
        <p className="text-lg mb-6">
          Prepare for the International English Language Testing System with comprehensive practice materials.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">4</div>
            <div className="text-sm opacity-90">Test Sections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">2</div>
            <div className="text-sm opacity-90">Test Types</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">9</div>
            <div className="text-sm opacity-90">Band Scale</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">2h 45m</div>
            <div className="text-sm opacity-90">Total Duration</div>
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
                  {test.completed && <Star className="w-6 h-6 text-yellow-500" />}
                </div>
                <CardDescription>{test.description}</CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {test.duration}
                  </Badge>
                  <Badge variant="secondary">{test.sections}</Badge>
                  <Badge className={test.type === 'Academic' ? 'bg-blue-600' : test.type === 'General Training' ? 'bg-green-600' : 'bg-purple-600'}>
                    {test.type}
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

      {/* Test Sections */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Test Sections</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {testSections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-600" />
                  {section.name}
                </CardTitle>
                <CardDescription>
                  {section.duration} • {section.questions}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">{section.description}</p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-sm">Key Skills:</h5>
                  <div className="flex flex-wrap gap-2">
                    {section.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Practice {section.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Band Scores and Tips */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              IELTS Band Scores
            </CardTitle>
            <CardDescription>Understanding the 9-band scoring system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bandScores.map((score, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-semibold">Band {score.band} - {score.level}</div>
                    <div className="text-sm text-gray-600">{score.description}</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {score.band}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IELTS Preparation Tips</CardTitle>
            <CardDescription>Expert advice for IELTS success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Academic vs General Training</h5>
                <p className="text-sm text-blue-700">
                  Choose Academic for university study, General Training for immigration or work.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Time Management</h5>
                <p className="text-sm text-green-700">
                  Practice under timed conditions and allocate time wisely across all sections.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-semibold text-purple-800 mb-2">Speaking Practice</h5>
                <p className="text-sm text-purple-700">
                  Record yourself speaking and practice with native speakers when possible.
                </p>
              </div>
              
              <Button className="w-full">
                View All Tips
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}