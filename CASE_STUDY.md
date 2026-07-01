# ESCend Case Study

## Overview

ESCend is a personal portfolio project built to demonstrate my approach to designing and developing a modern full-stack web application.

Rather than focusing solely on implementing Kanban functionality, the project emphasizes application architecture, maintainability, and engineering decisions. Every major feature was approached with the goal of creating a codebase that is organized, scalable, and easy to extend as the project continues to evolve.

The application is built using Laravel 12, React 18, TypeScript, and Inertia.js, following a Single Page Application architecture while leveraging Laravel as the backend framework.

---

# Objectives

The primary goals of ESCend were:

- Design a maintainable Laravel application beyond the default MVC structure.
- Build a modern SPA using React and Inertia.js.
- Practice organizing a growing codebase.
- Develop reusable backend and frontend patterns.
- Deploy the application using Docker and Render.
- Continue evolving the application as a long-term portfolio project.

---

# Development Strategy

## Frontend First

One of the earliest architectural decisions was to develop the frontend before implementing the backend.

Instead of immediately building database tables and API endpoints, I began by creating mock data that represented the information each component would eventually consume.

This allowed me to:

- Focus entirely on user experience.
- Build the complete interface without backend dependencies.
- Define the data contract before writing backend code.

Once the frontend was complete, backend endpoints were implemented to return the same data structure used by the mock data.

Because the frontend had already been designed around that structure, very few changes were required when connecting it to Laravel.

```
Mock Data
      ↓
React Components
      ↓
Completed UI
      ↓
Laravel Endpoints
      ↓
Database
```

---

# Backend Architecture

Laravel's MVC architecture serves as the project's foundation.

To better separate responsibilities, business logic is delegated to dedicated service classes rather than being implemented directly inside controllers.

Example:

```
BoardController
        │
        ▼
BoardService
        │
        ▼
Board Model
```

This keeps controllers focused on receiving requests and returning responses while allowing services to encapsulate business logic.

Validation is handled through dedicated FormRequest classes for each CRUD operation.

Example:

```
StoreBoardRequest
UpdateBoardRequest
DeleteBoardRequest
```

Controllers therefore remain responsible for:

- Receiving HTTP requests.
- Injecting validated requests.
- Passing data to the service layer.
- Returning responses.

---

# Frontend Organization

The frontend is organized into clear layers.

```
Pages
Components
APIs
Context
Interfaces
```

Within the dashboard, components are further organized according to the application's UI hierarchy.

```
Dashboard
    ├── Board
    │      ├── Header
    │      └── Kanban
    │              └── Column
    │                      └── Card
```

API communication is isolated into dedicated Axios modules.

Instead of allowing components to communicate directly with Axios, API requests are grouped according to their domain.

Example:

```
APIs
    ├── Auth
    ├── Board
    ├── Dashboard
```

This keeps presentation components focused solely on rendering and user interaction.

---

# State Management

One of the biggest design considerations throughout development was deciding where application state should live.

The goal was to keep state as close as possible to the component responsible for managing it while avoiding unnecessary prop drilling.

React Context was introduced only when multiple unrelated components genuinely required shared state.

Conversely, Context was intentionally avoided when data simply flowed through a direct parent-child relationship, keeping the solution simpler and reducing unnecessary abstraction.

---

# Performance Considerations

An early implementation eagerly loaded board data together with every column and card.

Although functional, this resulted in unnecessary data being transferred when users only needed a list of available boards.

The application was redesigned to load board lists first and retrieve detailed board data only when a board is selected.

This reduced the initial amount of data sent to the client while keeping the frontend responsive.

---

# Drag-and-Drop

The drag-and-drop functionality is implemented using dnd-kit.

While integrating the library introduced a new learning curve, the larger challenge was not the drag-and-drop implementation itself but designing a predictable state flow that kept parent components responsible for state while allowing child components to remain focused on presentation.

---

# Deployment

The application is containerized using Docker and deployed on Render.

SQLite is used as the default database, allowing reviewers to run the application without configuring a separate database server.

Deployment automatically executes:

- Database migrations
- Database seeders

This ensures the deployed application is immediately usable after startup.

---

# Lessons Learned

The most valuable lessons from ESCend were not tied to implementing individual features but to making architectural decisions.

Throughout development, I frequently evaluated questions such as:

- Where should this logic live?
- Is this abstraction necessary?
- Should state belong to the parent or be shared?
- Is introducing another layer justified?
- Does this improve maintainability?

Answering these questions often required significantly more thought than writing the implementation itself.

---

# Future Direction

ESCend is intended to remain an actively developed portfolio project.

Upcoming work includes:

- User registration
- Profile management
- Email verification
- Password reset
- Card comments
- Card assignees
- Dynamic labels
- Responsive design
- Dark mode
- Search and filtering
- Notifications
- Automated PHPUnit testing

---

# Closing Thoughts

ESCend represents my approach to building software beyond simply implementing features.

It reflects how I think about project organization, responsibility separation, maintainability, and incremental improvement.

As the project continues to evolve, these principles will remain the foundation for future development.