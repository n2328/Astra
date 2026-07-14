import {
  Plus,
  MessageSquare,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
          Astra
        </h1>

        <p className="text-slate-400 mt-1">
          Your AI Workspace
        </p>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 transition">
          <Plus size={20} />
          New Chat
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-4">

        <p className="text-slate-400 text-sm mb-3">
          Conversations
        </p>

       <div className="space-y-3 mt-4">

          <button className="w-full flex items-center gap-3 rounded-xl p-4 hover:bg-slate-800 transition-all duration-200">
            <MessageSquare size={18} />
            Java Interview
          </button>

          <button className="w-full flex items-center gap-3 rounded-xl p-4 hover:bg-slate-800 transition-all duration-200">
            <MessageSquare size={18} />
            Resume Review
          </button>

          <button className="w-full flex items-center gap-3 rounded-xl p-4 hover:bg-slate-800 transition-all duration-200">
            <MessageSquare size={18} />
            Spring Boot
          </button>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-4">

 <button
  onClick={handleLogout}
  className="flex w-full items-center gap-3 rounded-xl p-3 text-white hover:bg-slate-800 hover:text-red-400 transition-all"
>
  <LogOut size={20} />
  Logout
</button>

</div>

    </div>
  );
}