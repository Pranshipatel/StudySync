import DiscussionForum from "./DiscussionForum";
import TopContributors from "./TopContributors";
import StudySessions from "./StudySessions";
import { communityThreads } from "../../lib/data";

export default function Community() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Peer Learning Community
            </h2>
            <p className="mt-1 text-gray-500">
              Connect with other students, ask questions, and collaborate
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <i className="fas fa-users mr-2"></i>
              Find Study Groups
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <i className="fas fa-plus mr-2"></i>
              Ask Question
            </button>
          </div>
        </div>

        {/* Community Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Discussion Forum */}
          <div className="lg:col-span-2">
            <DiscussionForum threads={communityThreads} />
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            <TopContributors />
            <StudySessions />
          </div>
        </div>
      </div>
    </section>
  );
}
