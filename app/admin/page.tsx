'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { vocabularyData } from '@/lib/data';
import { VocabularyWord } from '@/types';

export default function AdminPage() {
  const [words, setWords] = useState<VocabularyWord[]>(vocabularyData);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabularyWord | null>(null);
  const [formData, setFormData] = useState({
    word: '',
    definition: '',
    pronunciation: '',
    example: '',
    level: 'beginner' as const,
    category: ''
  });

  const filteredWords = words.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || word.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleSubmit = () => {
    if (editingWord) {
      // Update existing word
      setWords(words.map(word => 
        word.id === editingWord.id 
          ? { ...editingWord, ...formData, createdAt: word.createdAt }
          : word
      ));
    } else {
      // Add new word
      const newWord: VocabularyWord = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date()
      };
      setWords([newWord, ...words]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      word: '',
      definition: '',
      pronunciation: '',
      example: '',
      level: 'beginner',
      category: ''
    });
    setEditingWord(null);
  };

  const handleEdit = (word: VocabularyWord) => {
    setEditingWord(word);
    setFormData({
      word: word.word,
      definition: word.definition,
      pronunciation: word.pronunciation,
      example: word.example,
      level: word.level,
      category: word.category
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setWords(words.filter(word => word.id !== id));
  };

  const stats = [
    { label: 'Total Words', value: words.length, color: 'text-blue-600' },
    { label: 'Beginner', value: words.filter(w => w.level === 'beginner').length, color: 'text-green-600' },
    { label: 'Intermediate', value: words.filter(w => w.level === 'intermediate').length, color: 'text-yellow-600' },
    { label: 'Advanced', value: words.filter(w => w.level === 'advanced').length, color: 'text-red-600' }
  ];

  const categories = [...new Set(words.map(word => word.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Content Management</h2>
        <p className="text-gray-600">Manage vocabulary words, test questions, and learning content.</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className={`w-8 h-8 ${stat.color} mr-3`} />
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Vocabulary Management</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Word
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingWord ? 'Edit Word' : 'Add New Word'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingWord ? 'Update the word details below.' : 'Enter the details for the new vocabulary word.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="word">Word</Label>
                      <Input
                        id="word"
                        value={formData.word}
                        onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                        placeholder="Enter word"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pronunciation">Pronunciation</Label>
                      <Input
                        id="pronunciation"
                        value={formData.pronunciation}
                        onChange={(e) => setFormData({ ...formData, pronunciation: e.target.value })}
                        placeholder="/prəˌnʌnsiˈeɪʃən/"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="definition">Definition</Label>
                    <Textarea
                      id="definition"
                      value={formData.definition}
                      onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                      placeholder="Enter definition"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="example">Example</Label>
                    <Textarea
                      id="example"
                      value={formData.example}
                      onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                      placeholder="Enter example sentence"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="level">Level</Label>
                      <Select value={formData.level} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setFormData({ ...formData, level: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="noun, verb, adjective..."
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingWord ? 'Update' : 'Add'} Word
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Badge variant="outline">{filteredWords.length} words</Badge>
              <Badge variant="secondary">{categories.length} categories</Badge>
            </div>
          </div>

          {/* Words Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b">
              <div className="grid grid-cols-5 gap-4 font-medium text-gray-700">
                <div>Word</div>
                <div>Definition</div>
                <div>Level</div>
                <div>Category</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredWords.map((word) => (
                <div key={word.id} className="px-6 py-4 border-b hover:bg-gray-50">
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div>
                      <div className="font-semibold">{word.word}</div>
                      <div className="text-sm text-gray-500">{word.pronunciation}</div>
                    </div>
                    <div className="text-sm text-gray-700 truncate" title={word.definition}>
                      {word.definition}
                    </div>
                    <div>
                      <Badge 
                        className={
                          word.level === 'beginner' ? 'bg-green-100 text-green-800' :
                          word.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {word.level}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant="outline">{word.category}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(word)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(word.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}