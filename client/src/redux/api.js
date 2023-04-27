import axios from "axios";

const API=axios.create({baseURL:"http://localhost:5000"});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createGear = (gearData) => API.post("/gear", gearData);
export const getGears = (page) => API.get(`/gear?page=${page}`);
export const getGear = (id) => API.get(`/gear/${id}`);
export const deleteGear = (id) => API.delete(`/gear/${id}`);
export const updateGear = (updatedGearData, id) =>
  API.patch(`/gear/${id}`, updatedGearData);
export const getGearsByUser = (userId) => API.get(`/gear/userGears/${userId}`);

export const getGearsBySearch = (searchQuery) =>
  API.get(`/gear/search?searchQuery=${searchQuery}`);

export const getTagGears = (tag) => API.get(`/gear/tag/${tag}`);
export const getRelatedGears = (tags) => API.post(`/gear/relatedGears`, tags);
export const likeGear = (id) => API.patch(`/gear/like/${id}`);
