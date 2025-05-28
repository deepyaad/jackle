
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/SearchFilters";
import { ArtisanCard } from "@/components/ArtisanCard";
import { useSearch } from "@/contexts/SearchContext";
import { Button } from "@/components/ui/button";
import { Grid, List, SortAsc } from "lucide-react";
import { useState } from "react";

export const SearchResults = () => {
  const { searchQuery, filteredArtisans } = useSearch();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [likedArtisans, setLikedArtisans] = useState(new Set<number>());

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
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Artisans"}
          </h1>
          <p className="text-slate-600">
            Found {filteredArtisans.length} artisans matching your criteria
          </p>
        </div>

        <SearchFilters />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name</option>
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
            <p className="text-slate-600 text-lg mb-4">No artisans found matching your criteria</p>
            <Button onClick={() => window.location.reload()}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
