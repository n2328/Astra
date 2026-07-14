import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
    createConversation,
    deleteConversation,
} 
from "../services/conversationService";
import {
  Plus,
  MessageSquare,
  LogOut,
} from "lucide-react";


export default function Sidebar({
   conversations,
  loadConversations,
  selectedConversation,
  setSelectedConversation,
}) {
  const navigate = useNavigate();
  const handleNewChat = async () => {
  try {
    const conversation = await createConversation("New Chat");

    await loadConversations();

    setSelectedConversation(conversation);

  } catch (error) {
    console.error("Failed to create conversation", error);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-72 h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Astra
        </h1>

        <p className="text-slate-400 mt-1">
          Your AI Workspace
        </p>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 transition"
        >
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

          {conversations.length === 0 ? (
            <p className="text-slate-500 text-sm">
              No conversations yet
            </p>
          ) : (
            conversations.map((conversation) => (
              <div
    key={conversation.id}
    className={`flex items-center justify-between rounded-xl p-3 transition ${
        selectedConversation?.id === conversation.id
            ? "bg-slate-800"
            : "hover:bg-slate-800"
    }`}
>

    <button
        className="flex items-center gap-3 flex-1 text-left"
        onClick={() => setSelectedConversation(conversation)}
    >
        <MessageSquare size={18} />

        <span className="truncate">
            {conversation.title}
        </span>

    </button>

    <Trash2
  size={18}
  className="cursor-pointer text-slate-400 hover:text-red-500"
  onClick={async (e) => {
    e.stopPropagation();

    try {
      await deleteConversation(conversation.id);

      if (selectedConversation?.id === conversation.id) {
        setSelectedConversation(null);
      }

      await loadConversations();

    } catch (err) {
      console.error(err);
    }
  }}
/>

</div>
            ))
          )}

        </div>

      </div>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4 mt-auto">

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