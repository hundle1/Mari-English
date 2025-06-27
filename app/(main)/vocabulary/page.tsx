"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Volume2, Star, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { VocabularyWord } from "@/types";
import { vocabulary } from "@/lib/vocabulary";
import { folderword } from "@/lib/folderword";
import { FolderWord } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [vocabularyData, setVocabularyData] = useState<VocabularyWord[]>([]);
  const [folderList, setFolderList] = useState<FolderWord[]>([]);
  const wordsPerPage = 20;

  const { user, isLoaded } = useUser();

  // Fetch public vocabulary
  useEffect(() => {
    const fetchData = async () => {
      const res = await vocabulary.getVocabularyWords();
      setVocabularyData(res);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Fetch folderList if logged in
  useEffect(() => {
    const fetchFolders = async () => {
      if (!isLoaded || !user) {
        setFolderList([]);
        return;
      }
      const folders = await folderword.getUserFolders(user.id);
      setFolderList(folders as FolderWord[]);
    };

    fetchFolders();
  }, [user, isLoaded]);

  // Search debounce
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const filteredWords = useMemo(() => {
    return vocabularyData.filter((word) => {
      const matchesSearch =
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === "all" || word.level === levelFilter;
      const matchesCategory =
        categoryFilter === "all" || word.category === categoryFilter;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchTerm, levelFilter, categoryFilter, vocabularyData]);

  const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
  const currentWords = filteredWords.slice(
    (currentPage - 1) * wordsPerPage,
    currentPage * wordsPerPage
  );

  const categories = Array.from(
    new Set(vocabularyData.map((word) => word.category))
  );

  const toggleFavorite = (wordId: string) => {
    setFavorites((prev) => {
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
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading vocabulary words...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">English Vocabulary Builder</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold text-blue-600">
            {vocabularyData.length}
          </div>
          <div className="text-sm text-gray-600">Total Words</div>
        </div>

        <Link href="/vocabulary/folderword" className="block">
          <div className="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer">
            <div className="text-2xl font-bold text-green-600">
              {folderList.length}
            </div>
            <div className="text-sm text-gray-600">Folder Word</div>
          </div>
        </Link>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold text-purple-600">
            {filteredWords.length}
          </div>
          <div className="text-sm text-gray-600">Filtered Results</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold text-orange-600">
            {favorites.size}
          </div>
          <div className="text-sm text-gray-600">Favorites</div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
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
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Word List */}
      {currentWords.length === 0 ? (
        <div className="text-center text-gray-600 italic py-20">
          Hiện chưa có từ vựng nào có sẵn
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentWords.map((word) => (
            <Card key={word.id} className="hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex gap-2 items-center">
                      {word.word}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => playPronunciation(word.word)}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {word.pronunciation}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(word.id)}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        favorites.has(word.id)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{word.definition}</CardDescription>
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <div className="text-sm font-medium text-blue-800">
                    Example:
                  </div>
                  <div className="text-sm italic text-blue-700">
                    &quot;{word.example}&quot;
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
