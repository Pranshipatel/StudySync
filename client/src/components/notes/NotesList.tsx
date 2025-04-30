import { Document } from "../../types";
import NoteCard from "./NoteCard";

interface NotesListProps {
  notes: Document[];
}

export default function NotesList({ notes }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="mt-10 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Generated Notes</h3>
        <p className="text-gray-500">
          You haven't generated any notes yet. Upload some documents to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Generated Notes</h3>
      
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
