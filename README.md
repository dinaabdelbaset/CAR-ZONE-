# Car Zone Monorepo

This repository contains both the frontend (car-zone) and backend (car-zone-backend) for the Car Zone project.

## Project Structure

- `car-zone/` — Frontend (React + Vite)
- `car-zone-backend/` — Backend (NestJS)

## Features

- Browse, search, and filter cars
- View car details and compare vehicles
- Manage spare parts and used cars
- Modern UI with toast notifications and loading spinners
- Backend API for cars, brands, body types, fuel types, transmissions, and more

## Prerequisites

- Node.js (v20 or higher recommended)
- npm (v9 or higher)

## Installation

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd car-zone-project
   ```

2. **Install all dependencies for both frontend and backend:**
   ```sh
   npm install
   ```
   This uses npm workspaces to install everything in one step.

## Running the Project

To start both backend and frontend together:

```sh
npm run dev
```

- The backend will start first (NestJS, default port 3000)
- The frontend will start (Vite, default port 5173)

You can also run them individually:

- **Frontend only:**
  ```sh
  npm run --prefix car-zone dev
  ```
- **Backend only:**
  ```sh
  npm run --prefix car-zone-backend start
  ```

## Customization

- Update environment variables and API endpoints as needed in the respective folders.
- See each folder's README or documentation for more details.

## License

MIT
