import Rail from '../Components/dashboard/Rail/Rail';
import BoardComponent from '../Components/dashboard/Board/BoardComponent';
import { useState, useEffect} from 'react';
import Panel from '../Components/dashboard/Panel/Panel';
import { DashboardContext } from '../Context/DashboardContext';
import {MOCK_ALERTS, MOCK_BOARDS} from '../mock'
import { Board, Profile } from '@/Interface/Dashboard';
import { getProfile } from '@/APIs/Dashboard/GetProfile';
import { ProfileContext } from '@/Context/ProfileContext';
import { logoutUser } from '@/APIs/Auth/LogoutUser';
import { router } from '@inertiajs/react';

export default function Dashboard() {
    

    const PROFILE_ACTIONS = [
        { id: 1, label: "View Profile", key: "view_profile" },
        { id: 2, label: "Change Password", key: "change_pw" },
        { id: 3, label: "Settings", key: "settings" },
        { id: 4, label: "Logout", key: "logout" },
    ];

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeRail, setActiveRail] = useState("");
    const [boards, setBoards] = useState(MOCK_BOARDS);
    const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
    const [alerts, setAlerts] = useState(MOCK_ALERTS);
    const [profile, setProfile] = useState<Profile>({
        id: 0,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        initials: "",
        created_at: "",
        actions: PROFILE_ACTIONS
    });

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
    
    const getProfileOnLoad = async() => {
        console.log('fetching profile data');
        try {
            const res = await getProfile()

            if (res.success) {
                console.log('profile successfuly loaded');
                setProfile({
                    ...res.data,
                    actions: PROFILE_ACTIONS,
                });
            }
        } catch(error) {
            console.log('Failed to fetch User data');
        }
    }

    const handleLogout = async() => {
        try {
            const res = await logoutUser();
            if (res.success) {
                router.visit('/dashboard');
            }
        } catch (error) {
            console.log('Failed to log out user', error);
        }
    }
    
    useEffect(()=>{
        getProfileOnLoad();
    }, []);


    return (
        <div className="dashboard-page flex min-h-screen overflow-hidden">
            <Rail 
                showPanel={handleOpenPanel}
            />
            <DashboardContext.Provider value = {{boards, alerts, selectedBoard, setSelectedBoard, handleLogout}}>
                <ProfileContext.Provider value = {{profile, handleLogout}}>
                    <Panel isOpen={isPanelOpen} activeRail={activeRail}/>
                    <BoardComponent/>   
                </ProfileContext.Provider>
            </DashboardContext.Provider>
        </div>
    );
}
