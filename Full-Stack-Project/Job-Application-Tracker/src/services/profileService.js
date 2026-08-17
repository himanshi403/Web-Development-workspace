import API from "../api/axios";

export const getProfile=()=>{
    return API.get("/auth/me");

};

export const updateProfile=(data)=>{
    return API.put("/auth/me", data);
};