
import React, { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronRight, 
  SearchIcon, 
  ShoppingBag, 
  User, 
  Paintbrush, 
  Upload,
  Shirt,
  Scissors
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TailorNovaDesigner } from "@/components/TailorNovaDesigner";

const ArtistsCorner = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Check if we're on the custom design page
  const isCustomDesign = location.pathname.includes("/artists-corner/custom-design");
  
  if (isCustomDesign) {
    return <TailorNovaDesigner inArtistsCorner={true} />;
  }

  // If not on custom design page, show the regular Artists Corner UI
  const featuredArtists = [
    { id: 1, name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", designs: 32, followers: 1280 },
    { id: 2, name: "Rahul Kapoor", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", designs: 28, followers: 940 },
    { id: 3, name: "Ananya Patel", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", designs: 47, followers: 2340 },
    { id: 4, name: "Vikram Singh", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", designs: 19, followers: 760 },
  ];

  const categories = [
    { id: "traditional", name: "Traditional", count: 124, image: "https://images.unsplash.com/photo-1583391733956-6bbc75be0a00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: "contemporary", name: "Contemporary", count: 86, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: "fusion", name: "Fusion", count: 72, image: "https://images.unsplash.com/photo-1520367745676-56196632073f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: "minimalist", name: "Minimalist", count: 65, image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: "bohemian", name: "Bohemian", count: 58, image: "https://images.unsplash.com/photo-1516575334481-f85287c2c82d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: "custom-design", name: "Custom Design", count: 0, image: "https://images.unsplash.com/photo-1606307305578-5dd642e0aa1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", featured: true },
  ];

  const featuredDesigns = [
    { id: 1, title: "Floral Pattern Dress", artist: "Priya Sharma", price: 1299, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: 2, title: "Geometric Print Kurta", artist: "Rahul Kapoor", price: 999, image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: 3, title: "Embroidered Jacket", artist: "Ananya Patel", price: 2499, image: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    { id: 4, title: "Mandala Art Shirt", artist: "Vikram Singh", price: 1199, image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Artists Corner</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative w-64 hidden md:block">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search designs..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {/* Selected category or home */}
        {category ? (
          <>
            <div className="flex items-center mb-6">
              <Link to="/artists-corner" className="text-sm text-gray-500 hover:text-gray-900">Artists Corner</Link>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
              <span className="text-sm font-medium capitalize">{category}</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-6 capitalize">{category} Designs</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredDesigns.map((design) => (
                <Card key={design.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{design.title}</h3>
                    <p className="text-sm text-gray-500">by {design.artist}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="font-semibold">₹{design.price}</p>
                      <Button size="sm" variant="outline">
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Homepage Content */}
            <section className="mb-10">
              <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 md:p-8 shadow-lg">
                <div className="md:max-w-2xl">
                  <Badge className="bg-white/20 hover:bg-white/30 mb-4">Artist Collaboration</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Unique Designs</h2>
                  <p className="text-white/80 mb-6">Explore exclusive clothing designs by talented artists from around the world or create your own custom designs.</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" className="bg-white text-indigo-700 hover:bg-gray-100">
                      <Paintbrush className="h-4 w-4 mr-2" />
                      Browse Designs
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/20" onClick={() => navigate("/artists-corner/custom-design")}>
                      <Scissors className="h-4 w-4 mr-2" />
                      Create Your Own
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Categories</h2>
                <Button variant="ghost" className="text-indigo-600">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer h-64 ${
                      category.featured ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                    }`}
                    onClick={() => navigate(`/artists-corner/${category.id}`)}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      {category.id === 'custom-design' ? (
                        <p className="text-sm text-white/80">Create your own unique designs</p>
                      ) : (
                        <p className="text-sm text-white/80">{category.count} designs</p>
                      )}
                    </div>
                    {category.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-indigo-500">Featured</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Artists</h2>
                <Button variant="ghost" className="text-indigo-600">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {featuredArtists.map((artist) => (
                  <Card key={artist.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-2 flex flex-col items-center text-center">
                      <div className="h-24 w-24 rounded-full overflow-hidden mb-3">
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">{artist.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="flex justify-center gap-4 text-sm">
                        <div>
                          <p className="font-medium">{artist.designs}</p>
                          <p className="text-gray-500">Designs</p>
                        </div>
                        <div>
                          <p className="font-medium">{artist.followers}</p>
                          <p className="text-gray-500">Followers</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-center">
                      <Button variant="outline" size="sm" className="w-full">
                        View Profile
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
            
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Popular Designs</h2>
                <Button variant="ghost" className="text-indigo-600">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredDesigns.map((design) => (
                  <Card key={design.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{design.title}</h3>
                      <p className="text-sm text-gray-500">by {design.artist}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="font-semibold">₹{design.price}</p>
                        <Button size="sm" variant="outline">
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default ArtistsCorner;
