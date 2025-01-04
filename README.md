# Node.js Express TypeScript Application for Wrike API Integration

This project is a Node.js Express application built with TypeScript to integrate with the Wrike API for managing tasks. The application uses `axios` for API requests, and the retrieved data is processed and stored locally.

## Features

- Fetch tasks from the Wrike API
- Save tasks as JSON locally
- RESTful API endpoints with Express
- TypeScript for type safety

## Prerequisites

1. Node.js (v20+ recommended)
2. Yarn
3. Wrike API Token

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and configure the environment variables:

   ```env
   WRIKE_API_URL=https://www.wrike.com/api/v4/tasks
   WRIKE_TOKEN=<your_wrike_api_token>
   PORT=4000
   ```

4. Compile TypeScript to JavaScript:

   ```bash
   yarn run build
   ```

5. Start the server:

   ```bash
   yarn start
   ```

6. For development mode with live reloading:
   ```bash
   yarn run dev
   ```

## Directory Structure

```
project-directory/
├── src/
│   ├── index.ts                # Main server file
│   ├── routes/
│   │   └── index.ts            # Main route file
│   │   └── tasks.routes.ts     # Task-specific routes
│   ├── controllers/
│   │   └── tasks.controller.ts # Tasks controller logic
│   ├── models/
│   │   └── task.model.ts       # Task TypeScript model
│   ├── api/
│   │   └── index.ts            # Axios API client setup
├── tasks.json                  # Local storage for tasks
├── .env                        # Environment variables
├── tsconfig.json               # TypeScript configuration
├── package.json                # npm package configuration
├── README.md                   # Project documentation
```

## API Endpoints

### GET `/api/tasks`

Fetches tasks from the Wrike API and stores them locally in `tasks.json`.

#### Example Request

```bash
curl http://localhost:4000/api/tasks
```

#### Example Response

```json
[
  {
    "id": "IEAGMADYKROWAIR7",
    "title": "task 1 project 3",
    "status": "Completed",
    "createdAt": "2024-12-28T10:24:25Z",
    "updatedAt": "2024-12-28T10:26:33Z",
    "permalink": "https://www.wrike.com/open.htm?id=1566581311"
  },
  {
    "id": "IEAGMADYKROWAITJ",
    "title": "task 4 project 3",
    "status": "Active",
    "createdAt": "2024-12-28T10:26:00Z",
    "updatedAt": "2024-12-28T10:39:42Z",
    "permalink": "https://www.wrike.com/open.htm?id=1566581353"
  }
]
```

## Scripts

- `yarn start`: Runs the application
- `yarn run build`: Compiles TypeScript to JavaScript
- `yarn run dev`: Starts the application in development mode with live reload

## Wrike API Integration

The application uses an `axios` instance for interacting with the Wrike API. The base URL and token are configured via environment variables.

### Axios API Client

Located in `src/api/index.ts`:

```typescript
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const $apiClient = axios.create({
  baseURL: process.env.WRIKE_API_URL,
});

$apiClient.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.WRIKE_TOKEN}`,
  };
  return config;
});

export default $apiClient;
```

### Error Handling

The application handles errors from the API gracefully and logs them for debugging.

## Task Processing

The retrieved tasks are transformed into the following structure before saving:

```typescript
{
  id: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  permalink: string;
}
```
