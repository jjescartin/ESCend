import { Profile } from "@/Interface/Dashboard";
import api from "../lib/axios";

export const logoutUser = async () => {
    try {
        const res = await api.post("/logout");
        return res.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Something went wrong." };
    }
}