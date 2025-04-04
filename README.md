# MCP Server Tester

**MCP Server Tester** is a full-stack web application that allows users to validate and test their custom MCP server endpoints. Built with React and Express.js, this tool helps developers ensure their MCP servers are structured correctly and responsive.

##  Live Demo

- **Frontend (Vercel):** [https://mcp-tester-six.vercel.app](https://mcp-tester-six.vercel.app)  
- **Backend (Render):** [https://mcp-backend-ebye.onrender.com](https://mcp-backend-ebye.onrender.com)

---

##  Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Lucide React
- **Backend:** Node.js, Express, CORS
- **Deployment:** Vercel (Frontend), Render (Backend)

---

##  My Approach

I started by creating a simple user interface using React and Tailwind CSS. The core functionality lets users input a MCP server URL and sends a POST request to the backend for validation.

The backend validates the format of the MCP URL and returns a mock response to simulate real-world testing. This architecture allows separation of concerns between UI, validation logic, and server handling.

Key Features:
- Clean, responsive UI with validation feedback
- MCP URL format check with helpful error messages
- Full-stack deployment with CORS configuration for cross-origin access
- Detailed results displayed with loading states and error handling

---

## Local Setup Instructions

###  Prerequisites
- Node.js (v14+ recommended)
- npm

###  Project Structure
root/
├── client/       # React frontend
└── server/       # Express backend

---


Install dependencies:
npm install


###  Backend Setup (Node.js)

1. Navigate to the `server` folder:
   ```bash
   cd server
node server.js

Frontend Setup:

Navigate to the client folder:
cd client
npm install
npm start


Use this for testing:
https://smithery.ai/server@smithery-ai/server-sequential-thinking


 CORS Info
This project includes proper CORS configuration in the backend to allow cross-origin communication from the deployed frontend. If you host your own version, make sure to update the allowed origins in the backend code.