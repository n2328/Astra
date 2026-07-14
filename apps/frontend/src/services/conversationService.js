import api from "../api/api";

export const getConversations = async () => {
  const response = await api.get("/conversations");
  return response.data;
};

export const createConversation = async (title = "New Chat") => {
  const response = await api.post("/conversations", {
    title,
  });

  return response.data;
};

export const getMessages = async (conversationId) => {
  const response = await api.get(
    `/conversations/${conversationId}/messages`
  );

  return response.data;
};

export const deleteConversation = async (id) => {
  const response = await api.delete(`/conversations/${id}`);
  return response.data;
};