import React from "react";
import { useDashboard } from "../../../Context/DashboardContext";
import { MoreHorizontal } from 'lucide-react';
import { Board } from "@/Interface/Dashboard";

export default function BoardPanel () {
    const context = useDashboard();
    if (!context) return null;

    const {boardLists, setSelectedBoard} = context;
    
    const handleBoardClick = (board: Board) =>{
        setSelectedBoard(board);
    }
    
    return (
        <div className="board-map-wrapper px-2 py-3">
            <div className="pb-3 pl-3">
                <span className="text-2xl font-extralight">BOARDS</span>
            </div>
            <div>
                {boardLists?.map(board=>(
                    <div 
                        key={board.id}
                        onClick={()=>handleBoardClick(board)}
                        className="flex items-center gap-1 p-2 px-3 rounded-lg cursor-pointer
                        hover:bg-green-200 transition-colors group">
                        
                        <div className="w-8 h-8 rounded-md bg-green-700 text-white
                            flex items-center justify-center text-sm font-bold shrink-0
                            group-hover:bg-green-800 transitioon-colors">
                            {board.boardName.charAt(0).toUpperCase()}
                        </div>
                        
                        <span className="flex-1 pr-2 text-sm">{board.boardName}</span>

                        <MoreHorizontal 
                            size={16}
                            className="text-grey-500"/>
                    </div>
                ))}
            </div>
        </div>
    );
}