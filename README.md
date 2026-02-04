# Foodmine - Intelligent Food Ordering Platform

A modern, web-based food ordering platform that helps users find meals matching their **dietary needs** and **calorie goals** through an AI-powered chatbot, while providing restaurant owners / admins with powerful management tools.

## ✨ Features

### For Users
- **Register & Login** – Secure authentication
- **Browse Menu** – View detailed meals (name, description, image, calories, protein, fat, etc.)
- **Place Orders** – Add meals to cart, customize quantity, and complete orders
- **Order Tracking** – Real-time status updates (Pending → Preparing → Out for Delivery → Delivered)
- **AI Chatbot** – Intelligent food assistant that can:
  - Tell you calorie/nutrition info for any meal
  - Recommend meals based on calorie target, protein goal, fat limit, etc.
  - Suggest options from the current menu or pre-trained knowledge

### For Admins
- **Secure Admin Dashboard** – Protected login
- **Manage Menu** – Add, edit, delete food items
- **Manage Users** – View users, block/unblock, delete accounts, promote to admin
- **Manage Orders** – View all orders, update status (preparing, delivered, etc.)
- **Future** – Chatbot interaction monitoring (optional)

## 🛠️ Tech Stack

- Frontend: React.js
- Backend: Node.js + Express + Flask 
- Database: MongoDB
- Authentication: JWT / bcrypt for secure password hashing
- AI Chatbot
- Styling: (Tailwind CSS / CSS Modules / Bootstrap / Material UI )
- Deployment: (Vercel / Netlify / Render)

## 📋 Project Goals & Problem Solved

### The Problem
In today's fast-paced life, people struggle to:
- Find meals that fit their **calorie goals**, **protein needs**, **diet restrictions**
- Enjoy a smooth, personalized food ordering experience

Meanwhile, restaurant owners / admins face:
- Inefficient tools to manage menu, users, and incoming orders
- Lack of real-time control → errors and poor customer experience

### Our Solution
**Foodmine** offers:
- **Personalized recommendations** via AI chatbot
- **Nutritional transparency** (calories, macros shown clearly)
- **Powerful admin panel** for full control over menu, users, and orders
- Secure, scalable, user-friendly experience

## Functional Requirements Summary

### User Side
- Register / Login
- Browse & search meals with nutrition info
- Cart & Order placement
- Order status tracking
- AI-powered food suggestions & nutrition Q&A

### Admin Side
- Manage food items (CRUD)
- User management (view, block, delete, promote)
- Order management & status updates

## Non-Functional Requirements

- **Performance** — Pages load < 3 seconds
- **Scalability** — Easy to add new meals / users / features
- **Security** — Encrypted passwords, role-based access control (RBAC)
- **Usability** — Clean, intuitive UI/UX for both users & admins
- **Maintainability** — Modular code structure, clear documentation

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)
- npm / yarn / pnpm
