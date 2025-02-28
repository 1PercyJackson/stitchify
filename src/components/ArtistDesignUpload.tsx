
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, AlertTriangle, CheckCircle, Image, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ArtistDesignUploadProps {
  onDesignUploaded?: (designData: {
    imageUrl: string;
    designHash: string;
    title: string;
    price: number;
  }) => void;
  className?: string;
}

export const ArtistDesignUpload: React.FC<ArtistDesignUploadProps> = ({
  onDesignUploaded,
  className
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [designTitle, setDesignTitle] = useState("");
  const [designPrice, setDesignPrice] = useState<number>(999);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setUploadedImage(reader.result as string);
      setIsVerified(false);
      setIsDuplicate(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const verifyDesign = () => {
    if (!uploadedImage) {
      toast.error("Please upload a design first");
      return;
    }

    setIsVerifying(true);
    setVerificationProgress(0);
    setIsDuplicate(false);
    setIsVerified(false);

    // Simulate hash generation and duplicate checking
    const simulateVerification = setInterval(() => {
      setVerificationProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(simulateVerification);
          completeVerification();
        }
        return newProgress;
      });
    }, 200);
  };

  const completeVerification = () => {
    // Simulate checking for duplicates - 10% chance of finding duplicate for demo
    const foundDuplicate = Math.random() < 0.1;
    
    setTimeout(() => {
      setIsVerifying(false);
      setIsDuplicate(foundDuplicate);
      setIsVerified(!foundDuplicate);
      
      if (foundDuplicate) {
        toast.error("Design is too similar to an existing design. Please try a more unique design.");
      } else {
        toast.success("Design verified as unique!");
      }
    }, 500);
  };

  const submitDesign = () => {
    if (!isVerified || !uploadedImage) {
      toast.error("Please verify your design first");
      return;
    }

    if (!designTitle.trim()) {
      toast.error("Please provide a title for your design");
      return;
    }

    if (designPrice <= 0) {
      toast.error("Please set a valid price for your design");
      return;
    }

    // Generate pseudo-hash for demonstration
    const pseudoHash = Math.random().toString(36).substring(2, 15);

    // Call provided callback with design data
    if (onDesignUploaded) {
      onDesignUploaded({
        imageUrl: uploadedImage,
        designHash: pseudoHash,
        title: designTitle,
        price: designPrice
      });
    }

    toast.success("Design submitted to marketplace!");
    
    // Reset form for next design
    setUploadedImage(null);
    setDesignTitle("");
    setDesignPrice(999);
    setIsVerified(false);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setIsVerified(false);
    setIsDuplicate(false);
  };

  return (
    <motion.div 
      className={cn("bg-white rounded-xl shadow-sm p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Sell Your Design</h2>
      
      <div className="space-y-6">
        {/* Design Upload */}
        <div>
          <p className="text-sm text-gray-500 mb-3">
            Upload your original design to sell on our marketplace. All designs are verified for uniqueness.
          </p>
          
          <div 
            className={`border-2 border-dashed rounded-lg p-4 ${
              isDuplicate ? 'border-red-300 bg-red-50' : 
              isVerified ? 'border-green-300 bg-green-50' : 
              'border-gray-300 hover:border-indigo-300'
            } transition-colors cursor-pointer`}
            onClick={handleUploadClick}
          >
            {uploadedImage ? (
              <div className="relative">
                <button 
                  className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
                <img 
                  src={uploadedImage} 
                  alt="Uploaded design" 
                  className="w-full h-48 object-contain rounded"
                />
                <div className="mt-3 flex justify-center">
                  {isDuplicate ? (
                    <span className="flex items-center text-red-600 text-sm font-medium">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Design similar to existing designs
                    </span>
                  ) : isVerified ? (
                    <span className="flex items-center text-green-600 text-sm font-medium">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified unique design
                    </span>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        verifyDesign();
                      }}
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify Design"
                      )}
                    </Button>
                  )}
                </div>
                
                {isVerifying && (
                  <div className="mt-2">
                    <Progress value={verificationProgress} className="h-2" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <Image className="h-10 w-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500">Click to upload your design</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG or SVG, max 5MB</p>
              </div>
            )}
            
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        
        {/* Design Details */}
        {uploadedImage && (
          <div className="space-y-4">
            <div>
              <label htmlFor="designTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Design Title
              </label>
              <input
                id="designTitle"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="My Awesome Design"
                value={designTitle}
                onChange={(e) => setDesignTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="designPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                id="designPrice"
                type="number"
                min="1"
                step="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={designPrice}
                onChange={(e) => setDesignPrice(Number(e.target.value))}
              />
            </div>
            
            <Button 
              className="w-full"
              disabled={!isVerified || !designTitle.trim() || designPrice <= 0}
              onClick={submitDesign}
            >
              <Upload className="h-4 w-4 mr-2" />
              Submit to Marketplace
            </Button>
          </div>
        )}
        
        <div className="text-xs text-gray-500 border-t border-gray-100 pt-4 mt-4">
          <p>By submitting your design, you confirm that:</p>
          <ul className="list-disc pl-4 mt-1 space-y-1">
            <li>This is your original creation</li>
            <li>You have rights to sell this design</li>
            <li>You agree to our artist marketplace terms</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
