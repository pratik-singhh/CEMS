# 🎉 Campus Event Management System (CEMS)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-317873?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A robust full-stack web application designed to streamline campus engagement. CEMS enables students to discover, create, and manage event registrations through a secure, scalable architecture.

---

## 🚀 Live Demo

| Component | URL |
| :--- | :--- |
| **🌐 Frontend** | [cems-six.vercel.app](https://cems-six.vercel.app) |
---

## ✨ Key Features

* **🔐 Secure Authentication:** Industry-standard Signup/Login flow using JWT (JSON Web Tokens) and `bcrypt` for salted password hashing.
* **📅 Event Lifecycle:** Authenticated users can host events with titles, descriptions, and specific timestamps.
* **📝 One-Click Registration:** Optimized UX for students to join events with immediate database persistence.
* **👤 Personal Dashboard:** "My Events" section to track all registered activities in real-time.
* **⚡ Modern UX:** Responsive design using Tailwind CSS with integrated loading states and toast notifications.

---

## 🛠️ Tech Stack & Decisions

### **Frontend**
- **React & TypeScript:** Chosen for type safety and component-based UI scalability.
- **Tailwind CSS:** Used for rapid, responsive utility-first styling.
- **Fetch API:** Kept the bundle size small by using native browser APIs for HTTP requests.

### **Backend**
- **Node.js & Express:** Provides a non-blocking, event-driven environment for the REST API.
- **JWT & Middleware:** Implemented custom middleware to verify tokens and protect sensitive routes.

### **Database**
- **PostgreSQL (Neon):** Relational database used to maintain strict data integrity (ACID compliance) for user-event relationships.

---

## 🧩 System Architecture

```mermaid
graph TD
    A[React Frontend] -->|REST API Calls| B[Express Backend]
    B -->|JWT Auth Middleware| C[Business Logic]
    C -->|SQL Queries| D[(PostgreSQL Database)]
