
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  X, 
  Palette, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";

interface SubCategoryPageProps {}

const graphicTeeCategories = [
  { name: "Custom", slug: "custom" },
  { name: "Anime", slug: "anime" },
  { name: "Pop-Stars", slug: "pop-stars" },
  { name: "Marvel", slug: "marvel" },
  { name: "DC", slug: "dc" }
];

const subCategoryData = {
  "graphic-tees": {
    title: "Graphic Tees",
    description: "Express yourself with our range of graphic tees",
    image: {
      men: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3",
      women: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3",
      kids: "https://images.unsplash.com/photo-1622244328682-03505241fa29?q=80&w=1830&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  },
  "casual-wear": {
    title: "Casual Wear",
    description: "Comfortable and stylish everyday clothing",
    image: {
      men: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
      women: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      kids: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  },
  "professional-wear": {
    title: "Professional Wear",
    description: "Sophisticated and elegant attire for the workplace",
    image: {
      men: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      women: "https://images.unsplash.com/photo-1580913428706-c311e67898b3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      kids: "https://images.unsplash.com/photo-1631528754981-dca64a558e84?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  },
  "indian-wear": {
    title: "Indian Wear",
    description: "Traditional Indian clothing with contemporary designs",
    image: {
      men: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
      women: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
      kids: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  },
  "sportswear": {
    title: "Sportswear",
    description: "Performance clothing for active lifestyles",
    image: {
      men: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3",
      women: "https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
      kids: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  },
  "shoes": {
    title: "Shoes",
    description: "Footwear for every occasion",
    image: {
      men: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3",
      women: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
      kids: "https://images.unsplash.com/photo-1623112926981-f11676450081?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  }
};

const SubCategoryPage: React.FC<SubCategoryPageProps> = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const validCategories = ["men", "women", "kids"];
  const validSubCategories = ["graphic-tees", "casual-wear", "professional-wear", "indian-wear", "sportswear", "shoes"];
  
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  const subcategoryData = subcategory ? subCategoryData[subcategory as keyof typeof subCategoryData] : null;
  
  useEffect(() => {
    if (!category || !subcategory || !validCategories.includes(category) || !validSubCategories.includes(subcategory)) {
      navigate("/404");
    }
  }, [category, subcategory, navigate]);
  
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
  
  // Generate dynamic product data based on category and subcategory
  const generateProducts = (count: number) => {
    return Array.from({ length: count }).map((_, idx) => ({
      id: `${category}-${subcategory}-${idx}`,
      title: `${subcategoryData?.title} ${idx + 1}`,
      price: Math.floor(Math.random() * 50 + 20) * 100,
      image: `https://picsum.photos/seed/${category}-${subcategory}-${idx}/500/600`,
      designer: ["Stitchify Original", "Designer Collection", "Limited Edition"][Math.floor(Math.random() * 3)]
    }));
  };
  
  const products = generateProducts(12);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <motion.section 
        className="relative h-[40vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        {subcategoryData && category && (
          <img 
            src={subcategoryData.image[category as keyof typeof subcategoryData.image]} 
            alt={subcategoryData.title} 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="breadcrumbs text-white/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="inline h-4 w-4 mx-2" />
            <Link to={`/${category}`} className="hover:text-white transition-colors">{categoryTitle}</Link>
            <ChevronRight className="inline h-4 w-4 mx-2" />
            <span>{subcategoryData?.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {categoryTitle}'s {subcategoryData?.title}
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            {subcategoryData?.description}
          </p>
        </div>
      </motion.section>
      
      {/* Subcategories for Graphic Tees */}
      {subcategory === "graphic-tees" && (
        <motion.section 
          className="py-8 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold mb-6">Browse Graphic Tees By Style</h2>
            <div className="flex flex-wrap gap-4">
              {graphicTeeCategories.map((item, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  className="rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  {item.name}
                </Button>
              ))}
            </div>
            <Separator className="my-8" />
          </div>
        </motion.section>
      )}
      
      {/* Products section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold">{subcategoryData?.title} Collection</h2>
              <p className="text-gray-600">{products.length} products</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 md:mt-0 flex items-center space-x-3"
            >
              <select className="px-3 py-2 border rounded-md focus:outline-none">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter</span>
              </Button>
            </motion.div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Filter sidebar - mobile version is a drawer */}
            <motion.div 
              className={`fixed inset-0 bg-black/50 z-50 md:hidden ${isFilterOpen ? 'block' : 'hidden'}`}
              onClick={() => setIsFilterOpen(false)}
            >
              <motion.div 
                className="absolute right-0 top-0 bottom-0 w-80 bg-white"
                initial={{ x: "100%" }}
                animate={{ x: isFilterOpen ? 0 : "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 flex justify-between items-center border-b">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4">
                  {/* Filter contents - same as desktop but adapted for mobile */}
                  <div className="space-y-6">
                    {["Price Range", "Size", "Color", "Material", "Brand"].map((filter, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">{filter}</h4>
                        <div className="space-y-1">
                          {["Option 1", "Option 2", "Option 3"].map((option, idx) => (
                            <div key={idx} className="flex items-center">
                              <input type="checkbox" id={`mobile-${filter}-${idx}`} className="mr-2" />
                              <label htmlFor={`mobile-${filter}-${idx}`} className="text-sm text-gray-600">{option}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Filter sidebar - desktop version */}
            <motion.div 
              className="hidden md:block w-64 pr-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-24 space-y-6">
                {["Price Range", "Size", "Color", "Material", "Brand"].map((filter, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{filter}</h4>
                    <div className="space-y-1">
                      {["Option 1", "Option 2", "Option 3"].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="checkbox" id={`desktop-${filter}-${idx}`} className="mr-2" />
                          <label htmlFor={`desktop-${filter}-${idx}`} className="text-sm text-gray-600">{option}</label>
                        </div>
                      ))}
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Product grid */}
            <motion.div 
              className="flex-1 mt-6 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, idx) => (
                  <ProductCard 
                    key={idx}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    category={category || ""}
                    designer={product.designer}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button 
                      key={page} 
                      variant={page === 1 ? "default" : "outline"}
                      className="w-10 h-10"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Designer's corner */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Designer's Corner</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover unique custom designs created by talented artists in our community
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <img 
                    src={`https://picsum.photos/seed/designer-${idx}/500/600`} 
                    alt={`Designer item ${idx + 1}`} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Limited Edition
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold mb-1">Custom {subcategoryData?.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">By Designer Name</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{(Math.floor(Math.random() * 70 + 30) * 100).toLocaleString()}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-3">View Design</Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link to={`/artists-corner/${category}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
              <span>View all designer {categoryTitle.toLowerCase()} items</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Custom design CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 mb-10 lg:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Design Your Own {subcategoryData?.title}</h2>
              <p className="text-white/90 text-lg mb-8 max-w-lg">
                Create a custom design tailored to your preferences. Choose fabrics, add graphics, and personalize every detail.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/design" className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300">
                  <Palette className="mr-2 h-5 w-5" />
                  <span>Start Designing</span>
                </Link>
                
                <Link to="/artists-corner" className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white rounded-md font-medium hover:bg-indigo-800 transition-colors duration-300">
                  <span>Learn More</span>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative aspect-video bg-indigo-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1595341595379-cf1cd0fb7fb1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Custom design process" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/30 backdrop-blur-sm p-4 rounded-full">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Back button - fixed position */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link to={`/${category}`}>
          <Button 
            variant="outline" 
            className="rounded-full h-12 w-12 shadow-md bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SubCategoryPage;
