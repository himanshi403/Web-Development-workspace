import API from "../api/axios";

export const getJobs = (params) =>
    API.get("/jobs", { params });

export const createJob = (data) =>
    API.post("/jobs", data);

export const updateJob = (id, data) =>
    API.put(`/jobs/${id}`, data);

export const deleteJob = (id) =>
    API.delete(`/jobs/${id}`);

export const getStats = () =>
    API.get("/jobs/stats");