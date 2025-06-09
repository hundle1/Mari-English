import { PenTool, FileText, CheckCircle, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export default function WritingPage() {
  const writingExercises = [
    {
      title: 'Essay Writing',
      description: 'Learn to structure and write compelling essays',
      level: 'Intermediate',
      type: 'Academic',
      tasks: 15
    },
    {
      title: 'Business Communication',
      description: 'Professional emails, reports, and presentations',
      level: 'Advanced',
      type: 'Professional',
      tasks: 12
    },
    {
      title: 'Creative Writing',
      description: 'Express yourself through stories and creative pieces',
      level: 'All Levels',
      type: 'Creative',
      tasks: 20
    },
    {
      title: 'Grammar Practice',
      description: 'Improve your grammar through targeted exercises',
      level: 'Beginner',
      type: 'Foundation',
      tasks: 25
    }
  ];

  const writingTips = [
    'Plan your writing before you start',
    'Use topic sentences for each paragraph',
    'Vary your sentence structure and length',
    'Always proofread and edit your work',
    'Read your writing aloud to check flow'
  ];

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-lg">
        <div className="flex items-center mb-4">
          <PenTool className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">Writing Skills</h2>
        </div>
        <p className="text-lg mb-6">
          Master English writing from basic grammar to advanced composition techniques.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">100+</div>
            <div className="text-sm opacity-90">Writing Exercises</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">6</div>
            <div className="text-sm opacity-90">Writing Types</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">AI</div>
            <div className="text-sm opacity-90">Feedback System</div>
          </div>
        </div>
      </div>

      {/* Writing Exercises */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Writing Exercises</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {writingExercises.map((exercise, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{exercise.title}</CardTitle>
                  <Edit className="w-6 h-6 text-purple-600" />
                </div>
                <CardDescription>{exercise.description}</CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline">{exercise.level}</Badge>
                  <Badge variant="secondary">{exercise.type}</Badge>
                  <Badge>{exercise.tasks} tasks</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Start Writing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Writing Practice Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Quick Writing Practice
          </CardTitle>
          <CardDescription>
            Practice your writing skills with this interactive writing area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Today's Writing Prompt:</h4>
              <p className="text-blue-700">
                "Describe your ideal vacation destination and explain why it appeals to you. 
                Include details about the location, activities, and what makes it special."
              </p>
            </div>
            <Textarea
              placeholder="Start writing your response here..."
              className="min-h-[200px]"
            />
            <div className="flex gap-4">
              <Button>Submit for Review</Button>
              <Button variant="outline">Save Draft</Button>
              <Button variant="outline">Grammar Check</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writing Tips and Tools */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Writing Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {writingTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Writing Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Access helpful tools and resources to improve your writing skills.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Grammar Guide
              </Button>
              <Button variant="outline" className="w-full">
                Vocabulary Builder
              </Button>
              <Button variant="outline" className="w-full">
                Style Checker
              </Button>
              <Button variant="outline" className="w-full">
                Writing Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}