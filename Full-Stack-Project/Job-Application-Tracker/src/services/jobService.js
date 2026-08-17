import API from "../api/axios";

export const getJobs = (params = {}) =>
    API.get("/jobs", {
        params
    });

export const getSingleJob = (id) => {
    return API.get(`/jobs/${id}`);
};

export const createJob = (data) =>
    API.post("/jobs", data);

export const updateJob = (id, data) =>
    API.put(`/jobs/${id}`, data);

export const deleteJob = (id) =>
    API.delete(`/jobs/${id}`);

export const deleteAllJobs = () =>
    API.delete("/jobs/all");

export const restoreJob = (data) =>
    API.post("/jobs/restore", data);

export const getJobStats = () => {
    return API.get("/jobs/stats");
};