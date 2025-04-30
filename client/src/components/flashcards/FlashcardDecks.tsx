import { FlashcardDeck } from "../../types";
import DeckCard from "./DeckCard";

interface FlashcardDecksProps {
  decks: FlashcardDeck[];
  onStudyDeck: (deck: FlashcardDeck) => void;
}

export default function FlashcardDecks({ decks, onStudyDeck }: FlashcardDecksProps) {
  if (decks.length === 0) {
    return (
      <div className="mt-6 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Flashcard Decks</h3>
        <p className="text-gray-500">
          You don't have any flashcard decks yet. Create a new deck or generate flashcards from your notes.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Flashcard Decks</h3>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} onStudy={() => onStudyDeck(deck)} />
        ))}
      </div>
    </div>
  );
}
