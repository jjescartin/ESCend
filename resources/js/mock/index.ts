export const MOCK_BOARD_CONTENTS = [
  {
    id: 1,
    name: "ESCend",
    columns: [
      {
        id: 1,
        title: "To Do",
        order: 0,
        color: "#7C3AED",
        cards: [
          {
            id: 1,
            title: "Set up Laravel scaffolding",
            description: null,
            order: 0,
            priority: "mid",
            due_date: null,
            tags: [{ id: 1, label: "Backend", color: "purple" }],
            assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }]
          },
          {
            id: 2,
            title: "Design database schema",
            description: "Define all tables, relationships, and indexes.",
            order: 1,
            priority: "high",
            due_date: "2025-07-15",
            tags: [{ id: 1, label: "Backend", color: "purple" }],
            assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }]
          }
        ]
      },
      {
        id: 2,
        title: "In Progress",
        order: 1,
        color: "#F59E0B",
        cards: [
          {
            id: 3,
            title: "Build drag-and-drop UI",
            description: null,
            order: 0,
            priority: "high",
            due_date: "2025-07-10",
            tags: [{ id: 2, label: "Frontend", color: "amber" }],
            assignees: [{ id: 1, name: "Joallen Escartin", initials: "JE", avatar: null }]
          }
        ]
      },
      {
        id: 3,
        title: "Done",
        order: 2,
        color: "#10B981",
        cards: [
          {
            id: 4,
            title: "Repo init & project setup",
            description: null,
            order: 0,
            priority: "low",
            due_date: "2025-06-30",
            tags: [{ id: 3, label: "Done", color: "green" }],
            assignees: [{ id: 2, name: "AR", initials: "AR", avatar: null }]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Orphan Outreach Program",
    columns: []
  },
  {
    id: 3,
    name: "8Bacus online casino",
    columns: []
  },
]
  

export const MOCK_BOARDS = [
    { id: 1, boardName: "ESCend" },
    { id: 2, boardName: "Orphan Outreach Program" },
    { id: 3, boardName: "8Bacus online casino" },
];

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

