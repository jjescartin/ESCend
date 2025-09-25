import { LoginFormDetails } from "../Interface/Auth";
import api from "axios";

export const loginUser = async (payload: LoginFormDetails) => {
    try {
        const res = await api.post("/login", payload, {
            withCredentials: true,
        }); 
        return res.data; 
    } catch (error: any) {
        throw error.response?.data || { message: "Something went wrong." };
    }
};
