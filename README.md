# CalScope - Smart Calorie Tracker & Meal Planner

> A modern, production-ready web application for tracking calories and planning meals with real-time nutritional data.

## ✨ Features

### 🔐 **Authentication & Authorization**
- User registration and login
- Secure JWT-based authentication
- Protected routes

### 🔍 **Smart Calorie Search**
- Real-time autocomplete powered by USDA FoodData Central
- Meal history log to display past calorie searches
- Debounced API calls for optimal performance
- Support for custom serving sizes (1-20 servings)
- Nutritional info contains dish name, serving size, toal calories, calories per serving and data source

### 📊 **Dashboard**
- Daily calorie tracking with progress visualization
- Weekly average calculations
- Total searches statistics
- Real-time goal tracking with progress bars
**(Note: Dashboard includes only dummy components due to time constraint)**

### 🍽️ **Meal Planning**
- Create multiple meal plans
- Weekly schedule (7 days)
**(Note: Adding a meal in plans is omitted because of time constraint)**

### 🎨 **UI/UX**
- Dark/Light mode toggle
- Fully responsive design (mobile-first)
- Modern gradient backgrounds
- Loading states and error handling

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand (with persist middleware)
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide React

### **Backend Integration**
- RESTful API communication
- JWT token management

### **Development Tools**
- ESLint + Prettier
- Docker + Docker Compose
- npm package manager

### **External APIs**
- USDA FoodData Central API (food database)
- Backend API (calorie calculation)

## 📸 Screenshots

## 🚀 Setup Instructions

### **Prerequisites**
- Node.js 20+ 
- npm
- Git

### **1. Install Dependencies**
```bash
npm ci
```

### **2. Configure Environment Variables**
```bash
cp .env.example .env
```

Add your USDA API key in .env file

**Get USDA API Key:** [https://fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html) (Free)

### **3. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### **5. Build for Production**
```bash
npm run build
npm start
```

## 🐳 Docker Setup
```bash
docker-compose up --build
```

Access at [http://localhost:3000](http://localhost:3000)

### **Stop Docker**
```bash
docker-compose down
```

## 🌍 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API endpoint | Yes | `http://localhost:8000` |
| `NEXT_PUBLIC_USDA_API_KEY` | USDA FoodData Central API key | Yes | `DEMO_KEY` |

## 🏗️ Design Decisions & Trade-Offs

### **Zustand Stores**
- `authStore`: JWT token (persisted to localStorage)
- `mealStore`: Search history (persisted to localStorage)
- `mealPlanStore`: Weekly meal plans (persisted)

### **Authentication Flow**
**Token Storage:** localStorage (via Zustand persist)
- ✅ Survives page refresh
- ✅ No additional setup needed
- ❌ Vulnerable to XSS (mitigated by Content Security Policy)

**Alternative considered:** HTTP-only cookies
- ✅ More secure (not accessible to JavaScript)
- ❌ Requires server-side middleware
- ❌ More complex setup

**Decision:** localStorage for simplicity in frontend-only app. For production, consider migrating to HTTP-only cookies with middleware.

**Debouncing:**
- Reduces API calls from ~10/sec to ~1 every 300ms
- Better UX (waits for user to stop typing)
- Respects API rate limits

## 🔗 Links

- **Live Demo:** [https://meal-calorie-frontend-bhavay-puri.vercel.app/](https://meal-calorie-frontend-bhavay-puri.vercel.app/)
---