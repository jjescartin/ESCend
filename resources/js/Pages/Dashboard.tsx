import Rail from '../Components/dashboard/Rail/Rail';
import BoardComponent from '../Components/dashboard/Board/BoardComponent';
import { useState, useEffect } from 'react';
import Panel from '../Components/dashboard/Panel/Panel';
import { DashboardContext } from '../Context/DashboardContext';
import { MOCK_ALERTS, } from '../mock'
import { Board, BoardContent, BoardPayload, Profile } from '@/Interface/Dashboard';
import { getProfile } from '@/APIs/Dashboard/GetProfile';
import { ProfileContext } from '@/Context/ProfileContext';
import { logoutUser } from '@/APIs/Auth/LogoutUser';
import { router } from '@inertiajs/react';
import { getBoardList } from '@/APIs/Board/GetBoardList';
import BoardFormModal from '@/Components/dashboard/Board/BoardFormModal';
import { getBoardData } from '@/APIs/Board/GetBoardData';
import { createNewBoard } from '@/APIs/Board/BoardActions/CreateNewBoard';
import { updateBoard } from '@/APIs/Board/BoardActions/UpdateBoard';
import { deleteBoard } from '@/APIs/Board/BoardActions/DeleteBoard';

export default function Dashboard() {


    const PROFILE_ACTIONS = [
        { id: 1, label: "View Profile", key: "view_profile" },
        { id: 2, label: "Change Password", key: "change_pw" },
        { id: 3, label: "Settings", key: "settings" },
        { id: 4, label: "Logout", key: "logout" },
    ];

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeRail, setActiveRail] = useState("");
    const [boardLists, setBoardLists] = useState<Board[]>([]);
    const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
    const [alerts, setAlerts] = useState(MOCK_ALERTS);
    const [isBoardModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [editingBoard, setEditingBoard] = useState<BoardContent | null>(null);
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

    // profile handlers
    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (res.success) {
                router.visit('/dashboard');
            }
        } catch (error) {
            console.log('Failed to log out user', error);
        }
    }


    // board panel handlers

    const openBoardModal = async (mode: 'create' | 'edit', board?: Board) => {
        console.log('opening modal', mode, board);
        setModalMode(mode);

        if (mode === 'edit' && board) {
            try {
                const res = await getBoardData(board.id);
                if (res.success){
                    setEditingBoard(res.data);
                    setIsModalOpen(true);
                }
            } catch (error) {
                console.log('Failed to fetch board data', error);
            }
        } else {
            setEditingBoard(null);
            setIsModalOpen(true);
        }
    }

    const handleCreateBoard = async (data: BoardPayload) => {
        console.log('creating', data);
        try {
            const res = await createNewBoard(data);
            if (res.success) {
                setBoardLists(prev => [...prev, res.data]);
            }
        } catch (error) {
            console.log('Failed to add new board', error);
        }
    }

    const handleEditBoard = async (id: number, data: BoardPayload) => {
        console.log('updating board id:', id);
        try {
            const res = await updateBoard(id, data);
            if (res.success) {
                setBoardLists(prev => prev.map(b => b.id === id ? { ...b, boardName: res.data.name } : b));
            }
        } catch (error) {
            console.log('Failed to update board', error);
        }
    }

    const handleDeleteBoard = async (id: number) => {
        try {
            const res = await deleteBoard(id);
            if(res.success) {
                setBoardLists(prev => prev.filter(b => b.id !== id));
            }

        } catch (error) {
            console.log('Failed to delete board', error);
        }
    }


    // fetch functions
    const getProfileOnLoad = async () => {
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
        } catch (error) {
            console.log('Failed to fetch User data');
        }
    }

    const getBoardListOnLoad = async () => {
        console.log('fetching user board list');
        try {
            const res = await getBoardList();

            if (res.success) {
                setBoardLists(res.data);
            }
        } catch (error) {
            console.log('Failed to fetch User boards');
        }
    }

    useEffect(() => {
        getProfileOnLoad();
        getBoardListOnLoad();
    }, []);


    return (
        <div className="dashboard-page flex min-h-screen overflow-hidden">
            <Rail
                showPanel={handleOpenPanel}
            />
            <DashboardContext.Provider value={{
                boardLists,
                alerts,
                selectedBoard,
                setSelectedBoard,
                handleLogout,
                handleCreateBoard,
                handleEditBoard,
                handleDeleteBoard,
                openBoardModal
            }}>
                <ProfileContext.Provider value={{ profile, handleLogout }}>
                    <Panel isOpen={isPanelOpen} activeRail={activeRail} />
                    <BoardComponent />
                </ProfileContext.Provider>
            </DashboardContext.Provider>
            {isBoardModalOpen && (
                <BoardFormModal 
                    mode={modalMode}
                    board={editingBoard}
                    onClose={()=> setIsModalOpen(false)}
                    onSubmit={modalMode ==='create'
                        ? handleCreateBoard
                        : (data)=> handleEditBoard(editingBoard!.id, data)
                    }
                    onDelete={handleDeleteBoard}
                />
            )}
        </div>
    );
}
