
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Star, 
  Share2, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight,
  Ruler,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import { Label } from "@/components/ui/label";

// Mock product data - in a real app, this would come from an API
const productData = {
  id: "custom-design-123",
  title: "Custom Designer T-Shirt",
  price: 1299,
  originalPrice: 1499,
  discountPercent: 13,
  rating: 4.8,
  reviewCount: 127,
  inStock: true,
  estimatedDelivery: "3-5 business days",
  designer: "You (Custom Design)",
  category: "men",
  description: "This custom-designed T-shirt was created in our Design Studio. Made with premium cotton fabric for maximum comfort and durability. The design has been digitally printed using eco-friendly inks that won't fade even after multiple washes.",
  features: [
    "Custom design created in our Design Studio",
    "100% premium cotton fabric",
    "Eco-friendly digital printing",
    "Pre-shrunk to minimize shrinkage",
    "Reinforced stitching for durability"
  ],
  images: [
    "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
  ],
  fabric: "Premium Cotton",
  care: [
    "Machine wash cold with similar colors",
    "Do not bleach",
    "Tumble dry low",
    "Iron on low heat if needed",
    "Do not dry clean"
  ]
};

// Mock similar products
const similarProducts = [
  { 
    id: "similar1", 
    title: "Classic Fit T-Shirt", 
    price: 899, 
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3", 
    category: "men", 
    designer: "StyleCore" 
  },
  { 
    id: "similar2", 
    title: "Urban Graphic Tee", 
    price: 999, 
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3", 
    category: "men", 
    designer: "UrbanThreads" 
  },
  { 
    id: "similar3", 
    title: "Premium Cotton Tee", 
    price: 1199, 
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3", 
    category: "men", 
    designer: "PureCotton" 
  },
  { 
    id: "similar4", 
    title: "Minimalist Design Shirt", 
    price: 1099, 
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3", 
    category: "men", 
    designer: "MinimalStyle" 
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string>("m");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [selectedImage, setSelectedImage] = useState<string>(productData.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };
  
  // Size options
  const sizeOptions = [
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
    { value: "xxl", label: "XXL" }
  ];
  
  // Color options with their hex values
  const colorOptions = [
    { value: "black", label: "Black", hex: "#1F2937" },
    { value: "white", label: "White", hex: "#F9FAFB" },
    { value: "navy", label: "Navy", hex: "#1E3A8A" },
    { value: "gray", label: "Gray", hex: "#6B7280" },
    { value: "red", label: "Red", hex: "#DC2626" }
  ];
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Product added to cart!");
      setIsAddingToCart(false);
    }, 1000);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };
  
  // Find selected color object
  const currentColorOption = colorOptions.find(color => color.value === selectedColor);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with back navigation */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold truncate max-w-[200px] sm:max-w-full">
              {productData.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleFavorite}
              className={isFavorite ? "text-red-500" : ""}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product images */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="bg-white rounded-xl overflow-hidden aspect-square">
              <img 
                src={selectedImage} 
                alt={productData.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {productData.images.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer ${
                    selectedImage === image ? 'border-indigo-500' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${productData.title} view ${index + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Product details */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div>
              <div className="flex items-center mb-2">
                <Badge className="bg-indigo-500 rounded-full px-3">Custom Design</Badge>
                {productData.designer && (
                  <span className="text-sm text-gray-500 ml-3">
                    By {productData.designer}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{productData.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(productData.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{productData.rating}</span>
                </div>
                
                <span className="text-sm text-gray-500">
                  {productData.reviewCount} reviews
                </span>
              </div>
              
              <div className="flex items-baseline mb-6">
                <h2 className="text-2xl font-bold">₹{productData.price.toLocaleString()}</h2>
                {productData.originalPrice && (
                  <>
                    <span className="ml-3 text-gray-500 line-through">
                      ₹{productData.originalPrice.toLocaleString()}
                    </span>
                    <span className="ml-3 text-green-600">
                      {productData.discountPercent}% off
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">
                {productData.description}
              </p>
              
              <Separator className="my-6" />
              
              {/* Options selection */}
              <div className="space-y-6">
                {/* Size selection */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-sm font-medium">Size</Label>
                    <Button variant="link" size="sm" className="h-auto p-0 text-indigo-600">
                      <Ruler className="h-4 w-4 mr-1" />
                      <span className="text-sm">Size Guide</span>
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <Button
                        key={size.value}
                        variant={selectedSize === size.value ? "default" : "outline"}
                        className={`h-10 w-12 ${
                          selectedSize === size.value ? 'bg-indigo-600' : ''
                        }`}
                        onClick={() => setSelectedSize(size.value)}
                      >
                        {size.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Color selection */}
                <div>
                  <Label className="text-sm font-medium block mb-3">Color</Label>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className={`h-8 w-8 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 ${
                          selectedColor === color.value ? 'border-indigo-500 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color.value)}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Quantity selection */}
                <div>
                  <Label className="text-sm font-medium block mb-3">Quantity</Label>
                  <Select
                    value={quantity.toString()}
                    onValueChange={(value) => setQuantity(parseInt(value))}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Qty" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Add to cart and edit design buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  className="flex-1 py-6"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                
                <Link to="/design" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full py-6"
                  >
                    <Edit className="mr-2 h-5 w-5" />
                    Edit Design
                  </Button>
                </Link>
              </div>
              
              {/* Shipping and returns info */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 mr-3 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Free shipping on orders over ₹999</p>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {productData.estimatedDelivery}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <RotateCcw className="h-5 w-5 mr-3 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Easy 30-day returns</p>
                    <p className="text-sm text-gray-600">
                      Return policy allows returns within 30 days of delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b mb-6">
              <TabsTrigger value="details" className="text-base">Details</TabsTrigger>
              <TabsTrigger value="features" className="text-base">Features</TabsTrigger>
              <TabsTrigger value="care" className="text-base">Care Instructions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                  <p className="text-gray-600">{productData.description}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex">
                      <span className="font-medium w-24">Fabric:</span>
                      <span className="text-gray-600">{productData.fabric}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-24">Color:</span>
                      <span className="text-gray-600">{colorOptions.find(c => c.value === selectedColor)?.label}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-24">Design:</span>
                      <span className="text-gray-600">Custom (Design Studio)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Design Specifications</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="font-medium w-32">Design Type:</span>
                      <span className="text-gray-600">Custom Digital Print</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Print Location:</span>
                      <span className="text-gray-600">Front, Back</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Print Method:</span>
                      <span className="text-gray-600">Direct to Garment (DTG)</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Ink Type:</span>
                      <span className="text-gray-600">Eco-friendly Water-based</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Product Features</h3>
              <ul className="space-y-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="care" className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Care Instructions</h3>
              <ul className="space-y-2">
                {productData.care.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar products section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">You Might Also Like</h2>
            <Link to="/men" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
                designer={product.designer}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
