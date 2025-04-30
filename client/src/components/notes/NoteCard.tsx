import { useState } from "react";
import { Document } from "../../types";
import { useAppContext } from "../../context/AppContext";

interface NoteCardProps {
  note: Document;
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setActiveView } = useAppContext();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCreateFlashcards = () => {
    setActiveView("flashcards");
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{note.title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Generated from "{note.source}" • {note.date}
          </p>
        </div>
        <div>
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200"
            >
              <i className="fas fa-download mr-2"></i>
              Download
            </button>
          </span>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="prose max-w-none">
          {note.content.keyPoints && note.content.keyPoints.length > 0 && (
            <>
              <h4>Key Concepts</h4>
              <ul>
                {note.content.keyPoints.map((point, index) => (
                  <li key={index}>
                    <strong>{point.title}</strong> {point.description}
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {note.content.sections && note.content.sections.map((section, index) => (
            <div key={index}>
              <h4>{section.title}</h4>
              <p>{section.content}</p>
            </div>
          ))}
          
          <div className="flex justify-between mt-4">
            <button
              className="text-primary-600 font-medium text-sm"
              onClick={toggleExpand}
            >
              {isExpanded ? "Hide details" : "View full notes"}
            </button>
            <div>
              <button
                className="text-gray-600 text-sm mr-4"
                onClick={handleCreateFlashcards}
              >
                <i className="fas fa-lightbulb mr-1"></i> Generate flashcards
              </button>
              <button className="text-gray-600 text-sm">
                <i className="fas fa-question-circle mr-1"></i> Generate practice questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
