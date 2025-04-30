import { View } from "../../types";
import { User } from "../../types";

interface MobileMenuProps {
  activeView: View;
  onViewChange: (view: View) => void;
  user: User | null;
  onClose: () => void;
  onLogout?: () => void;
}

export default function MobileMenu({ activeView, onViewChange, user, onClose, onLogout }: MobileMenuProps) {
  const navItems: { id: View; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "notes", label: "Smart Notes" },
    { id: "flashcards", label: "Flashcards" },
    { id: "community", label: "Community" }
  ];

  const handleNavClick = (view: View) => {
    onViewChange(view);
    onClose();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      onClose();
    }
  };

  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${
              activeView === item.id
                ? "bg-primary-50 border-primary-500 text-primary-700"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {user && (
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
            </div>
            <div className="ml-3 flex-grow">
              <div className="text-base font-medium text-gray-800">{user.name}</div>
              <div className="text-sm font-medium text-gray-500">{user.email}</div>
            </div>
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <i className="fas fa-bolt mr-1"></i> {user.xp} XP
              </span>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <button
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={() => {/* Profile settings functionality can be added here */}}
            >
              <i className="fas fa-user-cog mr-2"></i> Profile Settings
            </button>
            <button
              className="block px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 w-full text-left"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
