
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Shirt, 
  Palette, 
  ThumbsUp, 
  ShoppingBag, 
  Scissors
} from "lucide-react";

const Index = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
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

  const heroVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } 
    }
  };
  
  // Featured categories with images
  const categories = [
    { 
      id: "men", 
      title: "Men", 
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
      path: "/men" 
    },
    { 
      id: "women", 
      title: "Women", 
      image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      path: "/women" 
    },
    { 
      id: "kids", 
      title: "Kids", 
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3",
      path: "/kids" 
    },
  ];
  
  // Features of the platform
  const features = [
    {
      icon: <Palette className="h-8 w-8 text-indigo-500" />,
      title: "Custom Designs",
      description: "Create your own unique designs or choose from our collection"
    },
    {
      icon: <Shirt className="h-8 w-8 text-indigo-500" />,
      title: "Premium Fabrics",
      description: "Select from a variety of high-quality fabrics for your garments"
    },
    {
      icon: <Scissors className="h-8 w-8 text-indigo-500" />,
      title: "Precise Customization",
      description: "Adjust every detail to your preference with our editor tools"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-indigo-500" />,
      title: "Sell Your Creations",
      description: "Share and sell your designs with our global community"
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <motion.section 
        className="relative h-[85vh] overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
          alt="Fashion hero" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h5 className="text-white/90 text-lg md:text-xl uppercase tracking-wide mb-2">
              Elevate Your Style
            </h5>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Design Clothes <br/> That Define <span className="text-indigo-400">You</span>
            </h1>
            <p className="text-white/80 text-xl md:text-2xl max-w-2xl mb-8">
              Create custom designs, choose premium fabrics, and express your unique style
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/design" className="px-8 py-4 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300">
                Start Designing
              </Link>
              <Link to="/artists-corner" className="px-8 py-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300">
                Artists Corner
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Categories section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collections for everyone in the family
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.div 
                key={category.id}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link to={category.path} className="block h-96 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 z-10"></div>
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                    <div className={`flex items-center text-white/90 transform transition-transform duration-300 ${hoveredCategory === category.id ? 'translate-x-2' : ''}`}>
                      <span className="mr-2">Explore Collection</span>
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Stitchify</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique features to make your shopping experience special
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4 inline-block p-3 bg-indigo-50 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Artist corner preview */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 mb-12 lg:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Artists Corner</h2>
              <p className="text-white/90 text-lg mb-8 max-w-lg">
                Discover unique designs created by talented artists from around the world. Or become a designer yourself and share your creations.
              </p>
              <Link to="/artists-corner" className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300">
                <span>Explore Artists Corner</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
                  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
                  "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
                  "https://images.unsplash.com/photo-1561526116-e2460f4d143c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
                ].map((img, index) => (
                  <motion.div 
                    key={index}
                    className={`overflow-hidden rounded-lg ${index === 0 ? 'col-span-2' : ''}`}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={img} 
                      alt={`Artist design ${index + 1}`} 
                      className="w-full h-full object-cover aspect-square"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Custom design call to action */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Create Your Custom Design</h2>
            <p className="text-gray-600 text-lg mb-8">
              Get creative and design clothes that match your style. Choose fabrics, add graphics, and see your creation come to life.
            </p>
            <Link to="/design" className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300">
              <Palette className="mr-2 h-5 w-5" />
              <span>Start Designing Now</span>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from customers who have created their own custom designs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya S.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
                quote: "I designed a custom t-shirt with my own artwork, and the quality exceeded my expectations. The fabric feels premium, and the print is vibrant!"
              },
              {
                name: "Rahul M.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
                quote: "The customization options are incredible. I was able to create a unique shirt that I couldn't find anywhere else. The design process was intuitive and fun."
              },
              {
                name: "Aisha K.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3",
                quote: "I've sold several of my designs through the platform and received great feedback. The community here appreciates creativity and craftsmanship."
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <ThumbsUp key={i} className="h-4 w-4" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
