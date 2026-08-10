# PaperNova Industries

### Full-Stack E-Commerce & Business Management Platform

PaperNova Industries is a full-stack web application for a paper products business, featuring a dynamic product catalog, customer ordering system, and admin dashboard for managing products, customers, orders, and inquiries.

## 🌐 Live Demo

- **Website:** [papernova-industries.vercel.app](https://papernova-industries.vercel.app/)
- **GitHub:** [github.com/OmveerSingh01/papernova-industries](https://github.com/OmveerSingh01/papernova-industries)

---

## ✨ Features

### Customer
- User registration and login
- Browse products and categories
- Product details with images
- Shopping cart
- Checkout and order placement
- View order history
- Contact/inquiry submission

### Admin
- Secure admin authentication
- Dashboard with business overview
- Product and category management
- Add/edit products and prices
- Product image uploads
- Stock management
- Customer management
- Order management and status updates
- Inquiry management

---

## 🛠️ Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS

**Backend**
- Next.js API Routes
- REST APIs
- JWT Authentication
- Zod Validation

**Database & Storage**
- PostgreSQL
- Prisma ORM
- Supabase Storage

**Deployment**
- Vercel

---

## 🏗️ Project Structure

```text
papernova-industries/
├── app/
│   ├── admin/
│   ├── api/
│   ├── cart/
│   ├── checkout/
│   ├── login/
│   ├── orders/
│   ├── products/
│   └── register/
│
├── components/
│   ├── admin/
│   ├── layout/
│   ├── sections/
│   └── ui/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
└── public/
```

---

## 🔐 Authentication

The application includes:

- JWT-based authentication
- Protected customer routes
- Protected admin routes
- Role-based access control
- Zod request validation
- Environment-based secret management

Sensitive credentials are stored in environment variables and are not committed to the repository.

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/OmveerSingh01/papernova-industries.git
cd papernova-industries
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_database_url"
DIRECT_URL="your_direct_database_url"
JWT_SECRET="your_jwt_secret"

ADMIN_NAME="your_admin_name"
ADMIN_EMAIL="your_admin_email"
ADMIN_PASSWORD="your_admin_password"

NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

### Run Prisma

```bash
npx prisma generate
npx prisma migrate deploy
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production

Build the application:

```bash
npm run build
```

The production application is deployed on [Vercel](https://vercel.com/).

---

## 🔮 Future Improvements

- Online/UPI payments
- Email notifications
- Product reviews and ratings
- Wishlist
- Coupon/discount system
- Sales analytics
- Invoice generation

---

## 👨‍💻 Developer

**Omveer Singh**
B.Tech – Computer Science & Engineering

[GitHub](https://github.com/OmveerSingh01) • [LinkedIn](https://linkedin.com/in/omveersingh09)

---

### 🌟 PaperNova Industries 🌟

*Manufacturing Excellence. Delivering Trust.*

Crafted with care, delivered with pride — explore our products today.
