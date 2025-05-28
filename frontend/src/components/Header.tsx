
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, X, LogOut, Search, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Search", path: "/search" },
    { label: "Browse", path: "/browse" },
    { label: "Categories", path: "/browse" }
  ];

  return (
    <>
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40 shadow-lg shadow-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer hover:scale-105 transition-all duration-300 group"
              onClick={() => navigate('/')}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
                  JACKLE
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="text-slate-300 hover:text-white transition-colors hover:scale-105 duration-300 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/search')}
                className="hover:scale-105 transition-all text-slate-300 hover:text-white hover:bg-slate-800/50"
              >
                <Search className="h-4 w-4" />
              </Button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center space-x-2 hover:scale-105 transition-all group"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-600 group-hover:ring-indigo-400 transition-all"
                    />
                    <span className="text-slate-200 font-medium group-hover:text-white transition-colors">{user?.name}</span>
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="hover:scale-105 transition-all border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/signin')}
                    className="hover:scale-105 transition-all duration-300 text-slate-300 hover:text-white hover:bg-slate-800/50"
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:via-purple-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/25 border-0"
                    onClick={() => navigate('/signup')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Join JACKLE
                  </Button>
                </>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:scale-110 transition-all duration-300 text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-slate-700/50 animate-fade-in">
            <div className="px-4 py-2 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-slate-300 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-700">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 py-2 w-full text-slate-300 hover:text-white"
                    >
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>{user?.name}</span>
                    </button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full border-slate-600 text-slate-300 hover:text-white"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-slate-300 hover:text-white"
                      onClick={() => {
                        navigate('/signin');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 border-0"
                      onClick={() => {
                        navigate('/signup');
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Join JACKLE
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
