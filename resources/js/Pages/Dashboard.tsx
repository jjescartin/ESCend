import Rail from '../Components/dashboard/Rail/Rail';
import BoardComponent from '../Components/dashboard/Board/BoardComponent';
import { useState} from 'react';
import Panel from '../Components/dashboard/Panel/Panel';
import { DashboardContext } from '../Context/DashboardContext';
import {MOCK_ALERTS, MOCK_BOARDS, MOCK_PROFILE} from '../mock'
import { Board } from '@/Interface/Dashboard';

export default function Dashboard() {
    
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeRail, setActiveRail] = useState("");
    const [boards, setBoards] = useState(MOCK_BOARDS);
    const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
    const [alerts, setAlerts] = useState(MOCK_ALERTS);
    const [profile, setProfile] = useState(MOCK_PROFILE);

    const handleOpenPanel = (selected: string) => {
        if (activeRail === selected && isPanelOpen) {
            console.log('condition true');
            setIsPanelOpen(false)
            setActiveRail("");
        } else {
            console.log('condition else');
            setIsPanelOpen(true);
            setActiveRail(selected);
        }
    }
    
    return (
        <div className="dashboard-page flex min-h-screen overflow-hidden">
            <Rail 
                showPanel={handleOpenPanel}
            />
            <DashboardContext.Provider value = {{boards, alerts, profile, selectedBoard, setSelectedBoard}}>
                <Panel isOpen={isPanelOpen} activeRail={activeRail}/>
                <BoardComponent/>
            </DashboardContext.Provider>
        </div>
    );
}
