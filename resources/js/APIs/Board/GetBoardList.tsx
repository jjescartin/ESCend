import api from "../lib/axios";

export const getBoardList = async () => {
    try {
        const res = await api.get('api/boards');
        return res.data;
    } catch (error:any) {
        throw error.response?.data || {message: "Something went wrong"};
    }
}