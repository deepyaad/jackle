
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  MessageCircle, 
  Calendar,
  Heart,
  Share2,
  Phone,
  Mail
} from "lucide-react";
import { useState } from "react";

export const ArtisanProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [liked, setLiked] = useState(false);

  // Mock data - in real app, fetch from API using id
  const artisan = {
    id: 1,
    name: "Maya Chen",
    specialty: "Hair Styling",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 4.9,
    reviewCount: 127,
    experience: "5 years",
    responseTime: "2 hours",
    bio: "Passionate hair stylist specializing in modern cuts and color transformations. I believe every client deserves a personalized experience that enhances their natural beauty and confidence.",
    priceRange: "$$$ ($300 - $500)",
    skills: ["Hair Cutting", "Color Theory", "Balayage", "Wedding Styles", "Extensions"],
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?ixlib=rb-4.0.3"
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        comment: "Maya gave me the most amazing balayage! The color is exactly what I wanted and the cut is perfect.",
        date: "2 weeks ago"
      },
      {
        id: 2,
        author: "Emily Davis",
        rating: 5,
        comment: "Professional, talented, and such a lovely person to work with. Highly recommend!",
        date: "1 month ago"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6 flex items-center space-x-2 hover:scale-105 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-100 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{artisan.name}</h1>
                    <div className="flex items-center space-x-4 mb-2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                        {artisan.specialty}
                      </Badge>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {artisan.location}
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 fill-current mr-1" />
                        {artisan.rating} ({artisan.reviewCount} reviews)
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Responds in {artisan.responseTime}
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {artisan.experience} experience
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLiked(!liked)}
                      className="hover:scale-110 transition-all"
                    >
                      <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button size="sm" variant="outline" className="hover:scale-110 transition-all">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-6">{artisan.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {artisan.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="hover:scale-105 transition-all">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            {["portfolio", "reviews", "about"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "portfolio" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisan.portfolio.map((image, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all hover:scale-105">
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </Card>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {artisan.reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold">{review.author}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-amber-400 fill-current" : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{review.date}</span>
                  </div>
                  <p className="text-slate-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">About {artisan.name}</h3>
              <p className="text-slate-700 mb-6">{artisan.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Specializations</h4>
                  <ul className="space-y-1">
                    {artisan.skills.map((skill, index) => (
                      <li key={index} className="text-slate-600">• {skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Details</h4>
                  <div className="space-y-2 text-slate-600">
                    <p>Experience: {artisan.experience}</p>
                    <p>Response Time: {artisan.responseTime}</p>
                    <p>Price Range: {artisan.priceRange}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};
