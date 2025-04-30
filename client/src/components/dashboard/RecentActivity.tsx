import { recentActivities } from "../../lib/data";

export default function RecentActivity() {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Your recent learning interactions</p>
        </div>

        <div className="mt-5 space-y-5">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="flex-shrink-0">
                <div className={`flex items-center justify-center h-10 w-10 rounded-md ${activity.bgColor} text-white`}>
                  <i className={`fas fa-${activity.icon}`}></i>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
