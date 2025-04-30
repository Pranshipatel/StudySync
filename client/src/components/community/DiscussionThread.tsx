import { ThreadPost } from "../../types";

interface DiscussionThreadProps {
  thread: ThreadPost;
}

export default function DiscussionThread({ thread }: DiscussionThreadProps) {
  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={thread.author.avatar} alt={thread.author.name} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            <a href="#" className="hover:underline">{thread.author.name}</a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="hover:underline">{thread.category} • {thread.subcategory}</a>
          </p>
          <div className="mt-2">
            <a href="#" className="text-base font-medium text-gray-900 hover:text-primary-600">{thread.title}</a>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{thread.content}</p>
          </div>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-xs text-gray-500">Posted {thread.postedAt}</span>
            <span className="text-xs text-gray-500">{thread.replyCount} replies</span>
            {thread.isHot && (
              <span className="inline-flex items-center text-xs text-gray-500">
                <i className="fas fa-fire text-orange-400 mr-1"></i> Hot topic
              </span>
            )}
            {thread.isGroupForming && (
              <span className="inline-flex items-center text-xs text-gray-500">
                <i className="fas fa-users text-primary-400 mr-1"></i> Group forming
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
