import { BoardPayload } from "@/Interface/Dashboard";
import api from "../../lib/axios";

export const updateBoard = async (id: number, payload: BoardPayload) => {
    try {
        const res = await api.put('api/boards/'+ id ,payload);
        return res.data;
    } catch (error:any) {
        throw error.response?.data || {message: "Something went wrong"};
    }
}