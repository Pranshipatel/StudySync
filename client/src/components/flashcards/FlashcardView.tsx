interface FlashcardViewProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashcardView({ 
  question, 
  answer, 
  isFlipped, 
  onFlip 
}: FlashcardViewProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl mx-auto max-w-3xl perspective">
      <div 
        className={`relative w-full h-80 transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden rounded-xl p-8 flex flex-col justify-center bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200">
          <h4 className="text-xl font-semibold text-gray-900 text-center mb-4">{question}</h4>
          <div className="text-center mt-4">
            <button 
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              onClick={onFlip}
            >
              Show Answer
            </button>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rounded-xl p-8 rotate-y-180 bg-gradient-to-r from-secondary-50 to-secondary-100 border border-secondary-200">
          <div className="h-full flex flex-col justify-center overflow-y-auto">
            {answer.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-800 mt-2">
                {paragraph}
              </p>
            ))}
            <div className="text-center mt-auto mb-4">
              <button
                className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition-colors"
                onClick={onFlip}
              >
                Show Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
