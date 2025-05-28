
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Edit, MapPin, Star, Heart, Bookmark, Users, Calendar } from "lucide-react";
import { ArtisanCard } from "@/components/ArtisanCard";
import { useSearch } from "@/contexts/SearchContext";

export const Profile = () => {
  const { profileId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { allArtisans } = useSearch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Passionate about discovering amazing artisans and supporting local craftsmanship.",
    location: "San Francisco, CA"
  });
  const [activeTab, setActiveTab] = useState("overview");

  const isOwnProfile = !profileId || (isAuthenticated && user?.id.toString() === profileId);

  // Mock user data for demonstration
  const profileUser = profileId && !isOwnProfile ? {
    id: parseInt(profileId),
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
    bio: "Art enthusiast and collector. Love discovering new talent!",
    location: "New York, NY",
    joinDate: "March 2023",
    followers: 245,
    following: 89
  } : {
    ...user,
    bio: editForm.bio,
    location: editForm.location,
    joinDate: "January 2024",
    followers: 42,
    following: 23
  };

  const mockFavorites = allArtisans.slice(0, 3);
  const mockBookmarks = allArtisans.slice(2, 5);

  const handleSave = () => {
    console.log("Saving profile changes:", editForm);
    setIsEditing(false);
  };

  if (!isAuthenticated && isOwnProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={profileUser?.avatar}
                alt={profileUser?.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave}>Save</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{profileUser?.name}</h1>
                      {isOwnProfile && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="hover:scale-105 transition-all"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{profileUser?.bio}</p>
                    <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profileUser?.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined {profileUser?.joinDate}
                      </div>
                    </div>
                    <div className="flex space-x-6 mt-4">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{profileUser?.followers}</div>
                        <div className="text-sm text-gray-500">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{profileUser?.following}</div>
                        <div className="text-sm text-gray-500">Following</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors hover:scale-105 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Recent Favorites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockFavorites.map((artisan) => (
                      <div key={artisan.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <img src={artisan.image} alt={artisan.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{artisan.name}</div>
                          <div className="text-xs text-gray-500">{artisan.specialty}</div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-xs">{artisan.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bookmark className="h-5 w-5 mr-2 text-blue-500" />
                    Recent Bookmarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockBookmarks.map((artisan) => (
                      <div key={artisan.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <img src={artisan.image} alt={artisan.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{artisan.name}</div>
                          <div className="text-xs text-gray-500">{artisan.location}</div>
                        </div>
                        <Badge variant="secondary" className="text-xs">{artisan.specialty}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFavorites.map((artisan) => (
                <ArtisanCard
                  key={artisan.id}
                  artisan={artisan}
                  onLike={() => {}}
                  liked={true}
                />
              ))}
            </div>
          )}

          {activeTab === "bookmarks" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBookmarks.map((artisan) => (
                <ArtisanCard
                  key={artisan.id}
                  artisan={artisan}
                  onLike={() => {}}
                  liked={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
