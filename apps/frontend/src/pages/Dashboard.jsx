import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

import { getConversations } from "../services/conversationService";

export default function Dashboard() {

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
  try {
    const data = await getConversations();

    setConversations(data);

    setSelectedConversation((current) => {
      if (!current) return null;

      const updated = data.find(
        (c) => c.id === current.id
      );

      return updated || null;
    });

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="flex h-screen">

      <Sidebar
        conversations={conversations}
        loadConversations={loadConversations}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />

      <ChatWindow
        selectedConversation={selectedConversation}
        loadConversations={loadConversations}
      />

    </div>
  );
}