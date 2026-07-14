import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}