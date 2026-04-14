# Clocking ⏱️

**Clocking** is a activity-logging application. It is designed to act as a digital ledger for your time, providing structured logs and deep visibility into productivity sessions.

Built with the **PERN Stack** (PostgreSQL, Express, React, Node.js), 

## 🔗 Live Demo
Check out the live application here:  
**[https://clocking-app-1ecv.onrender.com](https://clocking-app-1ecv.onrender.com)**

## 🚀 Key Features

- **Detailed Activity Logging:** Every session is recorded into a comprehensive log, allowing for historical review of time allocation.
- **High-Precision Tracking:** Implements custom React hooks to maintain millisecond-perfect timing, unaffected by the React render cycle.
- **Data Persistence:** Full synchronization with a PostgreSQL database, ensuring session data remains intact across reloads.
- **Minimalist Dashboard:** A clean, focused interface designed to stay out of the way of your actual work.

## 🛠 Tech Stack

### Frontend
- **React.js** (Vite)
- **Hosting**: Deployed on **Render**.

### Backend
- **Node.js & Express.js**: Powering the RESTful API and server-side logic.
- **PostgreSQL**: Relational database for structured session storage.
- **Hosting**: Deployed on **Render** (Web Service & Managed PostgreSQL) & Supabase platform for database.

## 📂 Project Structure

```text
clocking-pern-js/
├── clocking/           # Frontend (React App)
│   ├── src/
│   │   ├── components/ # Dashboard & Log UI Components
│   │   ├── pages/      # pages each route
│   │   └── App.jsx
├── server/             # Backend (Node.js & Express)
│   ├── db.js           # PostgreSQL Configuration
│   ├── index.js        # API Server Entry Point
└── .gitignore
