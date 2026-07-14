import api from "../api/api";

export const sendMessage = async (conversationId, message) => {
  const response = await api.post("/chat", {
    conversation_id: conversationId,
    message,
  });

  return response.data;
};