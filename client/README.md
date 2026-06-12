# Personal Task Manager

A full-stack MERN application for managing personal tasks with categories, built with TypeScript.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas

## Features

- Create, read, update and delete tasks
- Filter tasks by category (Work, Personal, Urgent)
- Filter tasks by status (Completed, Pending)
- Form validation (all fields required, due date cannot be in the past)
- Mark tasks as complete/incomplete

## Project Structure

task-manager/
├── client/ # React frontend
└── server/ # Express backend

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string

Then run:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Open your browser at `http://localhost:5173`

## Known Issues

- No authentication (single user app)
- No edit functionality for existing tasks

Save with Ctrl + S.
