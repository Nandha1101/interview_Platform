🚀 Online Code Execution & Session Management Platform

A full-stack web application that enables users to write, execute, and manage code sessions directly from the browser.
The platform provides a smooth coding experience with real-time code execution, session tracking, and a modern responsive interface.

This project demonstrates full-stack development skills, including REST API design, frontend architecture, backend services, and deployment.

📌 Key Features

✅ Online Code Execution
Run code directly from the browser through backend execution APIs.

✅ Session Management
Create and maintain coding sessions for better workflow management.

✅ Recent Sessions Tracking
Users can easily view their recently executed coding sessions.

✅ Responsive UI
Clean and intuitive user interface built with modern frontend tools.

✅ RESTful API Architecture
Structured backend APIs for execution and session management.

🏗 System Architecture
Frontend (React + Vite)
        │
        │ API Requests
        ▼
Backend (Node.js + Express)
        │
        ▼
Session & Execution Logic
The frontend communicates with backend APIs for code execution and session handling.

🛠 Tech Stack
Frontend
React
Vite
DaisyUI
Tailwind CSS

Backend
Node.js
Express.js
Authentication
Clerk

Real-Time Communication
Stream Video SDK

Background Jobs & Event Processing
Inngest

Development Tools
Git
GitHub
npm

📂 Project Structure
project-root
│
├── backend
│   └── src
│       ├── controllers      # Business logic
│       ├── lib              # Utility functions
│       ├── middleware       # Custom middleware
│       ├── models           # Data models
│       └── routes           # API routes
│
├── frontend
│   └── src
│       ├── api              # API calls
│       ├── assets           # Static assets
│       ├── components       # Reusable UI components
│       ├── data             # Static data
│       ├── hooks            # Custom React hooks
│       ├── lib              # Utility functions
│       └── pages            # Application pages
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/project-name.git
cd project-name
2️⃣ Install Backend Dependencies
cd backend
npm install
3️⃣ Install Frontend Dependencies
cd ../frontend
npm install
▶️ Running the Application

Start Backend Server
cd backend
npm run dev

Backend runs on:
http://localhost:3000

Start Frontend Application
cd frontend
npm run dev

Frontend runs on:
http://localhost:5173
📡 API Endpoints
Method	Endpoint	Description
POST	/api/execute	Execute user code
GET	/api/sessions	Fetch all sessions
GET	/api/sessions/active	Retrieve active sessions
GET	/api/sessions/my-recent	Retrieve recent sessions

🌍 Deployment
The application is deployed and accessible online.
Live Demo:
https://interview-platform-five-fawn.vercel.app/

📸 Screenshots
Home Page
<img width="1894" height="896" alt="Screenshot 2026-03-08 214038" src="https://github.com/user-attachments/assets/ed2c3ff3-7c9d-4f70-9046-cc05cab2f800" />
Session Page
<img width="1919" height="894" alt="Screenshot 2026-03-08 214425" src="https://github.com/user-attachments/assets/5b4137ff-f408-4168-a0a1-4c561ebeb66d" />


🚧 Future Enhancements
Support for multiple programming languages
Real-time collaborative coding
User authentication and authorization
Code sharing via public session links
Execution history analytics

👨‍💻 Author
Nandha Kishor



⭐ Support

If you find this project useful, consider giving it a star ⭐ on GitHub.
