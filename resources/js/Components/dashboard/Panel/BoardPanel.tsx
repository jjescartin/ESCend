import React, { MouseEvent, useState } from "react";
import { useDashboard } from "../../../Context/DashboardContext";
import { MoreHorizontal } from 'lucide-react';
import { Board } from "@/Interface/Dashboard";
import { faBriefcaseClock } from "@fortawesome/free-solid-svg-icons";

export default function BoardPanel() {
    const context = useDashboard();
    if (!context) return null;

    const { boardLists, setSelectedBoard, handleEditBoard, handleDeleteBoard, openBoardModal } = context;

    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const handleBoardClick = (board: Board) => {
        setSelectedBoard(board);
    }


    const BOARD_ACTIONS = [
        { id: 1, label: "Edit Board", key: "edit_board" },
        { id: 2, label: "Copy Board Link", key: "copy_board" },
        { id: 3, label: "Remove Board", key: "delete_board" },
    ];

    const handleMenuToggle = (e: MouseEvent, boardId: number) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === boardId ? null : boardId);

    }

    const handleActionClick = (e: MouseEvent, key: string, board: Board) => {
        e.stopPropagation();
        setOpenMenuId(null);

        switch (key) {
            case 'edit_board':
                // handleEditBoard(board.id, { name: board.boardName, description: board.description, end_date: board. })
                openBoardModal('edit', board)
                break;
            case 'copy_board':
                navigator.clipboard.writeText(window.location.origin + '/boards/' + board.id);
                break;
            case 'delete_board':
                handleDeleteBoard(board.id);
                break;
        }
    }

    return (
        <div className="board-map-wrapper px-2 py-3">
            <div className="pb-3 pl-3">
                <span className="text-2xl font-extralight">BOARDS</span>
            </div>
            <div>
                {boardLists?.map(board => (
                    <div key={board.id} className="relative">
                        <div
                            onClick={() => handleBoardClick(board)}
                            className="flex items-center gap-1 p-2 px-3 rounded-lg cursor-pointer
            hover:bg-green-200 transition-colors group">

                            <div className="w-8 h-8 rounded-md bg-green-700 text-white
                flex items-center justify-center text-sm font-bold shrink-0
                group-hover:bg-green-800 transition-colors">
                                {board.boardName.charAt(0).toUpperCase()}
                            </div>

                            <span className="flex-1 pr-2 text-sm">{board.boardName}</span>

                            <MoreHorizontal
                                size={16}
                                onClick={(e) => handleMenuToggle(e, board.id)}
                                className="text-gray-500 cursor-pointer" />
                        </div>

                        {openMenuId === board.id && (
                            <div className="absolute left-full top-0 z-50 bg-white border border-gray-200 rounded-lg shadow-md py-1 w-44">
                                {BOARD_ACTIONS.map(action => (
                                    <button
                                        key={action.id}
                                        onClick={(e) => handleActionClick(e, action.key, board)}
                                        className={"w-full text-left px-4 py-2 text-sm hover:bg-gray-100 " + (action.key === 'delete_board' ? 'text-red-500' : 'text-gray-700')}>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}