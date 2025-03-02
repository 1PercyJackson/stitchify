import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Paintbrush, 
  Palette, 
  DollarSign, 
  TrendingUp,
  User,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArtistDesignUpload } from "@/components/ArtistDesignUpload";
import { toast } from "sonner";

// Mock artist designs data
const artistDesigns = [
  {
    id: "artist-design-1",
    title: "Abstract Geometric Pattern",
    price: 799,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "men",
    designer: "Priya Sharma",
    fabricQuality: "Premium" as const,
    isArtistDesign: true
  },
  {
    id: "artist-design-2",
    title: "Traditional Indian Motifs",
    price: 899,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "women",
    designer: "Rajiv Patel",
    fabricQuality: "Standard" as const,
    isArtistDesign: true
  },
  {
    id: "artist-design-3",
    title: "Contemporary Urban Art",
    price: 1199,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "men",
    designer: "Aryan Mehta",
    fabricQuality: "Premium" as const,
    discountPercent: 15,
    isArtistDesign: true
  },
  {
    id: "artist-design-4",
    title: "Bohemian Paisley Design",
    price: 999,
    image: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "women",
    designer: "Meera Kapoor",
    fabricQuality: "Economy" as const,
    isArtistDesign: true
  },
  {
    id: "artist-design-5",
    title: "Modern Typography Art",
    price: 849,
    image: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "men",
    designer: "Amit Singh",
    fabricQuality: "Standard" as const,
    isArtistDesign: true
  },
  {
    id: "artist-design-6",
    title: "Vintage Botanical Print",
    price: 1299,
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "women",
    designer: "Nisha Reddy",
    fabricQuality: "Premium" as const,
    isFeatured: true,
    isArtistDesign: true
  },
];

// Mock top selling artists
const topArtists = [
  { id: "artist1", name: "Priya Sharma", sales: 246, avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "artist2", name: "Rajiv Patel", sales: 218, avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "artist3", name: "Meera Kapoor", sales: 203, avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "artist4", name: "Amit Singh", sales: 187, avatar: "https://i.pravatar.cc/150?img=7" },
  { id: "artist5", name: "Nisha Reddy", sales: 165, avatar: "https://i.pravatar.cc/150?img=9" },
];

const ArtistsCorner = () => {
  const { category } = useParams<{ category?: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortMethod, setSortMethod] = useState<string>("trending");
  const [designs, setDesigns] = useState(artistDesigns);
  
  const handleDesignUploaded = (designData: {
    imageUrl: string;
    designHash: string;
    title: string;
    price: number;
  }) => {
    // In a real app, we would send this to the backend
    console.log("New design:", designData);
    
    // Add the design to our local state for demonstration
    const newDesign = {
      id: `artist-design-${designs.length + 1}`,
      title: designData.title,
      price: designData.price,
      image: designData.imageUrl,
      category: "men", // Default to men's category for simplicity
      designer: "You (Artist)",
      fabricQuality: "Standard" as const, 
      isArtistDesign: true
    };
    
    setDesigns([newDesign, ...designs]);
    toast.success("Your design has been added to the marketplace!");
  };
  
  const handleBuyDesign = (id: string) => {
    toast.success("Purchase initiated! Redirecting to checkout...");
  };
  
  // Filter designs by category if one is specified
  const filteredDesigns = category 
    ? designs.filter(design => design.category === category)
    : designs;

  // Sort designs based on selected method
  const sortedDesigns = [...filteredDesigns].sort((a, b) => {
    switch (sortMethod) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return parseInt(b.id.split('-').pop() || "0") - parseInt(a.id.split('-').pop() || "0");
      case "trending":
      default:
        return Math.random() - 0.5; // Randomize for "trending" in this demo
    }
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Artists Corner</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search designs..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar/Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Paintbrush className="h-5 w-5 mr-2 text-indigo-600" />
                Artist Marketplace
              </h2>
              
              <p className="text-sm text-gray-600 mb-6">
                Showcase and sell your original designs. Our platform ensures unique designs and fair compensation.
              </p>
              
              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link to="/design">
                    <Palette className="h-4 w-4 mr-2" />
                    Create Design
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Artist Dashboard
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
                Top Selling Artists
              </h3>
              
              <div className="space-y-3">
                {topArtists.map((artist) => (
                  <div key={artist.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={artist.avatar} 
                        alt={artist.name} 
                        className="h-8 w-8 rounded-full object-cover mr-3" 
                      />
                      <span className="text-sm">{artist.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{artist.sales} sales</span>
                  </div>
                ))}
              </div>
            </div>
            
            <ArtistDesignUpload onDesignUploaded={handleDesignUploaded} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            <Tabs defaultValue={category || "all"} className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="all" asChild>
                    <Link to="/artists-corner">All Designs</Link>
                  </TabsTrigger>
                  <TabsTrigger value="men" asChild>
                    <Link to="/artists-corner/men">Men's</Link>
                  </TabsTrigger>
                  <TabsTrigger value="women" asChild>
                    <Link to="/artists-corner/women">Women's</Link>
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center space-x-3">
                  <select 
                    className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={sortMethod}
                    onChange={(e) => setSortMethod(e.target.value)}
                  >
                    <option value="trending">Trending</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  
                  <div className="flex rounded-md shadow-sm">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"} 
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewMode === "list" ? "default" : "outline"} 
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sortedDesigns.map((design) => (
                      <ProductCard 
                        key={design.id}
                        {...design}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedDesigns.map((design) => (
                      <motion.div 
                        key={design.id}
                        className="flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        whileHover={{ y: -2 }}
                      >
                        <div className="w-1/3 h-40">
                          <img 
                            src={design.image} 
                            alt={design.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">{design.title}</h3>
                                {design.designer && (
                                  <p className="text-xs text-gray-500">By {design.designer}</p>
                                )}
                              </div>
                              <p className="font-bold">₹{design.price.toLocaleString()}</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              {design.fabricQuality === "Premium" && (
                                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                  Premium Fabric
                                </span>
                              )}
                              {design.isArtistDesign && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  Artist Design
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex mt-4">
                            <Button 
                              className="w-full"
                              onClick={() => handleBuyDesign(design.id)}
                            >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Buy Design
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="men" className="mt-0">
                {/* Content will be filtered by the useParams hook */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sortedDesigns.map((design) => (
                      <ProductCard 
                        key={design.id}
                        {...design}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Same list view as 'all' but filtered by category */}
                    {sortedDesigns.map((design) => (
                      <motion.div 
                        key={design.id}
                        className="flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        whileHover={{ y: -2 }}
                      >
                        {/* ... Same content as list view for "all" ... */}
                        <div className="w-1/3 h-40">
                          <img 
                            src={design.image} 
                            alt={design.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">{design.title}</h3>
                                {design.designer && (
                                  <p className="text-xs text-gray-500">By {design.designer}</p>
                                )}
                              </div>
                              <p className="font-bold">₹{design.price.toLocaleString()}</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              {design.fabricQuality === "Premium" && (
                                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                  Premium Fabric
                                </span>
                              )}
                              {design.isArtistDesign && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  Artist Design
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex mt-4">
                            <Button 
                              className="w-full"
                              onClick={() => handleBuyDesign(design.id)}
                            >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Buy Design
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="women" className="mt-0">
                {/* Same structure as "men" tab but filtered for women's designs */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sortedDesigns.map((design) => (
                      <ProductCard 
                        key={design.id}
                        {...design}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedDesigns.map((design) => (
                      <motion.div 
                        key={design.id}
                        className="flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        whileHover={{ y: -2 }}
                      >
                        {/* ... Same content as list view for "all" ... */}
                        <div className="w-1/3 h-40">
                          <img 
                            src={design.image} 
                            alt={design.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">{design.title}</h3>
                                {design.designer && (
                                  <p className="text-xs text-gray-500">By {design.designer}</p>
                                )}
                              </div>
                              <p className="font-bold">₹{design.price.toLocaleString()}</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              {design.fabricQuality === "Premium" && (
                                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                  Premium Fabric
                                </span>
                              )}
                              {design.isArtistDesign && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  Artist Design
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex mt-4">
                            <Button 
                              className="w-full"
                              onClick={() => handleBuyDesign(design.id)}
                            >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Buy Design
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtistsCorner;
