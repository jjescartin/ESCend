import { CardPayload } from "@/Interface/Dashboard";
import api from "../../lib/axios";

export const createCard = async (columnId: number, payload: CardPayload) => {

    try {
        const res = await api.post('api/card/', { ...payload, column_id: columnId });
        return res.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Something went wrong" };
    }
}