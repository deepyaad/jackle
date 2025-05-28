
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  category: {
    name: string;
    icon: string;
    count: number;
  };
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
        <p className="text-sm text-slate-500">{category.count} artisans</p>
      </CardContent>
    </Card>
  );
};
