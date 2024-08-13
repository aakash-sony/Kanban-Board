# Kanban Board

A fully functional Kanban board application built with React.js.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)
6. [Images](#images)

## Overview

The Kanban board is a task management tool that helps you organize and visualize tasks in different stages of completion. 
This project is implemented using React.js and follows a component-based architecture.

## Features

- **Task Management**: Add, move and search tasks across different columns (e.g., To Do, In Progress, Peer Review, Done).
- **Drag and Drop**: Drag and drop tasks to different columns.
- **Persistent Data**: Tasks are stored in localStorage to persist across page refreshes.
- **Search Filter**: Filter tasks in all columns based on the search input.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version X.X.X or higher)
- **npm** or **yarn** (for package management)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kanban-board.git
   ```
2. Navigate to the project directory:
   ```bash
   cd kanban-board
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

- **Add Tasks**: Click on the "Add Task" button to create a new task.
- **Move Tasks**: Drag and drop tasks to move them across different columns.
- **Search Tasks**: Use the search bar to filter tasks by title.

## Folder Structure

Here's an overview of the project's folder structure:

kanban_board/
│
├── node_modules/
│ └── ... (dependencies installed via npm or yarn)
│
├── public/
│ ├── index.html # Main HTML file
│ ├── manifest.json  
│ └── robots.txt  
│
├── src/
│ ├── components/  
│ │ ├── Board/  
│ │ │ │──────────────NewTask/  
│ │ │ │── Board.css      │
│ │ │ ├── Board.js       │──NewTask.js
│ │ │ ├── BoardLanes.js  │──NewTask.css
│ │ │ ├── CardItem.js    │──TaskForm.js
│ │ │ └── Lane.js  
│ │ │
│ │ └── Header/
│ │ └── Header.js  
│ │
│ ├── containers/  
│ │ └── App.js  
│ │ └── App.css
│ ├── App.test.js  
│ ├── index.css  
│ ├── index.js  
│ ├── reportWebVitals.js
│ └── setupTests.js  
├── .gitignore  
├── package-lock.json  
└── package.json 6.

## Images
![image](https://github.com/user-attachments/assets/de7431d7-c715-4104-aeb1-b747157d23e9)

