import { studyResources } from "../../lib/data";

export default function StudyResources() {
  return (
    <div className="mt-8">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Study Resources for You</h3>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {studyResources.map((resource) => (
          <div key={resource.id} className={`${resource.bgGradient} rounded-lg shadow overflow-hidden`}>
            <img src={resource.image} alt={resource.title} className="h-32 w-full object-cover" />
            <div className="px-4 py-4 sm:px-6 text-white">
              <h4 className="text-lg font-semibold">{resource.title}</h4>
              <p className="mt-1 text-sm">{resource.description}</p>
              <button className={`mt-3 bg-white ${resource.buttonColor} px-3 py-1 rounded text-sm font-medium`}>
                {resource.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
