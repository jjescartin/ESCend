import api from "@/APIs/lib/axios";
import { ColumnPayload } from "@/Interface/Dashboard";

export const deleteColumn = async (boardId: number, columnId: number) => {
    try {
        const res = await api.delete('api/boards/'+boardId+'/columns/'+ columnId,)
        return res.data;
    } catch (error:any) {
        throw error.response?.data || {message: "Something went wrong"}
    }
}