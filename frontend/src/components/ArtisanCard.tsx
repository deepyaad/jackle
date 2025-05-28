import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Heart, Eye, Clock, Award, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ArtisanCardProps {
  artisan: {
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
  };
  onLike?: (id: number) => void;
  onBookmark?: (id: number) => void;
  liked?: boolean;
  bookmarked?: boolean;
}

export const ArtisanCard = ({ 
  artisan, 
  onLike, 
  onBookmark, 
  liked = false, 
  bookmarked = false 
}: ArtisanCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/artisan/${artisan.id}`);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-3 hover:rotate-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProfile}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={artisan.portfolioImage}
          alt={`${artisan.name}'s work`}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'} ${isHovered ? 'scale-110 brightness-110' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {artisan.featured && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 animate-pulse shadow-lg">
            ⭐ Featured
          </Badge>
        )}
        
        {/* Floating action buttons */}
        <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <Button 
            size="sm" 
            variant="secondary" 
            className="rounded-full shadow-lg hover:scale-110 transition-all backdrop-blur-sm bg-white/90"
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(artisan.id);
            }}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''} transition-colors`} />
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="rounded-full shadow-lg hover:scale-110 transition-all backdrop-blur-sm bg-white/90"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Bottom overlay content */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1 bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleViewProfile();
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white/90 border-white/50 text-slate-900 hover:bg-white backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 transition-all duration-300">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              src={artisan.image}
              alt={artisan.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg hover:ring-blue-300 transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer group-hover:text-blue-600">
              {artisan.name}
            </h3>
            <p className="text-slate-600 text-sm flex items-center">
              {artisan.specialty}
              {artisan.featured && (
                <Award className="h-3 w-3 ml-2 text-amber-500" />
              )}
            </p>
            {(artisan.responseTime || artisan.experience) && (
              <div className="flex items-center space-x-3 mt-1">
                {artisan.responseTime && (
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {artisan.responseTime}
                  </div>
                )}
                {artisan.experience && (
                  <div className="text-xs text-slate-500">
                    {artisan.experience} exp
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <MapPin className="h-4 w-4 mr-1" />
            {artisan.location}
          </div>
          <div className="flex items-center space-x-1 group cursor-pointer">
            <Star className="h-4 w-4 text-amber-400 fill-current group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">{artisan.rating}</span>
            <span className="text-sm text-slate-500">({artisan.reviews})</span>
          </div>
        </div>
        
        <div className={`flex space-x-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'}`}>
          <Button 
            size="sm" 
            className="flex-1 hover:scale-105 transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
          >
            View Portfolio
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="hover:scale-105 transition-all hover:shadow-lg border-slate-300 hover:border-blue-500 hover:text-blue-600"
            onClick={(e) => e.stopPropagation()}
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
