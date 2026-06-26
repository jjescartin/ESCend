import { useDashboard } from "@/Context/DashboardContext";
import React, { useEffect, useState } from "react";
import BoardHeader from "./Header/BoardHeader";
import BoardKanban from "./Kanban/BoardKanban";
import { BoardContent, Column } from "@/Interface/Dashboard";
import { getBoardData } from "@/APIs/Board/GetBoardData";
import { getBoardCols } from "@/APIs/Board/GetBoardCols";

export default function BoardComponent() {
    const [boardData, setBoardData] = useState<BoardContent | null>({
        id: 0,
        name: "",
        description: "",
        end_date: "",
        completed: false
    });

    const [BoardColumns, setBoardColumns] = useState<Column[]>([]);

    const context = useDashboard();
    if (!context) return null;

    const {selectedBoard, openBoardModal} = context;
    
    useEffect(()=>{
        if (!selectedBoard) return;

        handleGetBoardData(selectedBoard.id);
        handleGetBoardCols(selectedBoard.id);
    },[selectedBoard]);

    const handleGetBoardData = async (id:number) => {
        try {
            const res = await getBoardData(id);
            if (res.success) {
                setBoardData(res.data)
            }
        } catch(error) {
            console.log('Failed to load board data', error);
        }
    }


    const handleGetBoardCols = async (id:number) => {
        try {
            const res = await getBoardCols(id);
            if (res.success) {
                setBoardColumns(res.data)
            }
        } catch(error) {
            console.log('Failed to load board data', error);
        }
    }
    console.log(boardData?.name);
    return (
        <div className="board-component flex-1 h-screen overflow-auto p-5">
            <div className="board-list h-full flex flex-col">
                {selectedBoard && boardData
                    ? 
                        <div className="flex flex-col flex-1">
                            <BoardHeader name = {boardData.name} end_date={boardData.end_date}/>
                            <BoardKanban columns = {BoardColumns}/>
                        </div>
                    : 
                    <div className="flex items-start justify-left h-full gap-1">
                        <span className="text-gray-400 text-sm">No boards selected yet</span>
                        <button
                            onClick={() => openBoardModal('create')}
                            className="text-sm text-green-700 hover:underline transition-colors">
                            [+ Create Project]
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}