
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Filter, 
  Search,
  Heart, 
  ShoppingCart, 
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ArtistsCorner = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };
  
  // Generate sample categories
  const categories = [
    { id: "all", name: "All Designs" },
    { id: "men", name: "Men's Designs" },
    { id: "women", name: "Women's Designs" },
    { id: "kids", name: "Kids' Designs" },
    { id: "custom", name: "Create Custom" },
  ];
  
  // Generate sample artist data with designs
  const artists = [
    {
      id: "artist1",
      name: "Neha Sharma",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.8,
      followers: 1243,
      designs: 37,
      specialization: "Indian Contemporary",
      featuredDesigns: [
        {
          id: "design1",
          title: "Modern Kurta Design",
          image: "https://images.unsplash.com/photo-1595341595379-cf1cd0fb7fb1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
          price: 2499,
          category: "women",
          tags: ["indian", "contemporary", "kurta"]
        },
        {
          id: "design2",
          title: "Minimalist Tee",
          image: "https://images.unsplash.com/photo-1592321675774-3de57f3ee25c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
          price: 899,
          category: "men",
          tags: ["minimalist", "tshirt", "graphic"]
        }
      ]
    },
    {
      id: "artist2",
      name: "Raj Patel",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.6,
      followers: 987,
      designs: 24,
      specialization: "Urban Streetwear",
      featuredDesigns: [
        {
          id: "design3",
          title: "Street Art Hoodie",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
          price: 1799,
          category: "men",
          tags: ["hoodie", "streetwear", "urban"]
        },
        {
          id: "design4",
          title: "Graffiti Cap",
          image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
          price: 599,
          category: "men",
          tags: ["cap", "urban", "streetwear"]
        }
      ]
    },
    {
      id: "artist3",
      name: "Priya Malhotra",
      avatar: "https://images.unsplash.com/photo-1554727242-741c14fa561c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.9,
      followers: 2340,
      designs: 42,
      specialization: "Kids Fashion",
      featuredDesigns: [
        {
          id: "design5",
          title: "Playful Summer Dress",
          image: "https://images.unsplash.com/photo-1524920199278-50c534e8b277?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3",
          price: 1299,
          category: "kids",
          tags: ["dress", "summer", "colorful"]
        },
        {
          id: "design6",
          title: "Adventure T-shirt",
          image: "https://images.unsplash.com/photo-1519238425857-d6822cde6c78?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
          price: 699,
          category: "kids",
          tags: ["tshirt", "adventure", "graphics"]
        }
      ]
    }
  ];
  
  // Generate sample popular designs
  const popularDesigns = [
    {
      id: "popular1",
      title: "Modern Ethnic Fusion",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 3299,
      artist: "Neha Sharma",
      category: "women",
      likes: 324
    },
    {
      id: "popular2",
      title: "Urban Denim Jacket",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 2499,
      artist: "Raj Patel",
      category: "men",
      likes: 287
    },
    {
      id: "popular3",
      title: "Floral Summer Dress",
      image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 1899,
      artist: "Priya Malhotra",
      category: "women",
      likes: 263
    },
    {
      id: "popular4",
      title: "Cartoon Character Tee",
      image: "https://images.unsplash.com/photo-1519238425857-d6822cde6c78?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 799,
      artist: "Priya Malhotra",
      category: "kids",
      likes: 247
    }
  ];
  
  // Filter designs based on selected category
  const filteredDesigns = category 
    ? popularDesigns.filter(design => design.category === category)
    : popularDesigns;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-800/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1459180129673-eefb56f79b45?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3" 
          alt="Artists Corner" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Artists Corner
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-2xl mb-8">
              Discover unique designs from talented artists around the world or create your own masterpiece
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">
                Browse Designs
              </Button>
              <Link to="/design">
                <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">
                  Create Your Own
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Category tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={category || "all"} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className={cat.id === "custom" ? "bg-indigo-50 text-indigo-600" : ""}
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search designs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                {cat.id === "custom" ? (
                  <div className="py-8 text-center">
                    <div className="max-w-2xl mx-auto space-y-4">
                      <h2 className="text-2xl font-bold">Create Your Custom Design</h2>
                      <p className="text-gray-600">
                        Use our intuitive design studio to create your own unique fashion pieces. 
                        Choose fabrics, add patterns, and let your creativity shine.
                      </p>
                      <Link to="/design">
                        <Button size="lg" className="mt-4">
                          Go to Design Studio
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6 mt-2">
                      <h2 className="text-2xl font-bold">
                        {cat.id === "all" ? "All Designs" : `${cat.name}`}
                      </h2>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      {/* Featured artists section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold mb-2">Featured Artists</h2>
            <p className="text-gray-600">Discover talented creators and their unique collections</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {artists.map((artist) => (
              <motion.div
                key={artist.id}
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
                    <div className="mr-4">
                      <img 
                        src={artist.avatar} 
                        alt={artist.name} 
                        className="w-16 h-16 rounded-full border-2 border-white object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                      <p className="text-white/80 text-sm">{artist.specialization}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="font-bold">{artist.designs}</p>
                        <p className="text-xs text-gray-500">Designs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{artist.followers}</p>
                        <p className="text-xs text-gray-500">Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{artist.rating}</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Follow</Button>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <h4 className="font-medium mb-3">Featured Designs</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {artist.featuredDesigns.map((design) => (
                      <Link 
                        key={design.id}
                        to={`/design/${design.id}`}
                        className="block rounded-lg overflow-hidden relative group"
                      >
                        <img 
                          src={design.image} 
                          alt={design.title} 
                          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="p-2 text-white">
                            <p className="text-sm font-medium line-clamp-1">{design.title}</p>
                            <p className="text-xs">₹{design.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <Link to={`/artist/${artist.id}`} className="flex items-center justify-center mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    <span>View All Designs</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Popular designs section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-10"
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Designs</h2>
              <p className="text-gray-600">Trending custom creations loved by our community</p>
            </div>
            <Link to="/designs/popular" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredDesigns.map((design) => (
              <motion.div
                key={design.id}
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Link to={`/design/${design.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={design.image} 
                      alt={design.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <Badge className="absolute top-3 left-3 bg-indigo-600">
                      {design.category}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium mb-1">{design.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">By {design.artist}</p>
                      </div>
                      <p className="font-bold">₹{design.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex mt-3 gap-2">
                      <Button 
                        variant="default" 
                        className="flex-1 flex items-center justify-center"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Become a designer CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Designer</h2>
            <p className="text-white/90 text-lg mb-8">
              Share your creative fashion designs with our community. Earn money and build your brand with every sale.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="default" size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">
                Join as Designer
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ArtistsCorner;
