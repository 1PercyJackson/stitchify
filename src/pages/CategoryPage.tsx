
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  X, 
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";

interface CategoryPageProps {}

const subCategories = {
  men: [
    { title: "Graphic Tees", path: "graphic-tees", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Casual Wear", path: "casual-wear", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Professional Wear", path: "professional-wear", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Indian Wear", path: "indian-wear", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Sportswear", path: "sportswear", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Shoes", path: "shoes", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3" },
  ],
  women: [
    { title: "Graphic Tees", path: "graphic-tees", image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Casual Wear", path: "casual-wear", image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Professional Wear", path: "professional-wear", image: "https://images.unsplash.com/photo-1580913428706-c311e67898b3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Indian Wear", path: "indian-wear", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Sportswear", path: "sportswear", image: "https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Shoes", path: "shoes", image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3" },
  ],
  kids: [
    { title: "Graphic Tees", path: "graphic-tees", image: "https://images.unsplash.com/photo-1622244328682-03505241fa29?q=80&w=1830&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Casual Wear", path: "casual-wear", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Professional Wear", path: "professional-wear", image: "https://images.unsplash.com/photo-1631528754981-dca64a558e84?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Indian Wear", path: "indian-wear", image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Sportswear", path: "sportswear", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { title: "Shoes", path: "shoes", image: "https://images.unsplash.com/photo-1623112926981-f11676450081?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3" },
  ]
};

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const validCategories = ["men", "women", "kids"];
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  
  useEffect(() => {
    if (category && !validCategories.includes(category)) {
      navigate("/404");
    }
  }, [category, navigate]);
  
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <motion.section 
        className="relative h-[50vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <img 
          src={`https://images.unsplash.com/photo-${category === "men" ? "1516257984-b1b4d707412e" : category === "women" ? "1551803091-e20673f154e1" : "1560506840-9456a0b9546a"}?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3`} 
          alt={`${categoryTitle} fashion`} 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="breadcrumbs text-white/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="inline h-4 w-4 mx-2" />
            <span>{categoryTitle}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {categoryTitle}'s Collection
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Explore our latest styles designed for {category === "kids" ? "the little ones" : categoryTitle.toLowerCase()}
          </p>
        </div>
      </motion.section>
      
      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Browse by Category
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {category && subCategories[category as keyof typeof subCategories]?.map((subCategory, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  to={`/${category}/${subCategory.path}`}
                  className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors duration-300 z-10"></div>
                    <img 
                      src={subCategory.image} 
                      alt={subCategory.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                      <h3 className="text-sm md:text-base font-semibold text-white">{subCategory.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Featured section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold">Featured {categoryTitle} Collection</h2>
              <p className="text-gray-600">Handpicked items for this season</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 md:mt-0"
            >
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
                {Array.from({ length: 8 }).map((_, idx) => (
                  <ProductCard 
                    key={idx}
                    id={`product-${idx}`}
                    title={`${categoryTitle} Fashion Item ${idx + 1}`}
                    price={Math.floor(Math.random() * 50 + 20) * 100}
                    image={`https://picsum.photos/seed/${category}-${idx}/500/600`}
                    category={category || ""}
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
      
      {/* CTA for custom design */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-white/90 text-lg mb-8">
              Create your own custom design with our interactive design tool. Choose fabrics, add patterns, and make it uniquely yours.
            </p>
            <Link to="/design" className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300">
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span>Create Custom Design</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
