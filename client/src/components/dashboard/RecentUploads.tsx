import { useAppContext } from "../../context/AppContext";

export default function RecentUploads() {
  const { documents, setActiveView } = useAppContext();

  const handleViewNotes = () => {
    setActiveView("notes");
  };

  const handleViewFlashcards = () => {
    setActiveView("flashcards");
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Uploads</h3>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {documents.slice(0, 3).map((document) => (
          <div key={document.id} className="bg-white overflow-hidden shadow rounded-lg transition duration-300 hover:shadow-md">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <i className={`fas fa-${document.icon} text-xl text-primary-600`}></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{document.title}</dt>
                    <dd>
                      <div className="text-xs text-gray-900">Uploaded {document.uploadedAt} • {document.pages} pages</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {document.status}
                </span>
                <div>
                  <button 
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    onClick={handleViewNotes}
                  >
                    View Notes
                  </button>
                  <button 
                    className="ml-3 text-primary-600 hover:text-primary-800 text-sm font-medium"
                    onClick={handleViewFlashcards}
                  >
                    Flashcards
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
