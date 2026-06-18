import { LoginFormDetails } from "../../Interface/Auth";
import api from "../lib/axios";

export const loginUser = async (payload: LoginFormDetails) => {
    try {
        const res = await api.post("/login", payload); 
        return res.data; 
    } catch (error: any) {
        throw error.response?.data || { message: "Something went wrong." };
    }
};
