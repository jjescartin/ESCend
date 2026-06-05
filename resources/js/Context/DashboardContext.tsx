import { createContext, useContext } from "react";
import { Board, Alert, Settings, Profile } from "../Interface/Dashboard";

type DashboardContextType = {
    boards: Board[],
    alerts: Alert[],
    profile: Profile,
}

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => useContext(DashboardContext)