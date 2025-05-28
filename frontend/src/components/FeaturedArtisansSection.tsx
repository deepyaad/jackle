
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Star, Grid, List, Award, Clock, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
}

interface FeaturedArtisansSectionProps {
  artisans: Artisan[];
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  likedArtisans: Set<number>;
  bookmarkedArtisans: Set<number>;
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
}

export const FeaturedArtisansSection = ({
  artisans,
  viewMode,
  onViewModeChange,
  likedArtisans,
  bookmarkedArtisans,
  onLike,
  onBookmark
}: FeaturedArtisansSectionProps) => {
  const navigate = useNavigate();

  const handleViewProfile = (artisanId: number) => {
    navigate(`/artisan/${artisanId}`);
  };

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Master Artisans</h2>
            <p className="text-xl text-slate-600">
              Meet the exceptional professionals who are redefining their crafts
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className="hover:scale-105 transition-all duration-300"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("list")}
                className="hover:scale-105 transition-all duration-300"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {artisans.map((artisan) => (
            <Card 
              key={artisan.id}
              className="group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-slate-200 hover:border-blue-300 bg-white relative overflow-hidden"
              onClick={() => handleViewProfile(artisan.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <CardContent className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img 
                    src={artisan.portfolioImage} 
                    alt={`${artisan.name}'s work`}
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  
                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLike(artisan.id);
                      }}
                    >
                      <Heart 
                        className={`h-4 w-4 ${likedArtisans.has(artisan.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookmark(artisan.id);
                      }}
                    >
                      <Bookmark 
                        className={`h-4 w-4 ${bookmarkedArtisans.has(artisan.id) ? 'fill-blue-500 text-blue-500' : 'text-slate-600'}`}
                      />
                    </Button>
                  </div>

                  {artisan.featured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                      <Award className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={artisan.image} 
                        alt={artisan.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {artisan.name}
                        </h3>
                        <p className="text-sm text-slate-600">{artisan.specialty}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {artisan.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold text-slate-900">{artisan.rating}</span>
                        <span className="text-slate-500 ml-1">({artisan.reviews})</span>
                      </div>
                      
                      {artisan.experience && (
                        <div className="flex items-center text-slate-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{artisan.experience}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProfile(artisan.id);
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300 px-8"
            onClick={() => navigate('/browse')}
          >
            Discover More Artisans
          </Button>
        </div>
      </div>
    </section>
  );
};
