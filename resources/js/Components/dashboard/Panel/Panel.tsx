import React from "react";
import BoardPanel from "./BoardPanel";
import ProfilePanel from "./ProfilePanel";
import AlertsPanel from "./AlertPanel";
import SearchPanel from "./SearchPanel";

type Props = {
    isOpen: boolean
    activeRail: string
}
export default function Panel({ isOpen, activeRail }: Props) {
    return (
        <div className={`panel-component h-screen bg-green-100 flex flex-col items-center gap-4 px-2 py-4 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'w-72 opacity-100' : 'w-0 px-0 opacity-0'}`}>
            {activeRail === "Board" && <BoardPanel />}
            {activeRail === "Alerts" && <AlertsPanel />}
            {activeRail === "Search" && <SearchPanel />}
            {activeRail === "Profile" && <ProfilePanel />}
        </div>
    );
}