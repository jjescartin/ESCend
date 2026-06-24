import api from "../lib/axios";

export const getCardDetails = async (id: number) => {
    try {
        const res = await api.get('api/card/' + id);
        return res.data
    } catch (error: any) {
        throw error.response?.data || {message: "Something went wrong"};
    }
}