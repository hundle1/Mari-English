'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, BookOpen, Volume2, Star, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { vocabularyData } from '@/lib/data';

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const wordsPerPage = 20;

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate search loading
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const filteredWords = useMemo(() => {
    return vocabularyData.filter(word => {
      const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          word.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || word.level === levelFilter;
      const matchesCategory = categoryFilter === 'all' || word.category === categoryFilter;
      
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchTerm, levelFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
  const currentWords = filteredWords.slice(
    (currentPage - 1) * wordsPerPage,
    currentPage * wordsPerPage
  );

  const categories = [...new Set(vocabularyData.map(word => word.category))];

  const toggleFavorite = (wordId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(wordId)) {
        newFavorites.delete(wordId);
      } else {
        newFavorites.add(wordId);
      }
      return newFavorites;
    });
  };

  const playPronunciation = (word: string) => {
    // In a real app, this would use Web Speech API or audio files
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading vocabulary words...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          English Vocabulary Builder
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Master over 5,000 essential English words with definitions, examples, and pronunciation guides.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-blue-600">5,000+</div>
            <div className="text-sm text-gray-600">Total Words</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-green-600">{categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-purple-600">{filteredWords.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-orange-600">{favorites.size}</div>
            <div className="text-sm text-gray-600">Favorites</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search words or definitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-3 w-4 h-4 text-blue-600 animate-spin" />
              )}
            </div>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Vocabulary Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentWords.map((word) => (
          <Card key={word.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 flex items-center gap-2">
                    {word.word}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playPronunciation(word.word)}
                      className="p-1 h-auto hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                  <div className="text-sm text-gray-500 mb-2">{word.pronunciation}</div>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getLevelColor(word.level)}>
                      {word.level}
                    </Badge>
                    <Badge variant="outline">
                      {word.category}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(word.id)}
                  className="p-1 h-auto hover:bg-yellow-50 transition-colors"
                >
                  <Star className={`w-4 h-4 transition-colors ${favorites.has(word.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3 text-gray-700">
                {word.definition}
              </CardDescription>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">Example:</div>
                <div className="text-sm text-blue-700 italic">"{word.example}"</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          Next
        </Button>
      </div>
    </div>
  );
}