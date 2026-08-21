import API from "../api/axios";

// Normal email/password login
export const login = (data) =>
    API.post("/auth/login", data);


// Normal signup
export const register = (data) =>
    API.post("/auth/register", data);


// Get logged-in user profile
export const getProfile = () =>
    API.get("/auth/me");


// Google login/signup
export const googleLogin = (credential) =>
    API.post("/auth/google", {
        credential
    });