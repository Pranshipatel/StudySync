import { useAppContext } from "../../context/AppContext";
import FlashcardView from "./FlashcardView";

interface FlashcardStudyProps {
  onClose: () => void;
}

export default function FlashcardStudy({ onClose }: FlashcardStudyProps) {
  const { 
    selectedDeck, 
    currentFlashcardIndex, 
    setCurrentFlashcardIndex,
    isCardFlipped,
    setIsCardFlipped
  } = useAppContext();

  if (!selectedDeck || !selectedDeck.cards || selectedDeck.cards.length === 0) {
    return (
      <div className="mt-10 text-center">
        <p>This deck has no flashcards yet.</p>
        <button
          onClick={onClose}
          className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentCard = selectedDeck.cards[currentFlashcardIndex];
  const totalCards = selectedDeck.cards.length;

  const goToPreviousCard = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      setIsCardFlipped(false);
    }
  };

  const goToNextCard = () => {
    if (currentFlashcardIndex < selectedDeck.cards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setIsCardFlipped(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold leading-7 text-gray-900">
            Studying: {selectedDeck.title}
          </h3>
          <p className="mt-1 text-gray-500">
            Card {currentFlashcardIndex + 1} of {totalCards}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Confidence Level:</span>
          <div className="flex space-x-2">
            <button className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200">
              <i className="fas fa-frown"></i>
            </button>
            <button className="h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center hover:bg-yellow-200">
              <i className="fas fa-meh"></i>
            </button>
            <button className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200">
              <i className="fas fa-smile"></i>
            </button>
          </div>
          <button 
            className="ml-4 bg-gray-200 p-2 rounded-lg text-gray-600 hover:bg-gray-300"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* Flashcard Component */}
      <FlashcardView 
        question={currentCard.question} 
        answer={currentCard.answer}
        isFlipped={isCardFlipped}
        onFlip={() => setIsCardFlipped(!isCardFlipped)}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${currentFlashcardIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={goToPreviousCard}
          disabled={currentFlashcardIndex === 0}
        >
          <i className="fas fa-arrow-left mr-2"></i> Previous
        </button>
        <button 
          className={`px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors ${currentFlashcardIndex === totalCards - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={goToNextCard}
          disabled={currentFlashcardIndex === totalCards - 1}
        >
          Next <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
}
