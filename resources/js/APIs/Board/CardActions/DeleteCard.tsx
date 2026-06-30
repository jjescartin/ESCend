import { CardPayload } from "@/Interface/Dashboard";
import api from "../../lib/axios";

export const deleteCard = async (cardId: number) => {
    try {
        const res = await api.delete('api/card/' + cardId);
        return res.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Something went wrong" }
    }
}