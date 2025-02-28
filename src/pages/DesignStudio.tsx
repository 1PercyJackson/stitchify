
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Palette, 
  Shapes, 
  Type, 
  Image as ImageIcon, 
  Upload, 
  Sliders, 
  MousePointer, 
  Scissors, 
  Eraser, 
  RotateCcw, 
  RotateCw, 
  Save, 
  ShoppingBag, 
  ChevronDown,
  RefreshCw,
  CheckCircle2,
  X,
  Wand2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface ColorOption {
  name: string;
  hex: string;
}

interface GarmentOption {
  id: string;
  name: string;
  image: string;
  basePrice: number;
}

interface FabricOption {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const DesignStudio = () => {
  const [selectedGarment, setSelectedGarment] = useState<string>("tshirt");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [selectedFabric, setSelectedFabric] = useState<string>("cotton");
  const [canvasObject, setCanvasObject] = useState<any | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [designHistory, setDesignHistory] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("#3B82F6");
  const [brushSize, setBrushSize] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzeProgress, setAnalyzeProgress] = useState<number>(0);
  const [customizationPrice, setCustomizationPrice] = useState<number>(150);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null);
  const [selectedPatterns, setSelectedPatterns] = useState<{[key: string]: string}>({});
  const [designComplexity, setDesignComplexity] = useState<number>(1); // 1-5 scale
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sketchInputRef = useRef<HTMLInputElement>(null);
  
  // Garment options with prices
  const garmentOptions: GarmentOption[] = [
    { id: "tshirt", name: "T-Shirt", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3", basePrice: 799 },
    { id: "hoodie", name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3", basePrice: 1299 },
    { id: "jeans", name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3", basePrice: 1499 },
    { id: "dress", name: "Dress", image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3", basePrice: 1799 },
    { id: "jacket", name: "Jacket", image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3", basePrice: 2499 },
  ];
  
  // Fabric options with prices
  const fabricOptions: FabricOption[] = [
    { 
      id: "cotton", 
      name: "Cotton", 
      image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3", 
      price: 200,
      description: "Soft, breathable natural fabric, perfect for everyday wear"
    },
    { 
      id: "linen", 
      name: "Linen", 
      image: "https://images.unsplash.com/photo-1583922146233-a44bafbf0f4a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3", 
      price: 350,
      description: "Light, airy fabric ideal for summer clothing with natural texture"
    },
    { 
      id: "silk", 
      name: "Silk", 
      image: "https://images.unsplash.com/photo-1639556522714-bbd750676440?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3", 
      price: 800,
      description: "Luxurious, smooth fabric with a beautiful drape and natural sheen"
    },
    { 
      id: "denim", 
      name: "Denim", 
      image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3", 
      price: 450,
      description: "Durable cotton twill fabric, perfect for jeans and casual wear"
    },
    { 
      id: "wool", 
      name: "Wool", 
      image: "https://images.unsplash.com/photo-1574023347885-1b37e9d1684b?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3", 
      price: 650,
      description: "Warm, natural fiber perfect for cold weather garments"
    },
  ];
  
  // Pattern options
  const patternOptions = [
    { id: "solid", name: "Solid", price: 0 },
    { id: "stripes", name: "Stripes", price: 50 },
    { id: "polkaDots", name: "Polka Dots", price: 75 },
    { id: "floral", name: "Floral", price: 100 },
    { id: "plaid", name: "Plaid", price: 100 },
    { id: "geometric", name: "Geometric", price: 125 },
  ];
  
  // Color options
  const colorOptions: ColorOption[] = [
    { name: "Blue", hex: "#3B82F6" },
    { name: "Red", hex: "#EF4444" },
    { name: "Green", hex: "#10B981" },
    { name: "Yellow", hex: "#F59E0B" },
    { name: "Purple", hex: "#8B5CF6" },
    { name: "Pink", hex: "#EC4899" },
    { name: "Black", hex: "#1F2937" },
    { name: "White", hex: "#F9FAFB" },
  ];
  
  // Shape templates
  const shapeTemplates = [
    { type: "rect", name: "Rectangle" },
    { type: "circle", name: "Circle" },
    { type: "triangle", name: "Triangle" },
    { type: "star", name: "Star" },
  ];
  
  // Garment regions
  const garmentRegions = {
    tshirt: [
      { id: "front", name: "Front" },
      { id: "back", name: "Back" },
      { id: "sleeve_left", name: "Left Sleeve" },
      { id: "sleeve_right", name: "Right Sleeve" },
      { id: "collar", name: "Collar" },
    ],
    hoodie: [
      { id: "front", name: "Front" },
      { id: "back", name: "Back" },
      { id: "hood", name: "Hood" },
      { id: "sleeve_left", name: "Left Sleeve" },
      { id: "sleeve_right", name: "Right Sleeve" },
      { id: "pocket", name: "Pocket" },
    ],
    jeans: [
      { id: "front", name: "Front" },
      { id: "back", name: "Back" },
      { id: "pockets", name: "Pockets" },
      { id: "waistband", name: "Waistband" },
    ],
    dress: [
      { id: "top", name: "Top" },
      { id: "skirt", name: "Skirt" },
      { id: "back", name: "Back" },
      { id: "sleeves", name: "Sleeves" },
    ],
    jacket: [
      { id: "front", name: "Front" },
      { id: "back", name: "Back" },
      { id: "sleeves", name: "Sleeves" },
      { id: "collar", name: "Collar" },
      { id: "pockets", name: "Pockets" },
    ],
  };
  
  // Calculate total price whenever relevant factors change
  useEffect(() => {
    const selectedGarmentObj = garmentOptions.find(g => g.id === selectedGarment);
    const selectedFabricObj = fabricOptions.find(f => f.id === selectedFabric);
    
    const garmentPrice = selectedGarmentObj ? selectedGarmentObj.basePrice : 0;
    const fabricPrice = selectedFabricObj ? selectedFabricObj.price : 0;
    
    // Calculate complexity-based pricing
    const complexityPrice = Math.min(200, designComplexity * 40); // Max Rs. 200 for complexity
    
    // Calculate total
    const total = garmentPrice + fabricPrice + complexityPrice;
    
    setCustomizationPrice(complexityPrice);
    setTotalPrice(total);
  }, [selectedGarment, selectedFabric, designComplexity]);
  
  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current && !canvasObject) {
      // In a real implementation, we'd initialize a fabric.js Canvas here
      // For now, we'll simulate the behavior
      setCanvasObject({});
      
      // Add initial history state
      setDesignHistory([{}]);
    }
  }, []);
  
  // Update garment preview when garment or fabric changes
  useEffect(() => {
    // In a real app, this would generate a composite image
    // For now, we'll just use the garment image
    const selectedGarmentObj = garmentOptions.find(g => g.id === selectedGarment);
    if (selectedGarmentObj) {
      setGarmentPreview(selectedGarmentObj.image);
    }
  }, [selectedGarment, selectedFabric, selectedColor, selectedPatterns]);
  
  // Handle tool selection
  useEffect(() => {
    if (!canvasObject) return;
    
    // In a real app, we'd update canvas properties based on selected tool
    console.log("Selected tool:", selectedTool);
    console.log("Selected color:", selectedColor);
    console.log("Brush size:", brushSize);
  }, [selectedTool, selectedColor, brushSize, canvasObject]);
  
  // Simulated functions for the design editor
  
  const handleCanvasChange = () => {
    // In a real app, this would update history with canvas state
    console.log("Canvas updated");
    
    // Simulated history update
    const newHistory = designHistory.slice(0, historyIndex + 1);
    newHistory.push({});
    
    setDesignHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Update design complexity when canvas changes
    // In a real app, this would analyze the complexity of the design
    const newComplexity = Math.min(5, designComplexity + Math.random() * 0.5);
    setDesignComplexity(newComplexity);
  };
  
  const addShape = (shapeType: string) => {
    if (!canvasObject) return;
    
    // Simulated shape addition
    console.log(`Adding ${shapeType} shape`);
    toast.success(`${shapeType} added to design`);
    handleCanvasChange();
    setSelectedTool("select");
  };
  
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const processUploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Simulated image upload
    toast.success("Image added to design");
    handleCanvasChange();
    setSelectedTool("select");
    
    // Increase design complexity when adding images
    setDesignComplexity(Math.min(5, designComplexity + 0.7));
  };
  
  const handleSketchUpload = () => {
    if (sketchInputRef.current) {
      sketchInputRef.current.click();
    }
  };
  
  const analyzeSketch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsAnalyzing(true);
    setAnalyzeProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalyzeProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            
            // Simulate determining garment type from sketch
            const garmentTypes = ["tshirt", "dress", "hoodie"];
            const determinedType = garmentTypes[Math.floor(Math.random() * garmentTypes.length)];
            
            setSelectedGarment(determinedType);
            setDesignComplexity(4); // Hand-drawn designs usually have higher complexity
            
            toast.success(`Design analyzed! We've detected a ${garmentOptions.find(g => g.id === determinedType)?.name.toLowerCase()}.`);
          }, 500);
        }
        return newProgress;
      });
    }, 200);
    
    // Create file reader to display the sketch
    const reader = new FileReader();
    reader.onload = (event) => {
      // In a real app, we'd process the image with AI to detect garment type
      // For now, we'll just display the image as a preview
      if (event.target?.result) {
        setGarmentPreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      toast.info("Undo successful");
    } else {
      toast.error("Nothing to undo");
    }
  };
  
  const handleRedo = () => {
    if (historyIndex < designHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      toast.info("Redo successful");
    } else {
      toast.error("Nothing to redo");
    }
  };
  
  const handleSaveDesign = () => {
    setIsLoading(true);
    
    // Simulate saving process
    setTimeout(() => {
      toast.success("Design saved successfully!");
      setIsLoading(false);
    }, 1500);
  };
  
  const handleZoomChange = (newZoom: number[]) => {
    setZoomLevel(newZoom[0]);
  };
  
  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
    toast.info(showGrid ? "Grid hidden" : "Grid shown");
  };
  
  const addToCart = () => {
    setIsLoading(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      toast.success("Design added to cart!");
      setIsLoading(false);
    }, 1500);
  };
  
  const selectPattern = (pattern: string) => {
    if (selectedRegion) {
      const updatedPatterns = { ...selectedPatterns };
      updatedPatterns[selectedRegion] = pattern;
      setSelectedPatterns(updatedPatterns);
      
      toast.success(`${pattern} pattern applied to ${garmentRegions[selectedGarment as keyof typeof garmentRegions]?.find(r => r.id === selectedRegion)?.name}`);
      
      // Increase complexity based on pattern choice
      const patternComplexity = patternOptions.findIndex(p => p.name === pattern) * 0.2;
      setDesignComplexity(Math.min(5, designComplexity + patternComplexity));
    }
  };
  
  // Animation variants
  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    }
  };
  
  const toolbarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.2, 
        duration: 0.5 
      } 
    }
  };
  
  const regionPopupVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      } 
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      transition: { 
        duration: 0.2 
      } 
    }
  };
  
  // Find currently selected garment and fabric objects
  const currentGarment = garmentOptions.find(g => g.id === selectedGarment);
  const currentFabric = fabricOptions.find(f => f.id === selectedFabric);
  
  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Design Studio</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={handleSaveDesign}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
            
            <Button 
              className="flex items-center"
              onClick={addToCart}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShoppingBag className="mr-2 h-4 w-4" />
              )}
              Add to Cart (₹{totalPrice.toLocaleString()})
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <motion.div 
          className="w-80 bg-white border-r border-gray-200 overflow-y-auto"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-4">
            <div className="mb-5">
              <Button
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-indigo-200"
                onClick={handleSketchUpload}
              >
                <Wand2 className="h-4 w-4 text-indigo-600" />
                <span className="text-indigo-700">Upload Hand-Drawn Design</span>
                <input 
                  ref={sketchInputRef}
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={analyzeSketch}
                />
              </Button>
              
              {isAnalyzing && (
                <div className="mt-2">
                  <p className="text-xs text-center mb-1">Analyzing your sketch...</p>
                  <Progress value={analyzeProgress} className="h-2" />
                </div>
              )}
            </div>
            
            <Tabs defaultValue="garment" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="garment">Garment</TabsTrigger>
                <TabsTrigger value="fabric">Fabric</TabsTrigger>
                <TabsTrigger value="regions">Regions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="garment" className="space-y-4">
                <h3 className="font-medium text-sm">Select Garment Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {garmentOptions.map((garment) => (
                    <div
                      key={garment.id}
                      className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all transform ${
                        selectedGarment === garment.id ? 'border-indigo-500 scale-[1.02]' : 'border-transparent hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedGarment(garment.id)}
                    >
                      <div className="aspect-square">
                        <img 
                          src={garment.image} 
                          alt={garment.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-2 text-sm font-medium">
                        <div>{garment.name}</div>
                        <div className="text-xs font-normal text-white/90">₹{garment.basePrice.toLocaleString()}</div>
                      </div>
                      {selectedGarment === garment.id && (
                        <div className="absolute top-2 right-2 bg-indigo-500 rounded-full h-5 w-5 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="fabric" className="space-y-4">
                <h3 className="font-medium text-sm">Select Fabric Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {fabricOptions.map((fabric) => (
                    <div
                      key={fabric.id}
                      className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all transform ${
                        selectedFabric === fabric.id ? 'border-indigo-500 scale-[1.02]' : 'border-transparent hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedFabric(fabric.id)}
                    >
                      <div className="aspect-square">
                        <img 
                          src={fabric.image} 
                          alt={fabric.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-2 text-sm font-medium">
                        <div>{fabric.name}</div>
                        <div className="text-xs font-normal text-white/90">₹{fabric.price.toLocaleString()}</div>
                      </div>
                      {selectedFabric === fabric.id && (
                        <div className="absolute top-2 right-2 bg-indigo-500 rounded-full h-5 w-5 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {currentFabric && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <p>{currentFabric.description}</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="regions" className="space-y-4">
                <h3 className="font-medium text-sm">Select Region to Edit</h3>
                <div className="space-y-2">
                  {selectedGarment && garmentRegions[selectedGarment as keyof typeof garmentRegions] ? (
                    garmentRegions[selectedGarment as keyof typeof garmentRegions].map((region) => (
                      <div
                        key={region.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedRegion === region.id ? 'bg-indigo-50 border-indigo-300' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedRegion(region.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{region.name}</span>
                          {selectedPatterns[region.id] ? (
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                              {selectedPatterns[region.id]}
                            </span>
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Please select a garment first</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Design properties */}
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Design Properties</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="zoom">Zoom: {zoomLevel}%</Label>
                    <Slider
                      id="zoom"
                      min={50}
                      max={200}
                      step={5}
                      value={[zoomLevel]}
                      onValueChange={handleZoomChange}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-grid">Show Grid</Label>
                    <Switch
                      id="show-grid"
                      checked={showGrid}
                      onCheckedChange={handleToggleGrid}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Material Preview</Label>
                    <Select value={selectedFabric} onValueChange={setSelectedFabric}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {fabricOptions.map((fabric) => (
                          <SelectItem key={fabric.id} value={fabric.id}>
                            {fabric.name} (₹{fabric.price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="complexity">Design Complexity</Label>
                    <div className="flex gap-2 items-center">
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-indigo-600"
                          style={{ width: `${(designComplexity / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{designComplexity.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pricing information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Design Price Estimation</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Base Price ({currentGarment?.name}):</span>
                    <span>₹{currentGarment?.basePrice.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fabric ({currentFabric?.name}):</span>
                    <span>₹{currentFabric?.price.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Customization (Complexity {designComplexity.toFixed(1)}):</span>
                    <span>₹{customizationPrice.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>Total Estimate:</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Main design area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Design canvas */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-auto flex items-center justify-center p-4 bg-gray-100"
          >
            <div className={`relative bg-white shadow-lg ${showGrid ? 'bg-grid' : ''}`}>
              <canvas ref={canvasRef} width="800" height="600" className="block" />
              
              {/* Placeholder garment image for demonstration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={garmentPreview || (currentGarment ? currentGarment.image : '')}
                  alt={currentGarment?.name || "Garment"}
                  className="max-w-full max-h-full object-contain opacity-80"
                />
                
                {!selectedRegion && !isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/30 backdrop-blur-sm px-5 py-3 rounded-lg text-white">
                      <p>Click on a region to customize it</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Tool bar */}
          <motion.div 
            className="bg-white border-t border-gray-200 p-4"
            variants={toolbarVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                {/* Drawing tools */}
                <Button
                  variant={selectedTool === "select" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setSelectedTool("select")}
                  title="Select Tool"
                >
                  <MousePointer className="h-5 w-5" />
                </Button>
                
                <Button
                  variant={selectedTool === "draw" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setSelectedTool("draw")}
                  title="Draw Tool"
                >
                  <Palette className="h-5 w-5" />
                </Button>
                
                <Button
                  variant={selectedTool === "cut" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setSelectedTool("cut")}
                  title="Cut Tool"
                >
                  <Scissors className="h-5 w-5" />
                </Button>
                
                <Button
                  variant={selectedTool === "erase" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setSelectedTool("erase")}
                  title="Eraser Tool"
                >
                  <Eraser className="h-5 w-5" />
                </Button>
                
                <div className="h-8 w-px bg-gray-300 mx-2"></div>
                
                {/* Color picker */}
                <div className="flex items-center">
                  <div 
                    className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer mr-2"
                    style={{ backgroundColor: selectedColor }}
                    title="Current Color"
                  />
                  
                  <div className="flex space-x-1">
                    {colorOptions.map((color) => (
                      <div
                        key={color.hex}
                        className={`h-6 w-6 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                          selectedColor === color.hex ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                        }`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color.hex)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="h-8 w-px bg-gray-300 mx-2"></div>
                
                {/* Shapes */}
                <div className="flex items-center space-x-1">
                  {shapeTemplates.map((shape) => (
                    <Button
                      key={shape.type}
                      variant="outline"
                      size="icon"
                      onClick={() => addShape(shape.type)}
                      title={`Add ${shape.name}`}
                    >
                      <Shapes className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
                
                <div className="h-8 w-px bg-gray-300 mx-2"></div>
                
                {/* Text and Images */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => addShape("text")}
                  title="Add Text"
                >
                  <Type className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleImageUpload}
                  title="Upload Image"
                >
                  <ImageIcon className="h-5 w-5" />
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={processUploadedFile}
                  />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Undo/Redo */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  title="Undo"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRedo}
                  disabled={historyIndex >= designHistory.length - 1}
                  title="Redo"
                >
                  <RotateCw className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Region popup (shows when a region is selected) */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRegion(null)}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-2xl p-6"
              variants={regionPopupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  Customize {garmentRegions[selectedGarment as keyof typeof garmentRegions]?.find(r => r.id === selectedRegion)?.name}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedRegion(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {garmentPreview ? (
                      <img 
                        src={garmentPreview} 
                        alt={currentGarment?.name || "Garment preview"} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400">Region preview</div>
                    )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                    <h4 className="text-sm font-medium text-indigo-700 mb-1">Live Preview</h4>
                    <p className="text-xs text-indigo-600">
                      Changes will be immediately visible on your design, and price will update automatically.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <div
                          key={color.hex}
                          className={`h-8 w-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                            selectedColor === color.hex ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColor(color.hex)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Material</h3>
                    <Select value={selectedFabric} onValueChange={setSelectedFabric}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {fabricOptions.map((fabric) => (
                          <SelectItem key={fabric.id} value={fabric.id}>
                            {fabric.name} (₹{fabric.price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Pattern</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {patternOptions.map((pattern) => (
                        <Button
                          key={pattern.id}
                          variant="outline"
                          className={`h-auto py-2 ${
                            selectedPatterns[selectedRegion] === pattern.name ? 
                            'bg-indigo-50 border-indigo-300 text-indigo-700' : 
                            ''
                          }`}
                          onClick={() => selectPattern(pattern.name)}
                        >
                          {pattern.name}
                          {pattern.price > 0 && (
                            <span className="text-xs ml-1 opacity-70">+₹{pattern.price}</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full"
                      onClick={() => setSelectedRegion(null)}
                    >
                      Apply Changes
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesignStudio;
