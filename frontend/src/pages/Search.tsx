
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/SearchFilters";
import { ArtisanCard } from "@/components/ArtisanCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useSearch } from "@/contexts/SearchContext";
import { Search as SearchIcon, Grid, List, Filter, Sparkles } from "lucide-react";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, filteredArtisans, allArtisans } = useSearch();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [likedArtisans, setLikedArtisans] = useState(new Set<number>());
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const criteriaParam = searchParams.get('criteria') || searchParams.get('q') || "";

  useEffect(() => {
    if (criteriaParam) {
      setSearchQuery(criteriaParam);
      setLocalSearchQuery(criteriaParam);
    }
  }, [criteriaParam, setSearchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery);
      setSearchParams({ criteria: localSearchQuery });
    } else {
      setSearchQuery("");
      setSearchParams({});
    }
  };

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

  const sortedArtisans = [...filteredArtisans].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "name":
        return a.name.localeCompare(b.name);
      case "featured":
        return Number(b.featured) - Number(a.featured);
      default:
        return 0;
    }
  });

  const trendingSearches = ["Hair Styling", "Tattoo Artist", "Wedding Photography", "Custom Jewelry", "Portrait Artist"];
  const recentSearches = ["Maya Chen", "Brooklyn Artists", "Nail Art Miami"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Discover Amazing Artisans"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {searchQuery 
              ? `Found ${filteredArtisans.length} artisan${filteredArtisans.length !== 1 ? 's' : ''} matching your search`
              : "Search through our curated collection of talented artisans and creators"
            }
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 animate-scale-in">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for artisans, specialties, or locations..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all"
              >
                <SearchIcon className="h-5 w-5 mr-2" />
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Searches - Show when no search results */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  Trending Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLocalSearchQuery(term);
                        setSearchQuery(term);
                        setSearchParams({ criteria: term });
                      }}
                      className="hover:scale-105 transition-all"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Searches</h3>
                <div className="space-y-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setLocalSearchQuery(term);
                        setSearchQuery(term);
                        setSearchParams({ criteria: term });
                      }}
                      className="block text-left text-gray-600 hover:text-blue-600 transition-colors hover:scale-105"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search Results */}
        {(searchQuery || filteredArtisans.length > 0) && (
          <>
            {/* Filters Toggle */}
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="flex items-center space-x-2 hover:scale-105 transition-all"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="featured">Featured</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                    className="hover:scale-105 transition-all"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                    className="hover:scale-105 transition-all"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mb-8">
                <SearchFilters />
              </div>
            )}

            {/* Results Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedArtisans.map((artisan, index) => (
                <div 
                  key={artisan.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ArtisanCard
                    artisan={artisan}
                    onLike={handleLike}
                    liked={likedArtisans.has(artisan.id)}
                  />
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredArtisans.length === 0 && searchQuery && (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No artisans found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any artisans matching "{searchQuery}". Try adjusting your search or browse our categories.
                </p>
                <div className="space-x-4">
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setLocalSearchQuery("");
                      setSearchParams({});
                    }}
                    variant="outline"
                  >
                    Clear Search
                  </Button>
                  <Button onClick={() => navigate('/browse')}>
                    Browse Categories
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* All Artisans - Show when no search query */}
        {!searchQuery && allArtisans.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Artisans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allArtisans.map((artisan, index) => (
                <div 
                  key={artisan.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ArtisanCard
                    artisan={artisan}
                    onLike={handleLike}
                    liked={likedArtisans.has(artisan.id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};
