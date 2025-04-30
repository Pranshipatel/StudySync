import { studySessions } from "../../lib/data";

export default function StudySessions() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Study Sessions</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <ul className="space-y-4">
          {studySessions.map((session) => (
            <li key={session.id} className={`border-l-4 ${session.borderColor} pl-3 py-2`}>
              <p className="text-sm font-medium text-gray-900">{session.title}</p>
              <p className="text-xs text-gray-500">{session.time} • {session.participants} participants</p>
              <button className={`mt-2 text-xs ${session.actionColor} font-medium`}>
                Join session
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <button className="w-full flex justify-center items-center px-4 py-2 border border-primary-300 shadow-sm text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50">
            <i className="fas fa-plus mr-2"></i> Create Study Session
          </button>
        </div>
      </div>
    </div>
  );
}
