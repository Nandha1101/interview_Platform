import axiosInstance from "../lib/axios";

export const problemApi = {
  getProblems: async () => {
    const response = await axiosInstance.get("/api/problems");
    return response.data.problems;
  },
  getProblemById: async (id) => {
    const response = await axiosInstance.get(`/api/problems/${id}`);
    return response.data.problem;
  },
  getProblemByTitle: async (title) => {
    const response = await axiosInstance.get(`/api/problems/by-title/${encodeURIComponent(title)}`);
    return response.data.problem;
  }
};
