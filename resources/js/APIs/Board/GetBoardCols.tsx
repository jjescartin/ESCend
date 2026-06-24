import api from "../lib/axios";

export const getBoardCols = async (id:number) => {
    try {
        const res = await api.get('api/boards/'+id+'/cols')
        return res.data
    } catch (error:any) {
        throw error.response?.data || {message: "Something went wrong"};
    }
}