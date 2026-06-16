import { useDashboard } from "@/Context/DashboardContext";
import React from "react";
import { MOCK_BOARD_CONTENTS, MOCK_CARDS, MOCK_COLUMNS } from "@/mock";
import BoardHeader from "./Header/BoardHeader";
import BoardKanban from "./Kanban/BoardKanban";

export default function BoardComponent() {
    const context = useDashboard();
    if (!context) return null;

    const {selectedBoard} = context;
    
    const boardData = MOCK_BOARD_CONTENTS.find(b => b.id === selectedBoard?.id) ?? null;
    const BoardColumns = MOCK_COLUMNS
        .filter(col =>boardData?.id)
        .map(col =>({
            ...col,
            cards: MOCK_CARDS.filter(card => card.column_id === col.id)
        }));

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