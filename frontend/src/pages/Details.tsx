
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/contexts/SearchContext";
import { ArrowLeft, Star, Heart, Bookmark, Share2, MapPin, Clock, DollarSign } from "lucide-react";

interface DetailItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  location: string;
  createdAt: string;
  rating: number;
  reviews: number;
  artist: {
    id: number;
    name: string;
    avatar: string;
    verified: boolean;
  };
  gallery: string[];
  specifications: Record<string, string>;
}

export const Details = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { allArtisans } = useSearch();
  const [item, setItem] = useState<DetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const identifier = id || searchParams.get('identifier');

  useEffect(() => {
    // Simulate API call to fetch item details
    const fetchItemDetails = async () => {
      setLoading(true);
      
      // Mock data - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockItem: DetailItem = {
        id: identifier || "1",
        title: "Custom Wedding Hair Design",
        description: "Elegant bridal hairstyling with intricate braiding and floral accents. Perfect for outdoor ceremonies and romantic themes. Includes consultation, trial run, and day-of styling.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
        category: "Hair Styling",
        price: "$450 - $650",
        location: "San Francisco, CA",
        createdAt: "2024-01-15",
        rating: 4.9,
        reviews: 127,
        artist: {
          id: 1,
          name: "Maya Chen",
          avatar: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
          verified: true
        },
        gallery: [
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
          "https://images.unsplash.com/photo-1559599238-1a9115afd6b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
          "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
        ],
        specifications: {
          "Duration": "3-4 hours",
          "Includes": "Consultation, trial, styling",
          "Travel": "Within 25 miles",
          "Booking": "2 weeks advance notice",
          "Cancellation": "48 hours"
        }
      };

      setItem(mockItem);
      setLoading(false);
    };

    if (identifier) {
      fetchItemDetails();
    } else {
      setLoading(false);
    }
  }, [identifier]);

  const relatedArtisans = allArtisans.filter(artisan => 
    item && artisan.specialty === item.category && artisan.id !== item.artist.id
  ).slice(0, 3);

  const mockReviews = [
    {
      id: 1,
      user: "Jennifer Williams",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      rating: 5,
      date: "2024-01-10",
      comment: "Maya did an absolutely incredible job on my wedding hair! She listened to all my ideas and created something even more beautiful than I imagined."
    },
    {
      id: 2,
      user: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      rating: 5,
      date: "2024-01-05",
      comment: "Professional, talented, and so easy to work with. The trial session was perfect and the final result was exactly what we discussed."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-4">Item Not Found</h2>
            <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/search')}>Back to Search</Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={item.gallery[selectedImage]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {item.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedImage === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{item.category}</Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLiked(!liked)}
                    className={`hover:scale-105 transition-all ${liked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`hover:scale-105 transition-all ${bookmarked ? 'text-blue-500' : ''}`}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" className="hover:scale-105 transition-all">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{item.rating}</span>
                  <span className="ml-1">({item.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {item.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {item.price}
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{item.description}</p>
            </div>

            {/* Artist Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.artist.avatar}
                    alt={item.artist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{item.artist.name}</h3>
                      {item.artist.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Professional Artist</p>
                  </div>
                  <Button
                    onClick={() => navigate(`/artisan/${item.artist.id}`)}
                    variant="outline"
                    className="hover:scale-105 transition-all"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="font-medium text-gray-900">{key}</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all">
              Contact Artist
            </Button>
          </div>
        </div>

        {/* Reviews */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{review.user}</h4>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Artisans */}
        {relatedArtisans.length > 0 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>More {item.category} Artists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArtisans.map((artisan) => (
                  <div key={artisan.id} className="border rounded-lg p-4 hover:shadow-md transition-all hover:scale-105">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{artisan.name}</h4>
                        <p className="text-sm text-gray-600">{artisan.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm">{artisan.rating}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/artisan/${artisan.id}`)}
                        className="hover:scale-105 transition-all"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};
