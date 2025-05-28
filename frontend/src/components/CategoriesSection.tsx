
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  icon: string;
  count: number;
  trending: boolean;
}

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export const CategoriesSection = ({ selectedCategory, onCategorySelect }: CategoriesSectionProps) => {
  const navigate = useNavigate();
  
  const categories: Category[] = [
    { name: "Hair Styling", icon: "✂️", count: 127, trending: true },
    { name: "Nail Art", icon: "💅", count: 89, trending: false },
    { name: "Tattoo", icon: "🎨", count: 156, trending: true },
    { name: "Culinary", icon: "👨‍🍳", count: 203, trending: false },
    { name: "Fashion", icon: "👗", count: 94, trending: true },
    { name: "Barbering", icon: "🪒", count: 178, trending: false }
  ];

  const handleCategoryClick = (category: Category) => {
    if (selectedCategory === category.name) {
      onCategorySelect(null);
    } else {
      onCategorySelect(category.name);
      navigate(`/browse/${encodeURIComponent(category.name)}`);
    }
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Explore Craft Categories</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover exceptional artisans across diverse specialties, each bringing years of mastery to their craft.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                selectedCategory === category.name 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-blue-300'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm text-slate-600">{category.count}</span>
                  {category.trending && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
