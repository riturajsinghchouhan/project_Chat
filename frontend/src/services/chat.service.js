import API from "./api";

export const searchUsers = async (query) => {
  const res = await API.get(`/user/search?q=${query}`);
  return res.data;
};

export const getChatMessages = async (otherUserId) => {
  const res = await API.get(`/chat/${otherUserId}`);
  return res.data;
};

export const getRecentChats = async () => {
  const res = await API.get("/chat/recent/list");
  return res.data;
};
