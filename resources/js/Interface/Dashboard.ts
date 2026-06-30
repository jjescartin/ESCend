export type BoardPayload = {
    name: string,
    description: string | null, 
    end_date: string | null
}

export interface Board {
    id: number,
    boardName: string
}

export interface BoardContent {
    id: number,
    name: string, 
    description: string | null,
    end_date: string | null,
    completed: boolean
}

export type ColumnPayload = {
    title: string,
    color: string,
}
export interface Column {
    id: number,
    board_id: number,
    title: string,
    order: number,
    color: string,
    cards: CardTile[]
}

export type CardPayload = {
    title: string,
    description: string | null,
    priority: string,
    due_date: string | null,
}

export interface CardTile {
    id: number,
    column_id: number,
    code: string,
    title: string,
    tags: Tag[],
    assignees: Assignee[]
}
export interface CardDetail {
    id: number,
    column_id: number,
    code: string
    title: string,
    description: string | null, 
    order: number,
    priority: string,
    created_at: string,
    due_date: string | null,
    tags: Tag[],
    assignees: Assignee[],
    comments: Comment[]
}

export interface Comment {
    id: number,
    user: Assignee,
    message: string,
    created_at: string,
}

export interface Tag {
    id: number,
    label: string,
    color: string
}

export interface Assignee {
    id: number,
    name: string,
    initials: string,
    avatar: string | null
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
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    initials: string,
    created_at: string,
    actions: ProfileAction[]
}