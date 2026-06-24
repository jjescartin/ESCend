import { createContext, useContext } from "react";
import { Board, Alert, Settings, Profile } from "../Interface/Dashboard";

type DashboardContextType = {
    boardLists: Board[] | null,
    alerts: Alert[],
    // profile: Profile,
    selectedBoard: Board | null,
    setSelectedBoard: (board: Board) => void,
    handleLogout: (profile: Profile) => void,
}

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => useContext(DashboardContext)