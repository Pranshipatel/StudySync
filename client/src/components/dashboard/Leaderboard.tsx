import { leaderboardUsers } from "../../lib/data";

export default function Leaderboard() {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Leaderboard</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Top performers in your study network</p>
        </div>

        <div className="mt-5 space-y-3">
          {leaderboardUsers.map((user) => (
            <div 
              key={user.id} 
              className={`flex items-center ${user.isCurrentUser ? 'bg-blue-50 p-2 rounded-md' : ''}`}
            >
              <div className="flex-shrink-0 text-xl font-bold text-primary-600">{user.rank}</div>
              <img className="h-8 w-8 rounded-full ml-3" src={user.avatar} alt={user.name} />
              <div className="min-w-0 flex-1 px-4">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>
              <div className="text-sm text-green-600 font-medium">
                <i className="fas fa-bolt mr-1"></i> {user.xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
