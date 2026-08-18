import API from "../api/axios";

export const uploadResume = (formData) => {
    return API.post(
        "/resumes",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};


export const getResumes = () => {
    return API.get("/resumes");
};