# AI-Based Job Scheduling System

This project implements a job scheduling system using greedy algorithms for optimal job sequencing based on deadlines and priorities.

## Features

- Create and manage jobs with priorities and deadlines
- Automatic job scheduling using greedy algorithm
- Real-time status updates
- Simple and intuitive user interface

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   npm run server

   # In a new terminal, start frontend
   npm run client
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Create new jobs using the "Create Job" page
2. View all jobs on the home page
3. Check the optimized schedule on the "Schedule" page
4. Update job statuses as they progress

## Algorithm

The scheduling algorithm uses a greedy approach that:
1. Sorts jobs by deadline (earliest first)
2. For jobs with the same deadline, sorts by priority (highest first)
3. Maintains the order while allowing status updates

## License

MIT 