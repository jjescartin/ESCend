export interface Board {
    id: number,
    boardName: string
}

export interface Alert {
    id: number, 
    message: string , 
    is_read: boolean, 
    created_at: string 
}

export interface Settings {
    id: number,
    label: string,
    description: string
}

export interface ProfileAction {
    id: number,
    label: string,
    key: string,
}

export interface Profile {
    id: number,
    username: string,
    mail: string,
    initials: string,
    actions: ProfileAction[]
}