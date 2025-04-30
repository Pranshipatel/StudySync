import { useState } from "react";
import UploadPanel from "./UploadPanel";
import NotesList from "./NotesList";
import { useAppContext } from "../../context/AppContext";
import { generateNotes, processDocument } from "../../lib/data";
import { useToast } from "@/hooks/use-toast";

export default function SmartNotes() {
  const { addDocument, documents, addNote, notes } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Process document
        const newDocument = await processDocument(file);
        addDocument(newDocument);
        
        // Generate notes
        const newNote = await generateNotes(newDocument.id);
        addNote(newNote);
        
        toast({
          title: "Document processed successfully",
          description: `"${file.name}" has been processed and notes have been generated.`,
        });
      }
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

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Smart Notes Generator
            </h2>
            <p className="mt-1 text-gray-500">
              Upload content to generate concise notes and study materials
            </p>
          </div>
        </div>

        {/* Upload Panel */}
        <UploadPanel onUpload={handleFileUpload} isProcessing={isProcessing} />

        {/* Generated Notes List */}
        <NotesList notes={notes} />
      </div>
    </section>
  );
}
