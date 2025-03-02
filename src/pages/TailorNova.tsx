
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Palette,
  Shirt,
  Ruler,
  Scissors,
  PanelTop,
  Layers,
  Image as ImageIcon,
  ShoppingBag,
  Save,
  Download,
  Share2,
  Plus,
  Minus,
  RotateCcw,
  RotateCw,
  Check,
  RefreshCw,
  ChevronDown,
  Undo,
  Redo,
  Edit3,
  Trash2,
  Text,
  FileSymlink,
  Paintbrush,
  Sliders,
  User,
  Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TabStore } from "@/components/ui/tab-store";
import { toast } from "sonner";

const FABRIC_TYPES = [
  {
    id: "cotton",
    name: "Cotton",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    properties: "Breathable, soft, durable",
    price: 200,
  },
  {
    id: "linen",
    name: "Linen",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    properties: "Lightweight, breathable, natural texture",
    price: 350,
  },
  {
    id: "silk",
    name: "Silk",
    image: "https://images.unsplash.com/photo-1604156788856-2ce5f2171e10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    properties: "Smooth, luxurious, lightweight",
    price: 800,
  },
  {
    id: "wool",
    name: "Wool",
    image: "https://images.unsplash.com/photo-1543241333-e121bc9a5cde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    properties: "Warm, insulating, durable",
    price: 450,
  },
  {
    id: "denim",
    name: "Denim",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    properties: "Sturdy, versatile, classic",
    price: 300,
  },
  {
    id: "khadi",
    name: "Khadi",
    image: "https://images.unsplash.com/photo-1621951753163-e84f62de14c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    properties: "Handspun, sustainable, breathable",
    price: 250,
  },
];

const COLOR_PALETTE = [
  { name: "Navy", hex: "#172554" },
  { name: "Royal Blue", hex: "#1e40af" },
  { name: "Sky", hex: "#0ea5e9" },
  { name: "Teal", hex: "#0d9488" },
  { name: "Emerald", hex: "#059669" },
  { name: "Forest", hex: "#166534" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Orange", hex: "#ea580c" },
  { name: "Red", hex: "#dc2626" },
  { name: "Crimson", hex: "#be123c" },
  { name: "Fuchsia", hex: "#c026d3" },
  { name: "Purple", hex: "#7e22ce" },
  { name: "Black", hex: "#020617" },
  { name: "Charcoal", hex: "#334155" },
  { name: "Gray", hex: "#6b7280" },
  { name: "Silver", hex: "#d1d5db" },
  { name: "White", hex: "#ffffff" },
  { name: "Cream", hex: "#fef3c7" },
];

const GARMENT_TEMPLATES = [
  {
    id: "tshirt",
    name: "T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    regions: ["front", "back", "sleeves", "collar"],
    basePrice: 799
  },
  {
    id: "polo",
    name: "Polo Shirt",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    regions: ["front", "back", "sleeves", "collar"],
    basePrice: 999
  },
  {
    id: "shirt",
    name: "Formal Shirt",
    image: "https://images.unsplash.com/photo-1594938374182-a57061dba25c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    regions: ["front", "back", "sleeves", "collar", "cuffs"],
    basePrice: 1299
  },
  {
    id: "hoodie",
    name: "Hoodie",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    regions: ["front", "back", "sleeves", "hood", "pocket"],
    basePrice: 1599
  },
  {
    id: "sweatshirt",
    name: "Sweatshirt",
    image: "https://images.unsplash.com/photo-1572495641004-28421ae29ed4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    regions: ["front", "back", "sleeves", "collar"],
    basePrice: 1399
  },
  {
    id: "jacket",
    name: "Jacket",
    image: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    regions: ["front", "back", "sleeves", "collar", "pockets"],
    basePrice: 1999
  }
];

const DESIGN_ELEMENTS = [
  {
    category: "Basic Shapes",
    items: [
      { id: "circle", name: "Circle", icon: "⭕" },
      { id: "square", name: "Square", icon: "⬛" },
      { id: "triangle", name: "Triangle", icon: "🔺" },
      { id: "heart", name: "Heart", icon: "❤️" },
      { id: "star", name: "Star", icon: "⭐" },
    ]
  },
  {
    category: "Patterns",
    items: [
      { id: "stripes", name: "Stripes", icon: "||" },
      { id: "polkadot", name: "Polka Dots", icon: "•••" },
      { id: "chevron", name: "Chevron", icon: "^^^" },
      { id: "plaid", name: "Plaid", icon: "##" },
      { id: "floral", name: "Floral", icon: "🌸" },
    ]
  },
  {
    category: "Graphics",
    items: [
      { id: "logo", name: "Logo", icon: "🏷️" },
      { id: "emblem", name: "Emblem", icon: "🛡️" },
      { id: "icon", name: "Icon", icon: "🔣" },
      { id: "illustration", name: "Illustration", icon: "🖼️" },
      { id: "photo", name: "Photo", icon: "📷" },
    ]
  }
];

interface DesignHistory {
  id: string;
  action: string;
  timestamp: number;
}

const TailorNova = () => {
  // State variables
  const [selectedGarment, setSelectedGarment] = useState(GARMENT_TEMPLATES[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRIC_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0]);
  const [selectedRegion, setSelectedRegion] = useState("front");
  const [selectedTool, setSelectedTool] = useState("select");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [designHistory, setDesignHistory] = useState<DesignHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: 40,
    waist: 34,
    hips: 42,
    shoulderWidth: 18,
    sleeveLength: 24,
    inseam: 32,
  });
  const [designName, setDesignName] = useState("My Custom Design");
  
  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Actions
  const addHistoryItem = (action: string) => {
    const newItem = {
      id: Math.random().toString(36).substring(2),
      action,
      timestamp: Date.now()
    };
    
    // If we're not at the end of history, truncate forward history
    const updatedHistory = designHistory.slice(0, historyIndex + 1);
    updatedHistory.push(newItem);
    
    setDesignHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };
  
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      toast.info("Undo: " + designHistory[historyIndex].action);
    } else {
      toast.error("Nothing to undo");
    }
  };
  
  const handleRedo = () => {
    if (historyIndex < designHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      toast.info("Redo: " + designHistory[historyIndex + 1].action);
    } else {
      toast.error("Nothing to redo");
    }
  };
  
  const handleSaveDesign = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Design saved successfully!");
      setIsLoading(false);
    }, 1500);
  };
  
  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Item added to cart!");
      setIsLoading(false);
    }, 1500);
  };
  
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // In a real implementation, we would process the image
      toast.success(`Image "${file.name}" added to design`);
      addHistoryItem(`Added image: ${file.name}`);
    }
  };
  
  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };
  
  const applyFabric = (fabric: typeof FABRIC_TYPES[0]) => {
    setSelectedFabric(fabric);
    toast.success(`Applied ${fabric.name} fabric`);
    addHistoryItem(`Changed fabric to ${fabric.name}`);
  };
  
  const applyColor = (color: typeof COLOR_PALETTE[0]) => {
    setSelectedColor(color);
    toast.success(`Applied ${color.name} color`);
    addHistoryItem(`Changed color to ${color.name}`);
  };
  
  const applyDesignElement = (element: { id: string, name: string }) => {
    toast.success(`Added ${element.name} to design`);
    addHistoryItem(`Added ${element.name} element`);
  };
  
  // Calculate total price
  const calculateTotalPrice = () => {
    const garmentPrice = selectedGarment.basePrice;
    const fabricPrice = selectedFabric.price;
    const customizationPrice = 250; // Base customization fee
    
    return garmentPrice + fabricPrice + customizationPrice;
  };
  
  // Initialize with first history item
  useEffect(() => {
    if (designHistory.length === 0) {
      addHistoryItem("Started new design");
    }
  }, []);
  
  // UI Elements for the designer app
  
  // Fabric content panel
  const fabricContent = (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {FABRIC_TYPES.map((fabric) => (
        <div 
          key={fabric.id}
          className={`group cursor-pointer border rounded-lg overflow-hidden transition-all ${
            selectedFabric.id === fabric.id ? 'ring-2 ring-indigo-500 ring-offset-2' : 'hover:shadow-md'
          }`}
          onClick={() => applyFabric(fabric)}
        >
          <div className="aspect-square overflow-hidden">
            <img 
              src={fabric.image} 
              alt={fabric.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="p-2 bg-white">
            <h3 className="font-medium text-sm">{fabric.name}</h3>
            <p className="text-xs text-gray-500">{fabric.properties}</p>
            <p className="text-xs font-semibold mt-1">₹{fabric.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
  
  // Color content panel
  const colorContent = (
    <div>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {COLOR_PALETTE.map((color) => (
          <div
            key={color.hex}
            className={`w-full aspect-square rounded-md cursor-pointer transition-transform hover:scale-105 ${
              selectedColor.hex === color.hex ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => applyColor(color)}
            title={color.name}
          />
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-sm mb-2">Selected Color</h3>
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-full" 
            style={{ backgroundColor: selectedColor.hex }}
          />
          <div>
            <p className="font-medium">{selectedColor.name}</p>
            <p className="text-xs text-gray-500">{selectedColor.hex}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Design elements content panel
  const designElementsContent = (
    <div className="space-y-6">
      {DESIGN_ELEMENTS.map((category) => (
        <div key={category.category}>
          <h3 className="font-medium text-sm mb-2">{category.category}</h3>
          <div className="grid grid-cols-3 gap-2">
            {category.items.map((item) => (
              <Button
                key={item.id}
                variant="tool"
                className="h-auto py-3 flex flex-col items-center justify-center"
                onClick={() => applyDesignElement(item)}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  // Tab items for the designer store
  const tabItems = [
    {
      id: "fabric",
      name: "Fabric",
      icon: <Layers className="h-4 w-4" />,
      content: fabricContent
    },
    {
      id: "color",
      name: "Color",
      icon: <Palette className="h-4 w-4" />,
      content: colorContent
    },
    {
      id: "elements",
      name: "Elements",
      icon: <Paintbrush className="h-4 w-4" />,
      content: designElementsContent
    }
  ];
  
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center">
            <Input 
              value={designName} 
              onChange={(e) => setDesignName(e.target.value)}
              className="border-0 focus-visible:ring-0 font-semibold px-0 text-lg max-w-[240px]"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="hidden sm:flex"
            onClick={handleSaveDesign}
            disabled={isLoading}
          >
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="hidden sm:flex"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          <Button 
            variant="designer" 
            size="sm"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
            Add to Cart • ₹{calculateTotalPrice().toLocaleString()}
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Garment selection and settings */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          {/* Garment tabs */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-sm mb-3">Garment Type</h2>
            <div className="grid grid-cols-3 gap-2">
              {GARMENT_TEMPLATES.slice(0, 6).map((garment) => (
                <div
                  key={garment.id}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer border relative ${
                    selectedGarment.id === garment.id ? 'ring-2 ring-indigo-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedGarment(garment);
                    addHistoryItem(`Selected ${garment.name}`);
                  }}
                >
                  <img
                    src={garment.image}
                    alt={garment.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedGarment.id === garment.id && (
                    <div className="absolute top-1 right-1 bg-indigo-500 rounded-full p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Garment regions selection */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-sm mb-3">Design Region</h2>
            <div className="grid grid-cols-2 gap-2">
              {selectedGarment.regions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "toolActive" : "tool"}
                  className="h-auto py-2 justify-start"
                  onClick={() => setSelectedRegion(region)}
                >
                  <span className="capitalize">{region}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Measurements section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-sm">Measurements</h2>
              <Button variant="ghost" size="xs" className="h-7">
                <Ruler className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Chest:</span>
                <span>{measurements.chest}" (101.6cm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Waist:</span>
                <span>{measurements.waist}" (86.4cm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shoulder Width:</span>
                <span>{measurements.shoulderWidth}" (45.7cm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sleeve Length:</span>
                <span>{measurements.sleeveLength}" (61.0cm)</span>
              </div>
            </div>
          </div>
          
          {/* Design history */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-sm">Design History</h2>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  disabled={historyIndex <= 0}
                  onClick={handleUndo}
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  disabled={historyIndex >= designHistory.length - 1}
                  onClick={handleRedo}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              {designHistory.map((item, index) => (
                <div 
                  key={item.id}
                  className={`text-xs p-2 rounded border ${
                    index === historyIndex ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{item.action}</span>
                    <span className="text-gray-400 text-[10px]">
                      {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main canvas area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas */}
          <div className="flex-1 overflow-hidden bg-gray-100 flex items-center justify-center p-4 relative">
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoomLevel(Math.max(zoomLevel - 10, 50))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-12 text-center">{zoomLevel}%</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoomLevel(Math.min(zoomLevel + 10, 200))}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative bg-white rounded-lg shadow-xl overflow-hidden" style={{
              transform: `scale(${zoomLevel / 100})`,
              width: '600px',
              height: '700px'
            }}>
              <canvas ref={canvasRef} width="600" height="700" className={`w-full h-full ${showGrid ? 'bg-grid' : ''}`} />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={selectedGarment.image}
                  alt={selectedGarment.name}
                  className="max-w-full max-h-full object-contain opacity-10"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg">
                    <p className="text-lg mb-3 text-gray-600 font-medium">Designing {selectedGarment.name} - {selectedRegion} region</p>
                    <p className="text-sm mb-2">Current selections:</p>
                    <div className="flex items-center space-x-2 mb-1 text-sm">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor.hex }}></div>
                      <p><span className="font-medium">Color:</span> {selectedColor.name}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Layers className="h-4 w-4 text-gray-500" />
                      <p><span className="font-medium">Fabric:</span> {selectedFabric.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Toolbar */}
          <div className="h-16 bg-white border-t border-gray-200 flex items-center px-4 justify-between">
            <div className="flex items-center space-x-1">
              <Button
                variant={selectedTool === "select" ? "toolActive" : "tool"}
                size="icon"
                onClick={() => setSelectedTool("select")}
                title="Select Tool"
              >
                <Sliders className="h-4 w-4" />
              </Button>
              
              <Button
                variant={selectedTool === "draw" ? "toolActive" : "tool"}
                size="icon"
                onClick={() => setSelectedTool("draw")}
                title="Draw Tool"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              
              <Button
                variant={selectedTool === "text" ? "toolActive" : "tool"}
                size="icon"
                onClick={() => setSelectedTool("text")}
                title="Text Tool"
              >
                <Text className="h-4 w-4" />
              </Button>
              
              <Button
                variant={selectedTool === "shape" ? "toolActive" : "tool"}
                size="icon"
                onClick={() => setSelectedTool("shape")}
                title="Shape Tool"
              >
                <PanelTop className="h-4 w-4" />
              </Button>
              
              <Button
                variant={selectedTool === "erase" ? "toolActive" : "tool"}
                size="icon"
                onClick={() => setSelectedTool("erase")}
                title="Erase Tool"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              
              <div className="w-px h-8 bg-gray-200 mx-1"></div>
              
              <Button
                variant="tool"
                size="icon"
                onClick={handleImageUpload}
                title="Upload Image"
              >
                <ImageIcon className="h-4 w-4" />
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              
              <Button
                variant="tool"
                size="icon"
                onClick={() => setShowGrid(!showGrid)}
                title={showGrid ? "Hide Grid" : "Show Grid"}
                className={showGrid ? "bg-gray-100" : ""}
              >
                <FileSymlink className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500 hidden sm:block">
                Design Price: <span className="font-medium text-gray-900">₹{calculateTotalPrice().toLocaleString()}</span>
              </div>
              
              <Button
                variant="designer"
                size="sm"
                onClick={handleAddToCart}
                className="sm:hidden"
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right sidebar - Design elements */}
        <div className="w-72 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="font-medium text-base mb-4">Design Elements</h2>
            
            <TabStore items={tabItems} />
            
            <div className="mt-6 bg-indigo-50 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-indigo-700 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Artist Marketplace
              </h3>
              <p className="text-sm text-indigo-700 mb-3">Browse exclusive designs from our artists</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search designs..." 
                  className="pl-9 bg-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i}
                    className="aspect-square rounded-md bg-white border border-gray-200 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all flex items-center justify-center"
                  >
                    <Paintbrush className="h-6 w-6 text-gray-400" />
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-2 w-full text-indigo-600">
                Browse All Designs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailorNova;
