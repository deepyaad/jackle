
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, DollarSign, Filter } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";
import { useState } from "react";

export const SearchFilters = () => {
  const {
    locationFilter,
    setLocationFilter,
    priceFilter,
    setPriceFilter,
    ratingFilter,
    setRatingFilter
  } = useSearch();
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setLocationFilter("");
    setPriceFilter("");
    setRatingFilter(0);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Button
        onClick={() => setShowFilters(!showFilters)}
        variant="outline"
        className="mb-4 flex items-center space-x-2"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </Button>

      {showFilters && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="location" className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Enter city or state"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="price" className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Price Range</span>
                </Label>
                <select
                  id="price"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Any Price</option>
                  <option value="$">$ (Under $100)</option>
                  <option value="$$">$$ ($100 - $300)</option>
                  <option value="$$$">$$$ ($300 - $500)</option>
                  <option value="$$$$">$$$$ ($500+)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="rating" className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4" />
                  <span>Minimum Rating</span>
                </Label>
                <select
                  id="rating"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(Number(e.target.value))}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
