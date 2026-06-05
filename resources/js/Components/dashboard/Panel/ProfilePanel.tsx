import { useDashboard } from "@/Context/DashboardContext";
import React from "react";
import { faGear, faKey, IconDefinition,faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProfilePanel() {
    const context = useDashboard();
    if (!context) return null;

    const { profile } = context

    const handleProfileClick = () => {
        console.log('clicks on profile');
    }

    const ACTION_ICONS: Record<string, IconDefinition> = {
        view_profile: faUser,
        change_pw: faKey,
        settings: faGear,
        logout: faRightFromBracket,
    }

    return (
        <div className="profile-wrapper px-2 py-3 w-full">
            <div className="pb-3 pl-3">
                <span className="text-2xl font-extralight">PROFILE</span>
            </div>
            <div className="text-lg font-extralight pl-3">
                <span>{profile.username}</span>
            </div>
            <div className="text-lg font-extralight opacity-30 pl-3 pb-2">
                <span>{profile.mail}</span>
            </div>
            <hr></hr>
            <div className="p-2">
                {profile.actions.map((action) => ( 
                    <div 
                        key={action.id}
                        className="flex items-center gap-1 p-2 px-3 rounded-lg cursor-pointer
                        hover:bg-green-200 transition-colors group">
                    
                        <div className="w-8 h-8 flex items-center"><FontAwesomeIcon icon={ACTION_ICONS[action.key]} /></div>
                        <span className="flex-1 pr-2 text-sm">{action.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}