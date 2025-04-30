import { studyPlans } from "../../lib/data";

export default function StudyProgress() {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Today's Study Plan</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>AI-recommended focus areas based on your performance</p>
        </div>
        
        <div className="mt-5 space-y-4">
          {studyPlans.map((plan) => (
            <div key={plan.id} className="flex items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {plan.subject} - {plan.topic}
                </p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`${plan.progressColor} h-2.5 rounded-full`} 
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500">{plan.progress}%</span>
                </div>
              </div>
              <a href="#" className="ml-4 flex-shrink-0 bg-primary-50 text-primary-600 hover:text-primary-700 py-1 px-3 rounded-md text-sm font-medium">
                Review
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
