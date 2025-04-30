import { useRef, useState, DragEvent } from "react";

interface UploadPanelProps {
  onUpload: (files: FileList | null) => void;
  isProcessing: boolean;
}

export default function UploadPanel({ onUpload, isProcessing }: UploadPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    onUpload(e.dataTransfer.files);
  };

  return (
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center">
            <div 
              className={`rounded-md ${isDragging ? 'bg-primary-100' : 'bg-primary-50'} px-6 py-10 sm:px-10 sm:py-16 w-full`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <i className="fas fa-cloud-upload-alt text-4xl text-primary-500 mb-4"></i>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Upload your study material</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Upload PDFs, images, or text documents to get started</p>
                </div>
                <div className="mt-6">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleClick}
                      disabled={isProcessing}
                      className={`cursor-pointer ${isProcessing ? 'bg-gray-400' : 'bg-primary-600 hover:bg-primary-700'} text-white px-4 py-2 rounded-md text-sm font-medium flex items-center`}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Select Files"
                      )}
                      <input 
                        ref={fileInputRef}
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        multiple 
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={isProcessing}
                      />
                    </button>
                    <p className="mt-2 text-xs text-gray-500">or drag and drop files here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
