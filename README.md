# Taskana
Another Task Management System

## Overview
Simple application for managing tasks.

### Features
- See your tasks in a table
- Create, Update, Delete your tasks with (title, status, priority)
- Ability to create custom fields
- Filter by any fields including custom fields
- Sort by any fields including custom fields
- Supports Pagination for big list of tasks
- All in your browser tab, no data went outside of your browser

## Notes
- This project uses Next.js (v15) and TypeScript.
- Seed tasks by default
- Track next ID for new tasks
- Dynamic Form validation with Zod and custom fields `src/features/tasks/hooks/use-form-schema.ts`
- Consistent filter and sorting, stored in URL

## Milestones
- [x] Task Management (CRUD)
- [x] Managing tasks
- [x] Filtering and Sorting
- [x] Pagination
- [x] Local Persistence
- [x] Custom Fields
- [x] Animations and Transitions
- [ ] Undo/Redo
- [ ] Bulk Actions
- [ ] Kanban Board


## Development
First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Futures Development
- Add support Authentication
- Add support Postgres and APIs
- Add Kanban View


### Credits
- https://github.com/phantomstudios/use-local-state