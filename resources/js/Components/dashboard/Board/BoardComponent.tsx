import { useDashboard } from "@/Context/DashboardContext";
import React, { useEffect, useState } from "react";
import { MOCK_BOARD_CONTENTS, MOCK_CARDS, MOCK_COLUMNS } from "@/mock";
import BoardHeader from "./Header/BoardHeader";
import BoardKanban from "./Kanban/BoardKanban";
import { BoardContent, Column } from "@/Interface/Dashboard";
import { getBoardData } from "@/APIs/Board/GetBoardData";
import { getBoardCols } from "@/APIs/Board/GetBoardCols";

export default function BoardComponent() {
    const [boardData, setBoardData] = useState<BoardContent | null>({
        id: 0,
        name: "",
        end_date: "",
        completed: false
    });

    const [BoardColumns, setBoardColumns] = useState<Column[]>([]);

    const context = useDashboard();
    if (!context) return null;

    const {selectedBoard} = context;
    
    // const boardData = MOCK_BOARD_CONTENTS.find(b => b.id === selectedBoard?.id) ?? null;
    // const BoardColumns = MOCK_COLUMNS
    //     .filter(col =>boardData?.id)
    //     .map(col =>({
    //         ...col,
    //         cards: MOCK_CARDS.filter(card => card.column_id === col.id)
    //     }));
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

    return (
        <div className="board-component flex-1 h-screen overflow-auto p-5">
            <div className="board-list h-full flex flex-col">
                {selectedBoard && boardData
                    ? 
                        <div className="flex flex-col flex-1">
                            <BoardHeader name = {boardData.name} end_date={boardData.end_date}/>
                            <BoardKanban columns = {BoardColumns}/>
                        </div>
                    : <div> "No boards yet" + [+ Create Project] button</div>
                }
            </div>
        </div>
    );
}