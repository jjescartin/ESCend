import Rail from '../Components/dashboard/Rail/Rail';
import Board from '../Components/dashboard/Board';
import { useState } from 'react';
import Panel from '../Components/dashboard/Panel';

export default function Dashboard() {
    
    const [isPanelOpen, setIsPanelOpen] = useState(false);


    const handleOpenPanel = () => {
        if (isPanelOpen) setIsPanelOpen(false);
        else setIsPanelOpen(true); 
    }
    return (
        <div className="dashboard-page flex min-h-screen">
            <Rail showPanel={handleOpenPanel}/>
            <Panel isOpen={isPanelOpen}/>
            <Board/>
        </div>
    );
}
