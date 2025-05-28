
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedArtisansSection } from "@/components/FeaturedArtisansSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Footer } from "@/components/Footer";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { animationStyles } from "@/styles/animations";

const Index = () => {
  const { selectedCategory, setSelectedCategory, setAllArtisans, filteredArtisans } = useSearch();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [likedArtisans, setLikedArtisans] = useState(new Set<number>());
  const [bookmarkedArtisans, setBookmarkedArtisans] = useState(new Set<number>());

  const featuredArtisans = [
    {
      id: 1,
      name: "Maya Chen",
      specialty: "Hair Styling",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      portfolioImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      rating: 4.9,
      reviews: 127,
      featured: true,
      experience: "5 years",
      responseTime: "2 hours",
      bio: "Passionate hair stylist specializing in modern cuts and color transformations.",
      priceRange: "$$$ ($300 - $500)",
      skills: ["Hair Cutting", "Color Theory", "Balayage", "Wedding Styles", "Extensions"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      specialty: "Tattoo",
      location: "Brooklyn, NY",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      portfolioImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80",
      rating: 4.8,
      reviews: 89,
      featured: false,
      experience: "8 years",
      responseTime: "4 hours"
    },
    {
      id: 3,
      name: "Isabella Rodriguez",
      specialty: "Nail Art",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      portfolioImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      rating: 4.9,
      reviews: 156,
      featured: true
    },
    {
      id: 4,
      name: "Alessandro Rossi",
      specialty: "Culinary",
      location: "Portland, OR",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      portfolioImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      rating: 4.7,
      reviews: 203,
      featured: false
    },
    {
      id: 5,
      name: "Sophie Williams",
      specialty: "Fashion",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      portfolioImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      rating: 4.8,
      reviews: 94,
      featured: true
    },
    {
      id: 6,
      name: "David Kim",
      specialty: "Barbering",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      portfolioImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      rating: 4.9,
      reviews: 178,
      featured: false
    }
  ];

  useEffect(() => {
    setAllArtisans(featuredArtisans);
  }, [setAllArtisans]);

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

  const handleBookmark = (artisanId: number) => {
    setBookmarkedArtisans(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artisanId)) {
        newSet.delete(artisanId);
      } else {
        newSet.add(artisanId);
      }
      return newSet;
    });
  };

  const personalizedContent = isAuthenticated ? (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-xl text-gray-600">
            Here's what's new in your personalized feed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-all hover:scale-105 animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Your Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">{likedArtisans.size}</div>
              <p className="text-sm text-gray-600">Artisans you've liked</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 hover:scale-105 transition-all"
                onClick={() => navigate('/profile')}
              >
                View All
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:scale-105 animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">Hair Styling</Badge>
                <Badge variant="secondary" className="mr-2">Tattoo Art</Badge>
                <Badge variant="secondary">Wedding Photography</Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 hover:scale-105 transition-all"
                onClick={() => navigate('/browse')}
              >
                Explore
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:scale-105 animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                New Artists
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
              <p className="text-sm text-gray-600">New this week</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 hover:scale-105 transition-all"
                onClick={() => navigate('/search')}
              >
                Discover
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  ) : (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Discover Amazing Artisans
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with talented creators, browse their work, and find the perfect artisan for your next project
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Verified Quality</h3>
            <p className="text-gray-600">All artisans are verified for quality and professionalism</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Trending Talent</h3>
            <p className="text-gray-600">Discover the hottest artisans in your area</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community Driven</h3>
            <p className="text-gray-600">Real reviews from real customers</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <style>{animationStyles}</style>
      <Header />
      <HeroSection />
      {personalizedContent}
      <CategoriesSection 
        selectedCategory={selectedCategory} 
        onCategorySelect={setSelectedCategory} 
      />
      <FeaturedArtisansSection 
        artisans={filteredArtisans}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        likedArtisans={likedArtisans}
        bookmarkedArtisans={bookmarkedArtisans}
        onLike={handleLike}
        onBookmark={handleBookmark}
      />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default Index;
