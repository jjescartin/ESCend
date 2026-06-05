import Rail from '../Components/dashboard/Rail/Rail';
import Board from '../Components/dashboard/Board';
import { useState} from 'react';
import Panel from '../Components/dashboard/Panel/Panel';
import { DashboardContext } from '../Context/DashboardContext';



const MOCK_BOARDS = [
    { id: 1, boardName: "ESCcend" },
    { id: 2, boardName: "Orphan Outreach Program" },
    { id: 3, boardName: "8Bacus online casino" },
];

const MOCK_PROFILE = {
    id: 1,
    username: "Demo",
    mail: "demo@mail.com",
    initials: "D",
    actions: [
        {id: 1, label: "View Profile", key: "view_profile"},
        {id: 2, label: "Change Password", key: "change_pw"},
        {id: 3, label: "Settings", key: "settings"},
        {id: 4, label: "Logout", key: "logout"},
    ]
}

const MOCK_ALERTS = [
    { id: 1, message: "Card 'Fix login bug' was moved to Done", is_read: false, created_at: "2026-05-26" },
    { id: 2, message: "You were assigned to 'Update homepage'", is_read: false, created_at: "2026-05-25" },
    { id: 3, message: "New comment on 'API integration'", is_read: true, created_at: "2026-05-24" },
]


export default function Dashboard() {
    
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeRail, setActiveRail] = useState("");
    const [boards, setBoards] = useState(MOCK_BOARDS);
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
        <div className="dashboard-page flex min-h-screen">
            <Rail 
                showPanel={handleOpenPanel}
            />
            <DashboardContext.Provider value = {{boards, alerts, profile}}>
                <Panel isOpen={isPanelOpen} activeRail={activeRail}/>
            </DashboardContext.Provider>
            <Board/>
        </div>
    );
}
