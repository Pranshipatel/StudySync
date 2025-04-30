import { topContributors } from "../../lib/data";

export default function TopContributors() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Top Contributors</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <ul className="space-y-4">
          {topContributors.map((contributor) => (
            <li key={contributor.id} className="flex items-center">
              <img className="h-10 w-10 rounded-full" src={contributor.avatar} alt={contributor.name} />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{contributor.name}</p>
                <p className="text-xs text-gray-500">{contributor.expertise} • {contributor.xp} XP</p>
              </div>
              <span className={`ml-auto ${contributor.badge.bgColor} ${contributor.badge.textColor} text-xs py-1 px-2 rounded-full`}>
                {contributor.badge.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
