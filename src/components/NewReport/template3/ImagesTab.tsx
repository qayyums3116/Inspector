// src/components/NewReport/template3/ImagesTab.tsx
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, X, ArrowLeft, ArrowRight } from "lucide-react";

interface ImagesTab3Props {
  uploadedImages: File[];
  captions: string[];
  setCaption: (index: number, text: string) => void;
  handleImageUpload: (files: FileList) => void;
  removeImage: (index: number) => void;
  navigateToTab: (tab: "details" | "generate") => void;
  MAX_IMAGES: number;
}

const ImagesTab3: React.FC<ImagesTab3Props> = ({
  uploadedImages,
  captions,
  setCaption,
  handleImageUpload,
  removeImage,
  navigateToTab,
  MAX_IMAGES,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (uploadedImages.length >= MAX_IMAGES) return;
      const files = e.dataTransfer.files;
      if (!files.length) return;
      if (uploadedImages.length + files.length > MAX_IMAGES) {
        alert(`Up to ${MAX_IMAGES} images only`);
        return;
      }
      handleImageUpload(files);
      // If this is the very first image, default its caption to "Overview"
      if (uploadedImages.length === 0) {
        setCaption(0, "Overview");
      }
    },
    [uploadedImages, MAX_IMAGES, handleImageUpload, setCaption]
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const onSelectFilesClick = () => fileInputRef.current?.click();

  return (
    <div className="bg-white rounded-b-md p-6 shadow-sm">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Upload Inspection Images</h3>
          <p className="text-gray-500 mb-1">
            Add visual documentation of your findings
          </p>
          <p className="text-gray-400 text-sm mb-4">
            {uploadedImages.length} of {MAX_IMAGES} images uploaded (
            {MAX_IMAGES - uploadedImages.length} remaining)
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer ${
            isDragging ? "border-inspectoriq-blue bg-blue-50" : "border-gray-300"
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <UploadCloud className="h-12 w-12 text-inspectoriq-blue mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop images here</p>
          <p className="text-gray-400 text-sm mb-4">
            Supported formats: JPG, PNG, WEBP (max 5 MB each)
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files) {
              handleImageUpload(e.target.files);
              if (uploadedImages.length === 0) {
                setCaption(0, "Overview");
              }
            }
            e.target.value = "";
          }}
          disabled={uploadedImages.length >= MAX_IMAGES}
        />

        <div className="text-center">
          <Button
            variant="outline"
            className="border-inspectoriq-blue text-inspectoriq-blue hover:bg-blue-50"
            disabled={uploadedImages.length >= MAX_IMAGES}
            onClick={onSelectFilesClick}
          >
            Select Files
          </Button>
        </div>

        {uploadedImages.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Uploaded Images</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedImages.map((file, idx) => (
                <div key={idx} className="relative group">
                  <div className="aspect-square rounded-md overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(idx)}
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                  <Input
                    placeholder="Enter caption"
                    value={idx === 0 ? captions[0] || "Overview" : captions[idx] || ""}
                    onChange={(e) => setCaption(idx, e.target.value)}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => navigateToTab("details")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Button>
          <Button
            variant="outline"
            className="border-inspectoriq-blue text-inspectoriq-blue hover:bg-blue-50"
            onClick={() => navigateToTab("generate")}
          >
            Continue to Generate
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImagesTab3;
