import { createContext, useContext } from "react";
import { Board, Alert, Settings, Profile, BoardPayload } from "../Interface/Dashboard";

type DashboardContextType = {
    boardLists: Board[] | null,
    alerts: Alert[],
    selectedBoard: Board | null,
    setSelectedBoard: (board: Board) => void,
    handleLogout: (profile: Profile) => void,
    handleCreateBoard: (data: BoardPayload) => void,
    handleEditBoard: (id:number, data: BoardPayload) => void,
    handleDeleteBoard: (id:number) => void,
    openBoardModal: (mode: 'create' | 'edit', board?: Board) => void
}

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => useContext(DashboardContext)