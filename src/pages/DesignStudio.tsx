
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
  CheckCircle2
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
import { useEffect, useRef, useState } from "react";

interface ColorOption {
  name: string;
  hex: string;
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
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Garment options
  const garmentOptions = [
    { id: "tshirt", name: "T-Shirt", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { id: "hoodie", name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { id: "jeans", name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { id: "dress", name: "Dress", image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { id: "jacket", name: "Jacket", image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" },
  ];
  
  // Fabric options
  const fabricOptions = [
    { id: "cotton", name: "Cotton", image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { id: "linen", name: "Linen", image: "https://images.unsplash.com/photo-1583922146233-a44bafbf0f4a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { id: "silk", name: "Silk", image: "https://images.unsplash.com/photo-1639556522714-bbd750676440?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { id: "denim", name: "Denim", image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3" },
    { id: "wool", name: "Wool", image: "https://images.unsplash.com/photo-1574023347885-1b37e9d1684b?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3" },
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
              Add to Cart
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
                        {garment.name}
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
                        {fabric.name}
                      </div>
                      {selectedFabric === fabric.id && (
                        <div className="absolute top-2 right-2 bg-indigo-500 rounded-full h-5 w-5 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                          <ChevronDown className="h-4 w-4 text-gray-500" />
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
                            {fabric.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Pricing information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Design Price Estimation</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Base Price ({selectedGarment}):</span>
                    <span>₹799</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fabric ({selectedFabric}):</span>
                    <span>₹200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Customization:</span>
                    <span>₹150</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>Total Estimate:</span>
                    <span>₹1,149</span>
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
                  src={garmentOptions.find(g => g.id === selectedGarment)?.image} 
                  alt={selectedGarment}
                  className="max-w-full max-h-full object-contain opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center text-lg text-gray-400">
                  <p>Click on a region to customize it</p>
                </div>
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
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-400">Region preview</div>
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
                            {fabric.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Pattern</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {["Solid", "Stripes", "Polka Dots", "Floral", "Plaid", "Geometric"].map((pattern) => (
                        <Button
                          key={pattern}
                          variant="outline"
                          className="h-auto py-2"
                        >
                          {pattern}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full">Apply Changes</Button>
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
