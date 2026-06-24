import api from "../lib/axios";

type args = {
    id: number,
    newColId: number,
    oldColId: number
}

export const updateCardColumn = async ({id, newColId, oldColId}: args) => {
    try {
        const res = await api.patch('api/card/'+id+'/move', {
            newColId,
            oldColId
        });
        return res.data

    } catch (error: any) {
         throw error.response?.data || {message: "Something went wrong"};
    }
} 