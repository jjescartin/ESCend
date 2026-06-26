import api from "@/APIs/lib/axios";
import { ColumnPayload } from "@/Interface/Dashboard";

export const updateColumn = async (boardId: number, columnId: number, payload: ColumnPayload) => {
    try {
        const res = await api.put('api/boards/'+boardId+'/columns/'+ columnId, payload)
        return res.data;
    } catch (error:any) {
        throw error.response?.data || {message: "Something went wrong"}
    }
}