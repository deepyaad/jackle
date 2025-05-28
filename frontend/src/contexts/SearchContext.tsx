
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Artisan {
  id: number;
  name: string;
  specialty: string;
  location: string;
  image: string;
  portfolioImage: string;
  rating: number;
  reviews: number;
  featured: boolean;
  experience?: string;
  responseTime?: string;
  bio?: string;
  priceRange?: string;
  skills?: string[];
  portfolio?: string[];
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  priceFilter: string;
  setPriceFilter: (price: string) => void;
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;
  filteredArtisans: Artisan[];
  allArtisans: Artisan[];
  setAllArtisans: (artisans: Artisan[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [allArtisans, setAllArtisans] = useState<Artisan[]>([]);

  const filteredArtisans = allArtisans.filter(artisan => {
    const matchesSearch = searchQuery === "" || 
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || artisan.specialty === selectedCategory;
    const matchesLocation = !locationFilter || artisan.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesRating = ratingFilter === 0 || artisan.rating >= ratingFilter;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesRating;
  });

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      locationFilter,
      setLocationFilter,
      priceFilter,
      setPriceFilter,
      ratingFilter,
      setRatingFilter,
      filteredArtisans,
      allArtisans,
      setAllArtisans
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
