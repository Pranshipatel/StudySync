import { useState } from "react";
import FlashcardDecks from "./FlashcardDecks";
import FlashcardStudy from "./FlashcardStudy";
import { useAppContext } from "../../context/AppContext";
import { FlashcardDeck } from "../../types";

export default function Flashcards() {
  const { 
    decks, 
    isFlashcardStudyOpen, 
    setIsFlashcardStudyOpen, 
    selectedDeck,
    setSelectedDeck,
    setCurrentFlashcardIndex,
    setIsCardFlipped
  } = useAppContext();

  const startStudySession = (deck: FlashcardDeck) => {
    setSelectedDeck(deck);
    setCurrentFlashcardIndex(0);
    setIsCardFlipped(false);
    setIsFlashcardStudyOpen(true);
  };

  const closeStudySession = () => {
    setIsFlashcardStudyOpen(false);
    setSelectedDeck(null);
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Flashcards
            </h2>
            <p className="mt-1 text-gray-500">
              Review key concepts with AI-generated flashcards
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <i className="fas fa-plus mr-2"></i>
              New Deck
            </button>
          </div>
        </div>

        {/* Flashcard Decks or Study Area based on state */}
        {isFlashcardStudyOpen && selectedDeck ? (
          <FlashcardStudy onClose={closeStudySession} />
        ) : (
          <FlashcardDecks decks={decks} onStudyDeck={startStudySession} />
        )}
      </div>
    </section>
  );
}
