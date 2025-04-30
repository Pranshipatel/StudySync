import { useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { generateNotes, processDocument } from "../../lib/data";
import { useToast } from "@/hooks/use-toast";

export default function UploadModal() {
  const { isUploadModalOpen, setIsUploadModalOpen, addDocument, addNote } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [subject, setSubject] = useState("Physics");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const resetForm = () => {
    setSubject("Physics");
    setTitle("");
    setFiles(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    setIsUploadModalOpen(false);
    resetForm();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async () => {
    if (!files || files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for this document.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Process first file (for simplicity)
      const file = files[0];
      
      // Create a document with custom title
      const newDocument = await processDocument(file);
      newDocument.title = title;
      
      addDocument(newDocument);
      
      // Generate notes
      const newNote = await generateNotes(newDocument.id);
      newNote.title = `${title}: Key Concepts`;
      newNote.source = title;
      
      addNote(newNote);
      
      toast({
        title: "Document processed successfully",
        description: `"${title}" has been processed and notes have been generated.`,
      });

      handleClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Processing failed",
        description: "There was an error processing your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isUploadModalOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={handleClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                <i className="fas fa-cloud-upload-alt text-primary-600"></i>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Upload Content
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Upload textbooks, lecture notes, slides, or any study material to generate smart notes and flashcards.
                  </p>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Mathematics</option>
                    <option>Computer Science</option>
                    <option>History</option>
                    <option>Literature</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                    placeholder="e.g., Quantum Physics Textbook"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Files</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <i className="fas fa-file-upload text-3xl text-gray-400"></i>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload-modal" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                          <span>Upload files</span>
                          <input 
                            ref={fileInputRef}
                            id="file-upload-modal" 
                            name="file-upload-modal" 
                            type="file" 
                            className="sr-only" 
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, JPG, PNG up to 50MB
                      </p>
                      {files && files.length > 0 && (
                        <p className="text-sm text-primary-600 mt-2">
                          {files.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Generation Options</label>
                  <div className="mt-2">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="notes" name="notes" type="checkbox" checked className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notes" className="font-medium text-gray-700">Generate smart notes</label>
                      </div>
                    </div>
                    <div className="flex items-start mt-2">
                      <div className="flex items-center h-5">
                        <input id="flashcards" name="flashcards" type="checkbox" checked className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="flashcards" className="font-medium text-gray-700">Generate flashcards</label>
                      </div>
                    </div>
                    <div className="flex items-start mt-2">
                      <div className="flex items-center h-5">
                        <input id="questions" name="questions" type="checkbox" className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="questions" className="font-medium text-gray-700">Generate practice questions</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                isProcessing ? 'bg-gray-400' : 'bg-primary-600 hover:bg-primary-700'
              } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm`}
              onClick={handleSubmit}
              disabled={isProcessing}
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
                "Upload & Process"
              )}
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
