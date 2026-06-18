import api from "../lib/axios";

export const getProfile = async () => {
    try {
        const res = await api.get("/api/profile");
        return res.data;
    } catch (error: any) {
        throw error.response?.data || {message: "Something went wrong"};
    }
}