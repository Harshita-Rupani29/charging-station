#  Charging Station Management System

A full-stack web application to manage EV charging stations. Includes user registration, login, token-based authentication, and CRUD operations for charging stations.

---

## Live URLs

- **Frontend**: [Charging Station Frontend](https://charging-station-frontend.onrender.com)  
- **Backend API**: [Charging Station Backend](https://charging-station-skuf.onrender.com)

---

##  Project Structure

### Frontend (Vue 3 + Vite)

Located in the `/frontend` folder.

**Key folders:**

- `src/components/` – Reusable UI components  
- `src/router/` – Vue Router configuration  
- `src/services/` – API interaction logic  
- `src/views/` – Page views  
- `App.vue`, `main.js` – Root app configuration  
- `style.css` – Global styles  


---

### Backend (Node.js + Express + MongoDB)

Located in the `/backend` folder.

**Key folders:**

- `models/` – Mongoose schemas/models  
- `routes/` – Express routes  
- `middlewares/` – Middleware functions  
- `services/` – Business logic  
- `db.js` – MongoDB connection  
- `index.js` – Server entry point  
- `.env` – Environment variables (JWT secret, MongoDB URI, etc.)

---

## Postman Testing Guide

> **Base URL:** `https://charging-station-skuf.onrender.com`

### Register a New User

**URL:** `POST /users`  
**Body:**
```json
{
  "firstName": "h",
  "lastName": "r",
  "email": "yourName@example.com",
  "password": "StrongPass123!"
}
```

---

### Login

**URL:** `POST /auth`  
**Body:**
```json
{
  "email": "yourName@example.com",
  "password": "StrongPass123!"
}
```

**Response:**
```json
{
  "data": "JWT_TOKEN_HERE",
  "message": "Logged in successfully"
}
```

> Use this token in the `Authorization` header as a **Bearer token** for all protected routes.

---

###  Logout

**URL:** `POST /auth/logout`  
**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

##  Protected Routes

> These require Bearer token authentication.

###  Get All Charging Stations

**URL:** `GET /services/stations`  
**Optional Query Params:**
- `status=active`
- `powerOutput=50`
- `connectorType=Type2`

**Response:**
```json
[
  {
    "_id": "station_id",
    "name": "Station A",
    "location": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716],
      "address": "MG Road, Bangalore"
    },
    "powerOutput": 50,
    "connectorType": "Type2",
    "status": "active"
  }
]
```

---

###  Get a Charging Station by ID

**URL:** `GET /services/stations/:id`

---

### Create a New Charging Station

**URL:** `POST /services/stations`  
**Body:**
```json
{
  "name": "Station A",
  "location": {
    "coordinates": [77.5946, 12.9716],
    "address": "MG Road, Bangalore"
  },
  "powerOutput": 50,
  "connectorType": "Type2",
  "status": "active"
}
```

---

###  Update Charging Station

**URL:** `PUT /services/stations/:id`  
**Body:**
```json
{
  "name": "Updated Station",
  "location": {
    "coordinates": [77.6000, 12.9600],
    "address": "Brigade Road, Bangalore"
  },
  "powerOutput": 60,
  "connectorType": "CCS2",
  "status": "inactive"
}
```

---

###  Delete Charging Station

**URL:** `DELETE /services/stations/:id`  
**Success Response:** `204 No Content`

---

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**
```
PORT=8080
DB=your_mongodb_atlas_url
JWTPRIVATEKEY=your_secret_jwt_key
SALT=10
```

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## License

**MIT License** – Free to use and modify.
