import { faGear, faKey, IconDefinition,faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProfile } from "@/Context/ProfileContext";

export default function ProfilePanel() {
    const context = useProfile();
    if (!context) return null;

    const { profile, handleLogout } = context

    const ACTION_ICONS: Record<string, IconDefinition> = {
        view_profile: faUser,
        change_pw: faKey,
        settings: faGear,
        logout: faRightFromBracket,
    }

    const handleAction = (key: string) => {
        switch(key) {
            case 'logout': handleLogout(); break;
            case 'view_profile': break;
            case 'settings': break;
            case 'change_pw': break;
        }
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
                <span>{profile.email}</span>
            </div>
            <hr></hr>
            <div className="p-2">
                {profile.actions.map((action) => ( 
                    <div 
                        key={action.id}
                        onClick = {() => handleAction(action.key) }
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