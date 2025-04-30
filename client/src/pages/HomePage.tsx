import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Dashboard from "../components/dashboard/Dashboard";
import SmartNotes from "../components/notes/SmartNotes";
import Flashcards from "../components/flashcards/Flashcards";
import Community from "../components/community/Community";
import Navbar from "../components/layout/Navbar";
import UploadModal from "../components/shared/UploadModal";

export default function HomePage() {
  const { activeView, initializeLocalStorage } = useAppContext();

  useEffect(() => {
    // Initialize local storage data if needed
    initializeLocalStorage();
  }, [initializeLocalStorage]);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "notes":
        return <SmartNotes />;
      case "flashcards":
        return <Flashcards />;
      case "community":
        return <Community />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {renderView()}
      </main>
      <UploadModal />
    </div>
  );
}
