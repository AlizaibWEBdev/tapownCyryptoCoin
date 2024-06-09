import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});



export const updateUserCoins = (userId, coins) => new Promise((resolve,reject)=>{
  resolve(localStorage.setItem("coins",coins) || 0)
})
export const getUserCoins = (userId) => new Promise((resolve,reject)=>{
  resolve({data:{coins:parseInt(localStorage.getItem("coins") || 0)}})
})

// Check if mission is completed
export const isMissionCompleted = (userId, missionId) => new Promise((resolve,reject)=>{
  resolve(localStorage.getItem(missionId) || "0")
})

// Mark mission as completed
export const markMissionCompleted = (userId, missionId) => new Promise((resolve,reject)=>{
  resolve(localStorage.setItem(missionId,"1"))
})

export const markRewardClaimed = (userId, missionId) => new Promise((resolve,reject)=>{
  resolve(localStorage.setItem(missionId + "_reward","claimed"))
})
export const  isRewardClaimed = (userId, missionId) => new Promise((resolve,reject)=>{
  resolve(localStorage.getItem(missionId + "_reward") || "0")
})

// Check if user joined a group (dummy function)
export const checkUserJoinedGroup = (userId) => api.get(`/users/${userId}/joinedGroup`);
export const getTop= () => api.get(`/top-players`);
export const getuserID = () => localStorage.getItem("user_id")

export default {
  updateUserCoins,
  getUserCoins,
  isMissionCompleted,
  markMissionCompleted,
  markRewardClaimed,
  checkUserJoinedGroup,
  getuserID,
  getTop,
  isRewardClaimed,
};
