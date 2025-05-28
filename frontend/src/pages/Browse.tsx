
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArtisanCard } from "@/components/ArtisanCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSearch } from "@/contexts/SearchContext";
import { Grid, List, Filter, ArrowLeft } from "lucide-react";

export const Browse = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { allArtisans, setSelectedCategory } = useSearch();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [likedArtisans, setLikedArtisans] = useState(new Set<number>());

  const location = searchParams.get('location');
  const specialty = searchParams.get('specialty');

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category, setSelectedCategory]);

  const handleLike = (artisanId: number) => {
    setLikedArtisans(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artisanId)) {
        newSet.delete(artisanId);
      } else {
        newSet.add(artisanId);
      }
      return newSet;
    });
  };

  // Filter artisans based on URL parameters
  const filteredArtisans = allArtisans.filter(artisan => {
    const matchesCategory = !category || artisan.specialty === category;
    const matchesLocation = !location || artisan.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpecialty = !specialty || artisan.specialty.toLowerCase().includes(specialty.toLowerCase());
    
    return matchesCategory && matchesLocation && matchesSpecialty;
  });

  // Sort artisans
  const sortedArtisans = [...filteredArtisans].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return Number(b.featured) - Number(a.featured);
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categories = [
    { name: "Hair Styling", icon: "✂️", count: 127 },
    { name: "Nail Art", icon: "💅", count: 89 },
    { name: "Tattoo", icon: "🎨", count: 156 },
    { name: "Culinary", icon: "👨‍🍳", count: 203 },
    { name: "Fashion", icon: "👗", count: 94 },
    { name: "Barbering", icon: "🪒", count: 178 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6 flex items-center space-x-2 hover:scale-105 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {category ? `${category} Artisans` : "Browse All Artisans"}
          </h1>
          <p className="text-xl text-slate-600">
            {category 
              ? `Discover talented ${category.toLowerCase()} professionals` 
              : "Explore our community of skilled artisans"
            }
          </p>
          {location && (
            <Badge className="mt-2 bg-blue-100 text-blue-800">
              📍 {location}
            </Badge>
          )}
        </div>

        {/* Quick Category Navigation */}
        {!category && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                  <Button
                    key={cat.name}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => navigate(`/browse/${cat.name}`)}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                    <span className="text-xs text-slate-500">{cat.count}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">
              {sortedArtisans.length} artisan{sortedArtisans.length !== 1 ? 's' : ''} found
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Artisans Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {sortedArtisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id}
              artisan={artisan}
              onLike={handleLike}
              liked={likedArtisans.has(artisan.id)}
            />
          ))}
        </div>

        {filteredArtisans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg mb-4">
              No artisans found in this category
            </p>
            <Button onClick={() => navigate('/browse')}>
              Browse All Categories
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
