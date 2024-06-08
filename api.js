import axios from 'axios';

const API_URL = 'https://congenial-telegram-5wv45xjw95jc7jg4-3000.app.github.dev';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fetch user by ID
export const getUser = (userId) => api.get(`/users/${userId}`);

// Update user coins
export const updateUserCoins = (userId, coins) => api.patch(`/users/${userId}/coins`, { coins });
export const getUserCoins = (userId) => api.get(`users/getCoins/${userId}`);

// Check if mission is completed
export const isMissionCompleted = (userId, missionId) => api.get(`/users/${userId}/missions/${missionId}/completed`);

// Mark mission as completed
export const markMissionCompleted = (userId, missionId) => api.patch(`/users/${userId}/missions/${missionId}/completed`);

// Mark reward as claimed
export const markRewardClaimed = (userId, missionId) => api.patch(`/users/${userId}/missions/${missionId}/reward`);

// Check if user joined a group (dummy function)
export const checkUserJoinedGroup = (userId) => api.get(`/users/${userId}/joinedGroup`);
export const getTop= () => api.get(`/top-players`);
export const getuserID = () => localStorage.getItem("user_id")

export default {
  getUser,
  updateUserCoins,
  getUserCoins,
  isMissionCompleted,
  markMissionCompleted,
  markRewardClaimed,
  checkUserJoinedGroup,
  getuserID,
  getTop
};
