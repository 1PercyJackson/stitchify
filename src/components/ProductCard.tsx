
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, DollarSign, Award, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  designer?: string;
  className?: string;
  isFeatured?: boolean;
  fabricQuality?: "Premium" | "Standard" | "Economy";
  discountPercent?: number;
  isArtistDesign?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  category,
  designer,
  className,
  isFeatured = false,
  fabricQuality = "Standard",
  discountPercent,
  isArtistDesign = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  // Fabric quality images that showcase high-quality textiles
  const fabricImages = {
    men: [
      "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1565550009894-aa281e3c1bea?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    women: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1612731434276-c37cade76ec1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  };

  // Use image from props or select an appropriate fabric image based on category
  const displayImage = image || (
    category === "women" 
      ? fabricImages.women[Math.floor(Math.random() * fabricImages.women.length)]
      : fabricImages.men[Math.floor(Math.random() * fabricImages.men.length)]
  );

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const getFabricQualityBadge = () => {
    switch (fabricQuality) {
      case "Premium":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Premium Fabric</Badge>;
      case "Economy":
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Best Value</Badge>;
      case "Standard":
      default:
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Quality Fabric</Badge>;
    }
  };

  return (
    <motion.div 
      className={cn("group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300", className)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img 
            src={displayImage} 
            alt={title} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay with fabric quality indicators */}
          <div className="absolute left-3 bottom-3 flex flex-col gap-1">
            {getFabricQualityBadge()}
            {discountPercent && (
              <Badge variant="destructive" className="bg-red-500">
                {discountPercent}% OFF
              </Badge>
            )}
            {isArtistDesign && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100">
                <User className="h-3 w-3 mr-1" />
                Artist Design
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handleLikeClick}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium mb-1 line-clamp-1">{title}</h3>
              {designer && (
                <p className="text-xs text-gray-500 mb-2">By {designer}</p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <p className="font-bold">₹{price.toLocaleString()}</p>
              {isFeatured && (
                <span className="flex items-center text-xs text-emerald-600 mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  Best Seller
                </span>
              )}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};
