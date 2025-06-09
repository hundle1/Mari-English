
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, FileText, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


export default function HomePage() {

  const features = [
    {
      icon: BookOpen,
      title: 'Vocabulary Builder',
      description: 'Master 5000+ essential English words with definitions, examples, and pronunciation guides.',
      href: '/vocabulary',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Skill Development',
      description: 'Improve your speaking, reading, writing, and listening skills with structured lessons.',
      href: '/main-skill',
      color: 'bg-green-500'
    },
    {
      icon: FileText,
      title: 'Test Preparation',
      description: 'Practice TOEIC and IELTS tests with real exam formats and detailed explanations.',
      href: '/making-test',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { label: 'Vocabulary Words', value: '5,000+' },
    { label: 'Practice Tests', value: '200+' },
    { label: 'Skill Lessons', value: '150+' },
    { label: 'Success Rate', value: '94%' }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold m-6 mb-8 text-white">
              Master English with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-colors h-36 m-4 text-[120px] ">
                MARI English
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Transform your English skills with our comprehensive learning platform.
              From vocabulary building to test preparation, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/making-test/toeic" className="inline-block">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white bg-inherit hover:text-blue-600">
                  Take Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform offers all the tools and resources you need to master English.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={feature.href}>
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Content */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Learning Content
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular and effective learning materials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit mb-2">Vocabulary</Badge>
                <CardTitle>Business English Words</CardTitle>
                <CardDescription>
                  Essential vocabulary for professional communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>4.9 (234 reviews)</span>
                </div>
                <Button variant="outline" className="w-full">
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit mb-2" variant="secondary">Speaking</Badge>
                <CardTitle>Pronunciation Mastery</CardTitle>
                <CardDescription>
                  Perfect your English pronunciation with guided practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span>92% improvement rate</span>
                </div>
                <Button variant="outline" className="w-full">
                  Practice Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit mb-2" variant="destructive">Test Prep</Badge>
                <CardTitle>TOEIC Practice Tests</CardTitle>
                <CardDescription>
                  Full-length practice tests with detailed explanations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FileText className="w-4 h-4 text-blue-400 mr-1" />
                  <span>50+ practice tests</span>
                </div>
                <Button variant="outline" className="w-full">
                  Take Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}