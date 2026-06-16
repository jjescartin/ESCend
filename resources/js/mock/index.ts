// export const MOCK_BOARD_CONTENTS = [
//   {
//     id: 1,
//     name: "ESCend",
//     end_date: "2025-12-31",
//     completed: 0,
//     columns: [
//       {
//         id: 1,
//         title: "To Do",
//         order: 0,
//         color: "#7C3AED",
//         cards: [
//           {
//             id: 1,
//             title: "Set up Laravel scaffolding",
//             code: "SETUP-1",
//             description: null,
//             order: 0,
//             priority: "mid",
//             due_date: null,
//             tags: [{ id: 1, label: "Backend", color: "purple" }],
//             assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }]
//           },
//           {
//             id: 2,
//             title: "Design database schema",
//             code: "SETUP-4",
//             description: "Define all tables, relationships, and indexes.",
//             order: 1,
//             priority: "high",
//             due_date: "2025-07-15",
//             tags: [{ id: 1, label: "Backend", color: "purple" }],
//             assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }, { id: 2, name: "Mia Escartin", initials: "ME", avatar: null }]
//           }
//         ]
//       },
//       {
//         id: 2,
//         title: "In Progress",
//         order: 1,
//         color: "#F59E0B",
//         cards: [
//           {
//             id: 3,
//             title: "Build drag-and-drop UI",
//             code: "SETUP-2",
//             description: null,
//             order: 0,
//             priority: "high",
//             due_date: "2025-07-10",
//             tags: [{ id: 2, label: "Frontend", color: "amber" }],
//             assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }]
//           }
//         ]
//       },
//       {
//         id: 3,
//         title: "Done",
//         order: 2,
//         color: "#10B981",
//         cards: [
//           {
//             id: 4,
//             title: "Repo init & project setup",
//             code: "SETUP-3",
//             description: null,
//             order: 0,
//             priority: "low",
//             due_date: "2025-06-30",
//             tags: [{ id: 3, label: "Done", color: "green" }],
//             assignees: [{ id: 2, name: "AR", initials: "AR", avatar: null }]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: "Orphan Outreach Program",
//     end_date: "",
//     completed: 0,
//     columns: []
//   },
//   {
//     id: 3,
//     name: "8Bacus online casino",
//     end_date: "",
//     completed: 0,
//     columns: []
//   },
// ]

// Panel display - loaded on app load
export const MOCK_BOARDS = [
    { id: 1, boardName: "ESCend" },
    { id: 2, boardName: "Orphan Outreach Program" },
    { id: 3, boardName: "8Bacus online casino" },
];

// Board header - loaded on board click
export const MOCK_BOARD_CONTENTS = [
    { id: 1, name: "ESCend", end_date: "2025-12-31", completed: false },
    { id: 2, name: "Orphan Outreach Program", end_date: null, completed: false },
    { id: 3, name: "8Bacus online casino", end_date: null, completed: false },
]

// Columns - loaded on board click
export const MOCK_COLUMNS  = [
    { id: 1, board_id: 1, title: "To Do", order: 0, color: "#7C3AED", cards: [] },
    { id: 2, board_id: 1, title: "In Progress", order: 1, color: "#F59E0B", cards: [] },
    { id: 3, board_id: 1, title: "Done", order: 2, color: "#10B981", cards: [] },
]

// Lightweight cards - loaded with columns
export const MOCK_CARDS  = [
    { id: 1, column_id: 1, code: "ESC-1", title: "Set up Laravel scaffolding", tags: [{ id: 1, label: "Backend", color: "#7C3AED" }], assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }] },
    { id: 2, column_id: 1, code: "ESC-2", title: "Design database schema", tags: [{ id: 1, label: "Backend", color: "#7C3AED" }], assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }, { id: 2, name: "Mia Escartin", initials: "ME", avatar: null }] },
    { id: 3, column_id: 2, code: "ESC-3", title: "Build drag-and-drop UI", tags: [{ id: 2, label: "Frontend", color: "#F59E0B" }], assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }] },
    { id: 4, column_id: 3, code: "ESC-4", title: "Repo init & project setup", tags: [{ id: 3, label: "DevOps", color: "#10B981" }], assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }] },
]

// Full card detail - loaded on card click (modal)
export const MOCK_CARD_DETAILS = [
    { 
        id: 1, 
        column_id: 1, 
        code: "ESC-1", 
        title: "Set up Laravel scaffolding", 
        description: "Initialize Laravel project with authentication, middleware, and base routing.", 
        order: 0, 
        priority: "mid", 
        created_at: "2025-07-15",
        due_date: null, 
        tags: [{ id: 1, label: "Backend", color: "#7C3AED" }], 
        assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }], 
        comments: [
            { id: 1, user: { id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }, message: "Started working on this.", created_at: "2025-07-01 09:00" }
        ] 
    },
    { 
        id: 2, 
        column_id: 1, 
        code: "ESC-2", 
        title: "Design database schema", 
        description: "Define all tables, relationships, and indexes for boards, columns, cards, tags, and assignees.", 
        order: 1, 
        priority: "high", 
        created_at: "2025-07-15",
        due_date: "2025-07-15", 
        tags: [{ id: 1, label: "Backend", color: "#7C3AED" }], 
        assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }, { id: 2, name: "Mia Escartin", initials: "ME", avatar: null }], 
        comments: [
            { id: 2, user: { id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }, message: "Drafted the ERD, will share for review.", created_at: "2025-07-02 10:30" },
            { id: 3, user: { id: 2, name: "Mia Escartin", initials: "ME", avatar: null }, message: "Looks good, added indexes for foreign keys.", created_at: "2025-07-03 14:00" }
        ] 
    },
    { 
        id: 3, 
        column_id: 2, 
        code: "ESC-3", 
        title: "Build drag-and-drop UI", 
        description: null, 
        order: 0, 
        priority: "high",
        created_at: "2025-07-15",
        due_date: "2025-07-10", 
        tags: [{ id: 2, label: "Frontend", color: "#F59E0B" }], 
        assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }], 
        comments: [] 
    },
    { 
        id: 4, 
        column_id: 3, 
        code: "ESC-4", 
        title: "Repo init & project setup", 
        description: "Initialize React + Laravel project, configure Vite, Tailwind, and folder structure.", 
        order: 0, 
        priority: "low", 
        created_at: "2025-07-15",
        due_date: "2025-06-30", 
        tags: [{ id: 3, label: "DevOps", color: "#10B981" }], 
        assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }], 
        comments: [] 
    },
]

export const MOCK_CARD_COMMENTS = [

]



export const MOCK_PROFILE = {
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

export const MOCK_ALERTS = [
    { id: 1, message: "Card 'Fix login bug' was moved to Done", is_read: false, created_at: "2026-05-26" },
    { id: 2, message: "You were assigned to 'Update homepage'", is_read: false, created_at: "2026-05-25" },
    { id: 3, message: "New comment on 'API integration'", is_read: true, created_at: "2026-05-24" },
]

