import { useDashboard } from "@/Context/DashboardContext";
import React from "react";
import { MOCK_BOARD_CONTENTS } from "@/mock";

export default function BoardComponent() {
    const context = useDashboard();
    if (!context) return null;

    const {selectedBoard} = context;
    
    const boardData = MOCK_BOARD_CONTENTS.find(b => b.id === selectedBoard?.id) ?? null;

    return (
        <div className="board-component flex-1 h-screen overflow-auto p-5">
            <div className="board-list">
               
                {selectedBoard
                    ? 
                        <div>
                            {boardData?.name}
                             <pre>{JSON.stringify(boardData, null, 2)}</pre>
                        </div>
                    : <div> "No boards yet" + [+ Create Project] button</div>
                }
            </div>
        </div>
    );
}