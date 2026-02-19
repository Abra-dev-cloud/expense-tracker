# 💰 Expense Tracker

A modern, full-stack expense tracking application built with Next.js 14, PostgreSQL (Neon), and Tailwind CSS.

![Expense Tracker](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-green)

## 🚀 Features

- ✅ Add, view, and delete expenses
- ✅ Real-time total expense calculation
- ✅ Category-based expense organization
- ✅ Responsive and modern UI
- ✅ RESTful API architecture
- ✅ PostgreSQL database with Neon
- ✅ Type-safe with TypeScript
- ✅ Production-ready deployment

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon)
- **API:** Next.js API Routes (REST)
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ installed
- A Neon account (free tier available)
- Git installed
- Vercel account (for deployment)

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=your_neon_connection_string_here
   ```

4. **Set up the database:**
   
   Run this SQL in your Neon SQL Editor:
   ```sql
   CREATE TABLE expenses (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       title TEXT NOT NULL,
       amount NUMERIC(10, 2) NOT NULL,
       category TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
expense-tracker/
├── app/
│   ├── api/
│   │   └── expenses/
│   │       ├── route.ts          # GET, POST endpoints
│   │       └── [id]/
│   │           └── route.ts      # DELETE endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main UI
│   └── globals.css               # Global styles
├── lib/
│   └── db.ts                     # Database connection
├── .env.local                    # Environment variables (not in repo)
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Get All Expenses
```http
GET /api/expenses
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Groceries",
    "amount": 45.50,
    "category": "Food",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Add New Expense
```http
POST /api/expenses
Content-Type: application/json

{
  "title": "Coffee",
  "amount": 5.50,
  "category": "Food"
}
```

### Delete Expense
```http
DELETE /api/expenses/:id
```

## 🗄️ Database Schema

```sql
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `DATABASE_URL`
   - Click "Deploy"

3. **Your app is live!** 🎉

## 🌟 Features Showcase

- **Add Expenses:** Simple form to quickly add new expenses
- **View Total:** See your total spending at a glance
- **Delete Items:** Remove expenses you no longer need
- **Categories:** Organize expenses by type (Food, Transport, etc.)
- **Responsive Design:** Works on desktop, tablet, and mobile

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |

## 📝 Future Enhancements

- [ ] User authentication
- [ ] Monthly/yearly expense reports
- [ ] Data visualization with charts
- [ ] Budget limits and alerts
- [ ] Export to CSV
- [ ] Multi-currency support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Abraham**
- GitHub: https://github.com/Abra-dev-cloud
- LinkedIn: linkedin.com/in/abraham-cheruiyot/

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using Next.js and PostgreSQL**
