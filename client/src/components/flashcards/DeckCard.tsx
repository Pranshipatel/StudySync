import { FlashcardDeck } from "../../types";

interface DeckCardProps {
  deck: FlashcardDeck;
  onStudy: () => void;
}

export default function DeckCard({ deck, onStudy }: DeckCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition duration-300 hover:shadow-md cursor-pointer">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${deck.iconBg} rounded-md p-3`}>
            <i className={`fas fa-${deck.icon} text-xl ${deck.iconColor}`}></i>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-lg font-medium text-gray-900 truncate">{deck.title}</dt>
              <dd className="flex items-center text-sm text-gray-500 mt-1">
                <span>{deck.cardCount} cards</span>
                <span className="mx-2">•</span>
                <span>Last studied {deck.lastStudied}</span>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${deck.statusColor}`}>
              {deck.masteryPercentage}% Mastered
            </span>
          </div>
          <div className="flex">
            <button 
              className="text-primary-600 hover:text-primary-800 text-sm font-medium mr-4"
              onClick={onStudy}
            >
              <i className="fas fa-play mr-1"></i> Study
            </button>
            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
