import API from "../api/axios";

export const getJobs = () =>
    API.get("/jobs");

export const getSingleJob = (id) => {
    return API.get(`/jobs/${id}`);
};

export const createJob = (data) =>
    API.post("/jobs", data);

export const updateJob = (id, data) =>
    API.put(`/jobs/${id}`, data);

export const deleteJob = (id) =>
    API.delete(`/jobs/${id}`);

export const restoreJob = (data) =>
    API.post("/jobs/restore", data);