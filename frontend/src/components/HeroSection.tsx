
import { Button } from "@/components/ui/button";
import { Search, Filter, Zap, Trophy, Sparkles, Star, Heart, Compass } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typingText, setTypingText] = useState("");
  const fullText = "Discover exceptional artisans, specialties, or locations...";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search');
    }
  };

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute opacity-20 animate-float ${
              i % 4 === 0 ? 'w-3 h-3 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full' :
              i % 4 === 1 ? 'w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rotate-45' :
              i % 4 === 2 ? 'w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full' :
              'w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400'
            }`}
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:scale-110 animate-bounce-in border border-white/10">
            <Trophy className="h-5 w-5 text-amber-400 animate-pulse group-hover:animate-spin transition-all duration-300" />
            <span className="text-slate-200 text-sm font-semibold">Premium Platform for Master Artisans</span>
            <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse group-hover:animate-bounce" />
            <Heart className="h-3 w-3 text-pink-400 animate-pulse opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="inline-block animate-fade-in-up animation-delay-100 hover:animate-wobble cursor-pointer">Where</span>{" "}
            <span className="inline-block bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-200 hover:scale-110 transition-transform duration-300 cursor-pointer animate-glow">
              Craft
            </span>{" "}
            <span className="inline-block animate-fade-in-up animation-delay-300 hover:animate-wobble cursor-pointer">Meets</span>{" "}
            <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400 hover:scale-110 transition-transform duration-300 cursor-pointer animate-glow">
              Excellence
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-500">
            The premier destination for world-class artisans to showcase their mastery, connect with discerning clients, and elevate their professional presence. From haute couture to culinary artistry, every craft deserves recognition.
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up animation-delay-600">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6 group-focus-within:text-indigo-400 transition-all duration-300 group-focus-within:animate-pulse" />
                <input
                  type="text"
                  placeholder={typingText}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-40 py-6 text-lg border-0 focus:outline-none focus:ring-0 bg-transparent placeholder-slate-400 focus:placeholder-indigo-300 transition-all duration-300 text-white"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-3">
                  <Button 
                    type="button"
                    size="sm" 
                    variant="ghost" 
                    className="hover:bg-white/10 hover:scale-110 transition-all duration-300 rounded-lg hover:rotate-12 text-slate-400 hover:text-white"
                    onClick={() => navigate('/search')}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="submit"
                    className="hover:scale-105 transition-all duration-300 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg hover:shadow-xl px-8 border-0"
                  >
                    <Compass className="h-4 w-4 mr-2 animate-pulse" />
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10K+", label: "Master Artisans", color: "indigo", delay: "700" },
              { number: "50+", label: "Craft Categories", color: "purple", delay: "800" },
              { number: "100K+", label: "Projects Showcased", color: "cyan", delay: "900" }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center group hover:scale-110 transition-all duration-500 cursor-pointer animate-fade-in-up animation-delay-${stat.delay} hover:animate-bounce-in`}
              >
                <div className={`text-4xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-${stat.color}-400 group-hover:to-${stat.color}-600 group-hover:bg-clip-text group-hover:text-transparent transition-all group-hover:animate-pulse relative`}>
                  {stat.number}
                  <div className={`absolute -inset-2 bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>
                </div>
                <div className="text-slate-300 group-hover:text-white transition-colors">{stat.label}</div>
                
                {/* Animated underline */}
                <div className={`w-0 h-0.5 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 mx-auto mt-2 group-hover:w-full transition-all duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
