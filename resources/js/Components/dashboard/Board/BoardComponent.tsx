import { useDashboard } from "@/Context/DashboardContext";
import React, { useEffect, useState } from "react";
import BoardHeader from "./Header/BoardHeader";
import BoardKanban from "./Kanban/BoardKanban";
import { BoardContent, Column, ColumnPayload } from "@/Interface/Dashboard";
import { getBoardData } from "@/APIs/Board/GetBoardData";
import { getBoardCols } from "@/APIs/Board/GetBoardCols";
import { createColumn } from "@/APIs/Board/ColumnActions/CreateColumn";
import { updateColumn } from "@/APIs/Board/ColumnActions/UpdateColumn";
import { deleteColumn } from "@/APIs/Board/ColumnActions/DeleteColumn";

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

    const { selectedBoard, openBoardModal } = context;

    useEffect(() => {
        if (!selectedBoard) return;

        handleGetBoardData(selectedBoard.id);
        handleGetBoardCols(selectedBoard.id);
    }, [selectedBoard]);

    const handleGetBoardData = async (id: number) => {
        try {
            const res = await getBoardData(id);
            if (res.success) {
                setBoardData(res.data)
            }
        } catch (error) {
            console.log('Failed to load board data', error);
        }
    }

    // column handlers
    const handleGetBoardCols = async (id: number) => {
        try {
            const res = await getBoardCols(id);
            if (res.success) {
                setBoardColumns(res.data)
            }
        } catch (error) {
            console.log('Failed to load board data', error);
        }
    }

    const handleAddColumn = async (payload: ColumnPayload) => {
        if (!boardData) return;
        try {
            const res = await createColumn(boardData!.id, payload);
            if (res.success) {
                setBoardColumns(prev => [...prev, res.data]);
            }
        } catch (error) {
            console.log('Failed to create column', error);
        }
    }

    const handleUpdateColumn = async (id: number, payload: ColumnPayload) => {
        if (!boardData) return;
        try {
            const res = await updateColumn(boardData!.id, id, payload);
            if (res.success) {
                setBoardColumns(prev => prev.map(c => c.id === id ? { ...c, title: res.data.title } : c));
            }
        } catch (error) {
            console.log('Failed to create column', error);
        }
    }

    const handleDeleteColumn = async (id: number) => {
        if (!boardData) return; 
        try {
            const res = await deleteColumn(boardData!.id, id);
            if (res.success) {
                setBoardColumns(prev => prev.filter(col => col.id !== id));
            }
        } catch (error) {
            console.log('Failed to create column', error);
        }
    }

    return (
        <div className="board-component flex-1 h-screen overflow-auto p-5">
            <div className="board-list h-full flex flex-col">
                {selectedBoard && boardData
                    ?
                    <div className="flex flex-col flex-1">
                        <BoardHeader name={boardData.name} end_date={boardData.end_date} />
                        <BoardKanban
                            columns={BoardColumns}
                            onAddColumn={handleAddColumn}
                            onUpdateColumn={handleUpdateColumn}
                            onDeleteColumn={handleDeleteColumn}
                        />
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