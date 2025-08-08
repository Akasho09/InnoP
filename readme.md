# 🛒 E-Commerce Backend (TypeScript + Express + Prisma)

A complete backend for an e-commerce application, built with **TypeScript**, **Express**, **Prisma ORM**, and **PostgreSQL**.  
Includes authentication, product management, order management, and middleware for security.

---

## 📌 Features

- **User Authentication** (JWT-based)
- **Role-based Access Control** (Admin & Customer)
- **Product Management** (CRUD operations)
- **Order Management**  
  - Place Order  
  - List Orders (User/Admin)  
  - View Order Details  
  - Cancel Order (with stock restoration)
- **Stock Management**
- **Error Handling Middleware**
- **Secure Middleware**
  - Helmet
  - CORS
  - Morgan logger

---

## 📂 Project Structure

InnoPro/
├── src/
│ ├── controllers/
│ │ ├── auth.controller.ts
│ │ ├── product.controller.ts
│ │ └── order.controller.ts
│ ├── middlewares/
│ │ ├── auth.middleware.ts
│ │ └── error.middleware.ts
│ ├── prisma/
│ │ └── schema.prisma
│ ├── routes/
│ │ ├── auth.routes.ts
│ │ ├── product.routes.ts
│ │ └── order.routes.ts
│ ├── app.ts
│ └── server.ts
├── package.json
├── tsconfig.json
└── README.mdInnoPro/
├── src/
│ ├── controllers/
│ │ ├── auth.controller.ts
│ │ ├── product.controller.ts
│ │ └── order.controller.ts
│ ├── middlewares/
│ │ ├── auth.middleware.ts
│ │ └── error.middleware.ts
│ ├── prisma/
│ │ └── schema.prisma
│ ├── routes/
│ │ ├── auth.routes.ts
│ │ ├── product.routes.ts
│ │ └── order.routes.ts
│ ├── app.ts
│ └── server.ts
├── package.json
├── tsconfig.json
└── README.md



---
## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/inno-pro-backend.git
cd inno-pro-backend
```


### 2️⃣ Install dependencies
```yml
npm install
```

### 3️⃣ Install dev dependencies (TypeScript & types)
```bash

npm install --save-dev typescript ts-node-dev @types/node @types/express @types/cors @types/morgan @types/helmet

```

### 4️⃣ Setup environment variables
Create a .env file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
JWT_SECRET="yoursecretkey"
PORT=5000
```

### 5️⃣ Run Prisma migrations
```bash
npx prisma migrate dev --name init
```

### 6️⃣ Start development server
```bash

npm run dev

```

## 🛠 API Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |


| Method | Endpoint            | Description    |
| ------ | ------------------- | -------------- |
| GET    | `/api/products`     | List products  |
| POST   | `/api/products`     | Create product |
| PUT    | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |


| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| POST   | `/api/orders`            | Place an order         |
| GET    | `/api/orders`            | List user/admin orders |
| GET    | `/api/orders/:id`        | Get specific order     |
| PATCH  | `/api/orders/:id/cancel` | Cancel order           |


## 🧩 Tech Stack
Node.js + Express.js
TypeScript
Prisma ORM
PostgreSQL
JWT Authentication
Helmet & CORS
ts-node-dev for hot reload


## 🚀 Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Start dev server       |
| `npm run build` | Build TypeScript to JS |
| `npm start`     | Run production build   |



---

# 📜 License
MIT License © 2025 Akash Ahmad Malik