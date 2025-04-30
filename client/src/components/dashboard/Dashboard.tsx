import { useAppContext } from "../../context/AppContext";
import StudyProgress from "./StudyProgress";
import RecentActivity from "./RecentActivity";
import Leaderboard from "./Leaderboard";
import RecentUploads from "./RecentUploads";
import StudyResources from "./StudyResources";

export default function Dashboard() {
  const { user, setIsUploadModalOpen } = useAppContext();

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Welcome back, {user.name.split(" ")[0]}!
            </h2>
            <p className="mt-1 text-gray-500">
              Your study progress is on track. Keep it up!
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <i className="fas fa-upload mr-2"></i>
              Upload Content
            </button>
          </div>
        </div>

        {/* Study Progress & Recommendations */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <StudyProgress />
          <RecentActivity />
          <Leaderboard />
        </div>

        {/* Recent Uploads & Recommended Resources */}
        <RecentUploads />
        <StudyResources />
      </div>
    </section>
  );
}
