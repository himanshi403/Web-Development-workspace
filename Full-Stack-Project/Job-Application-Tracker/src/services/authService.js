import API from "../api/axios";

export const login = (data) =>
    API.post("/auth/login", data);

export const register = (data) =>
    API.post("/auth/register", data);

export const getProfile = () =>
    API.get("/auth/me");