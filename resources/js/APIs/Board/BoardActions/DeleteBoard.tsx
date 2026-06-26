import api from "../../lib/axios";

export const deleteBoard = async (id:number) => {
    try {
        const res = await api.delete('api/boards/'+id);
        return res.data;
    } catch (error:any) {
        throw error.response?.data || {message: "Something went wrong"};
    }
}