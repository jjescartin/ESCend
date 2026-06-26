import { ColumnPayload } from "@/Interface/Dashboard";
import api from "../../lib/axios";

export const createColumn = async (id: number, payload: ColumnPayload) => {
    
    try {
        const res = await api.post('api/boards/'+ id +'/columns/', payload);
        return res.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Something went wrong" };
    }
}