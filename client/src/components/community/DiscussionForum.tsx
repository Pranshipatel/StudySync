import { ThreadPost } from "../../types";
import DiscussionThread from "./DiscussionThread";

interface DiscussionForumProps {
  threads: ThreadPost[];
}

export default function DiscussionForum({ threads }: DiscussionForumProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Discussions</h3>
      </div>
      
      {threads.map((thread) => (
        <DiscussionThread key={thread.id} thread={thread} />
      ))}

      <div className="px-4 py-4 sm:px-6 flex justify-center">
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          View more discussions <i className="fas fa-chevron-right ml-1"></i>
        </button>
      </div>
    </div>
  );
}
