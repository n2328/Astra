import { useEffect, useState } from "react";
import { getMessages } from "../services/conversationService";
import { sendMessage } from "../services/chatService";

export default function ChatWindow({ 
     selectedConversation, 
       loadConversations, }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    loadMessages();
  }, [selectedConversation]);

  const loadMessages = async () => {
    try {
      const data = await getMessages(selectedConversation.id);
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    if (!selectedConversation) return;

    if (!input.trim()) return;

    try {
      setLoading(true);

      await sendMessage(
        selectedConversation.id,
        input
      );

      await loadConversations();
      setInput("");

      await loadMessages();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-[#020617]">

      {/* Header */}
      <div className="h-16 border-b border-slate-800 flex items-center px-8">

        <h2 className="text-white text-xl font-semibold">
          {selectedConversation
            ? selectedConversation.title
            : "Welcome to Astra"}
        </h2>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8">

        {!selectedConversation ? (

          <div className="h-full flex items-center justify-center">

            <div className="text-center">

              <h1 className="text-6xl font-bold text-white">
                Welcome to Astra
              </h1>

              <p className="mt-6 text-xl text-slate-400">
                Build. Learn. Create.
              </p>

              <p className="mt-2 text-slate-500">
                Your personal AI assistant.
              </p>

            </div>

          </div>

        ) : messages.length === 0 ? (

          <div className="h-full flex items-center justify-center">

            <p className="text-slate-500 text-lg">
              No messages yet.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {messages.map((message) => (

              <div
                key={message.id}
                className={`max-w-3xl rounded-xl p-4 ${
                  message.role === "user"
                    ? "bg-indigo-600 ml-auto text-white"
                    : "bg-slate-800 text-white"
                }`}
              >
                {message.content}
              </div>

            ))}

          </div>

        )}

      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-6">

        <div className="max-w-5xl mx-auto">

          <div className="flex items-center bg-slate-800 rounded-xl overflow-hidden">

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Message Astra..."
              className="flex-1 bg-transparent p-4 text-white outline-none"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="
                bg-indigo-600
                hover:bg-indigo-700
                px-8
                py-4
                font-semibold
                text-white
                rounded-r-xl
                transition
                disabled:opacity-50
              "
            >
              {loading ? "..." : "Send"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}