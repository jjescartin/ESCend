import { Profile } from "@/Interface/Dashboard"
import { createContext, useContext } from "react"

type ProfileContextType = {
    profile: Profile,
    handleLogout: () => void,
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfile = () => useContext(ProfileContext);