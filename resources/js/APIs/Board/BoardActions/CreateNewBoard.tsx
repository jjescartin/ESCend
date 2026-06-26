import { BoardPayload } from "@/Interface/Dashboard";
import api from "../../lib/axios";

export const createNewBoard = async (payload: BoardPayload) =>{
    try {
        const res = await api.post('api/boards/', payload);
        return res.data;
    } catch (error:any) {
        throw error.response?.data || {message: "Something went wrong"};
    }
}