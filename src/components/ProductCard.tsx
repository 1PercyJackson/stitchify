
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  designer?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  category,
  designer,
  className,
}) => {
  return (
    <motion.div 
      className={cn("group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300", className)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Heart className="h-4 w-4" />
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
            <p className="font-bold">₹{price.toLocaleString()}</p>
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
