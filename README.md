# Swan's Kanban Board

## Project Description
A Kanban board and data dashboard built with React, Vite, and Tailwind CSS. The application features a fully functional 3-column task management system (TO DO, DOING, DONE) and a dynamic analytics dashboard utilizing Chart.js. All task and category data is persistently stored using the browser's Local Storage, ensuring data remains available upon page refresh without the need for a backend database.

## Team Members
* Swan Yi Aung - 6812043

## Screenshots

![Kanban Board]
<img width="1920" height="1032" alt="Screenshot 2026-09-01 014914" src="https://github.com/user-attachments/assets/26b19589-3436-4a0b-992c-1a9ce5c5e9e0" />
<img width="1920" height="1032" alt="Screenshot 2026-09-01 015014" src="https://github.com/user-attachments/assets/13dee02d-1de6-4de8-abf5-77854f61bc6e" />
<img width="1920" height="1032" alt="Screenshot 2026-09-01 015229" src="https://github.com/user-attachments/assets/a07fe0fc-127d-4f38-b138-9f937cdfb858" />




![Dashboard]
<img width="1920" height="1032" alt="Screenshot 2026-09-01 014816" src="https://github.com/user-attachments/assets/cd8b3891-9081-4b57-9a7c-7a4d6cabbe67" />


## Basic Usage Instructions

1. **Creating Tasks:** Click the "+ Add New Task" button on the main Kanban view. Fill in the required fields (title, description, dates, responsible person) and click save.
2. **Managing Categories:** When creating or editing a task, select an existing category from the dropdown menu, or click the "+ New" button to type in a custom category.
3. **Moving Tasks:** Use the status buttons (To Do, Doing, Done) at the bottom of each task card to advance items through the workflow. Moving a task to "Done" will automatically record its completion date.
4. **Viewing Analytics:** Click the "Dashboard" link in the top navigation bar to view real-time metrics. The dashboard visualizes the total task count, overdue items, status distribution (Pie Chart), category distribution (Bar Chart), and completion performance (Doughnut Chart).
