import { CardPayload } from "@/Interface/Dashboard";
import api from "../../lib/axios";

export const updateCard = async (cardId: number, payload: Partial<CardPayload>) => {
    try {
        const res = await api.patch('api/card/' + cardId, payload);
        return res.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Something went wrong" }
    }
}