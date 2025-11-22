# Copilot Instructions for StockSwift

These rules make AI agents productive immediately in this Next.js + MongoDB codebase. Keep guidance concrete and project-specific.

## Stack & Architecture
- Framework: Next.js 16 (app router) with React 19 and Tailwind CSS v4.
- API routes: `src/app/api/**/route.js` using Web Fetch API/Next Response in the App Router.
- Database: MongoDB via Mongoose 9; connection helper in `src/lib/db.js` with global cache to avoid dev hot-reload leaks.
- Models: In `src/models/**` exporting with `mongoose.models.Name || mongoose.model('Name', schema)` to prevent recompile errors.
- Path alias: `@/* -> ./src/*` (see `jsconfig.json`). Prefer this over long relative paths.

## Run & Environment
- Scripts (see `package.json`): `npm run dev`, `npm run build`, `npm start`, `npm run lint`.
- Required env (create `.env.local`):
  - `MONGODB_URI` (required by `src/lib/db.js` or app will throw on import)
  - `JWT_SECRET` (used by auth; see `src/app/api/auth/login/route.js`)
- Useful check: `GET /api/test-db` (file: `src/app/api/test-db/route.js`) verifies DB connectivity and logs host/status.
- Missing runtime deps used by code: add `bcryptjs` and `jsonwebtoken` to dependencies when implementing auth flows.

## Data & Models
- Example model: `src/models/User.js` fields: `name, email(unique), password, role(enum: admin|manager|staff)`, timestamps enabled.
- Pattern to reuse models across hot reloads:
  ```js
  export default mongoose.models.User || mongoose.model('User', UserSchema)
  ```

## Database Helper
- Use `connectDB()` from `src/lib/db.js` in every API route that touches Mongo:
  - Caches the connection on `global.mongoose` to avoid multiple clients.
  - Throws if `MONGODB_URI` is not defined.
  - Logs connection lifecycle events; do not duplicate listeners elsewhere.

## API Routes
- Location: `src/app/api/<segment>/route.js`. Export HTTP verb functions, e.g. `export async function POST(request) { ... }`.
- Response utilities:
  - Prefer `NextResponse.json(...)` from `next/server` for consistency (see `auth/login`).
  - `Response.json(...)` also works (used in `test-db`) but keep one style per route.
- Auth login example: `src/app/api/auth/login/route.js`
  - Connects DB, fetches `User`, compares password with `bcryptjs.compare`, and signs JWT via `jsonwebtoken` using `JWT_SECRET`.
- Signup route implemented at `src/app/api/auth/signup/route.js`: validates input, hashes via `bcryptjs.hash`, creates user, signs JWT, and returns `{ token, user }`.
 - Session endpoints:
   - `POST /api/auth/logout` clears the HttpOnly JWT cookie.
   - `GET /api/auth/me` verifies JWT and returns the current user.

## Frontend Patterns
- Client components: pages under `src/app/**` that interact with browser APIs begin with `'use client'` (e.g., `login/page.jsx`, `signup/page.jsx`).
- State: Local component state only; no global state or auth provider exists. Tokens are stored in `localStorage` by login/signup pages.
- Navigation/UI:
  - Navbar `src/app/components/navbar.js` highlights active route via `usePathname()` and provides an Operations menu.
  - UI styling uses Tailwind v4 imported in `src/app/globals.css` via `@import "tailwindcss";` — no Tailwind config file present.

## Conventions & Gotchas
- Imports: Use the alias form, e.g. `import { connectDB } from '@/lib/db'` and `import User from '@/models/User'`.
  - Note: `src/app/api/test-db/route.js` currently uses a relative import; prefer updating to alias for consistency.
- Always call `await connectDB()` before Mongoose ops; the helper is idempotent and caches connections.
- Error handling: Return JSON with `{ message }` and appropriate status codes (401 for auth errors, 500 for server errors) as shown in `auth/login`.
- JWT storage: Currently saved to `localStorage` with no middleware/guards. Any new protected API should verify the `Authorization: Bearer <token>` header with `jsonwebtoken.verify`.
- Session cookies: Login and signup set an HttpOnly cookie `token` for server-side verification. Protected routes can accept either `Authorization: Bearer <token>` or the `token` cookie.
- Dependencies: If you use `bcryptjs` or `jsonwebtoken`, ensure they are installed since they aren’t in `package.json` yet.
 - i18n: Simple in-app localization via `I18nProvider` (`src/app/components/i18n-provider.js`) and dictionaries in `src/lib/i18n.js`. Use `const { t } = useI18n()` in client components and replace static strings with `t('key')`. Toggle language through the navbar button (currently EN / HI). Add keys by extending dictionaries—fallback is English.

## Common Tasks (Examples)
- Add a new API route:
  - File: `src/app/api/items/route.js`
  - Pattern: `import { NextResponse } from 'next/server'; import { connectDB } from '@/lib/db';` then `await connectDB()` and return `NextResponse.json(...)`.
- Add a new model:
  - File: `src/models/Item.js`; export with the `mongoose.models || mongoose.model` pattern.
- Use the DB in a route:
  - `const conn = await connectDB(); const doc = await Model.find(...);`
 - Protect an API route:
   - Import `{ authenticateRequest }` from `@/lib/auth`, call it with `request`, return 401 if `!ok`, otherwise use `payload.userId`.
   - Localize a component:
     - `import { useI18n } from '@/app/components/i18n-provider'` then `const { t } = useI18n();` and replace text: `<h1>{t('dashboard')}</h1>`.

## Build, Lint, Debug
- Dev server (Windows cmd):
  ```bat
  npm install
  npm run dev
  ```
- Lint:
  ```bat
  npm run lint
  ```
- If env vars are needed temporarily for a single command in cmd.exe:
  ```bat
  set MONGODB_URI=mongodb+srv://... & set JWT_SECRET=yoursecret & npm run dev
  ```

Questions or gaps? Ask about env values, desired auth behavior (guards/refresh), or whether to implement the missing signup API.


Extra Context : 

Here is a comprehensive **Project Context** file (`PROJECT_CONTEXT.md`). This document serves as the "Source of Truth" for the application, combining the business requirements from the PDF with the technical and design decisions made during our conversation.

***

# Project Context: StockSwift

## 1. Executive Summary
**StockSwift** is a modular Inventory Management System (IMS) built to digitize and streamline stock-related operations. [cite_start]It replaces manual registers and scattered Excel sheets with a centralized, real-time web application[cite: 4, 5].

The system serves as a "Single Source of Truth" for inventory, tracking items from vendor receipt to customer delivery, including internal movements and physical reconciliation.

## 2. Target Audience
* [cite_start]**Inventory Managers:** Responsible for high-level oversight, managing incoming/outgoing flows, and maintaining stock accuracy[cite: 9].
* [cite_start]**Warehouse Staff:** Responsible for execution tasks such as physical shelving, picking items for delivery, and performing stock counts[cite: 10].

## 3. Technical Architecture
* **Framework:** Next.js (App Router)
* **Language:** JavaScript (No TypeScript)
* **Styling:** Tailwind CSS
* **Design System:** "Midnight Slate" (Premium Dark Mode)
    * *Backgrounds:* `#020617` (Slate 950) & `#0f172a` (Slate 900).
    * *Borders:* Subtle matte borders (`border-slate-800`).
    * *Accents:* Indigo (Primary), Emerald (Success/In), Rose (Danger/Out), Amber (Warning).

## 4. Core Functional Modules

### A. Product Management
Centralized database of all inventory items.
* [cite_start]**Data Points:** Name, SKU/Code, Category, Unit of Measure (UoM), and Cost [cite: 46-50].
* **Features:** Smart search, category filtering, and stock level visualization.

### B. Receipts (Incoming Stock)
Process for handling goods arriving from vendors.
* [cite_start]**Logic:** Validating a Receipt **increases (+)** the On-Hand quantity[cite: 59].
* [cite_start]**Example:** Receive 50 units of "Steel Rods" $\rightarrow$ Stock +50[cite: 61].

### C. Delivery Orders (Outgoing Stock)
Process for handling goods leaving for customers.
* [cite_start]**Logic:** Validating a Delivery Order **decreases (-)** the On-Hand quantity[cite: 67].
* [cite_start]**Steps:** Pick $\rightarrow$ Pack $\rightarrow$ Validate [cite: 65-67].

### D. Internal Transfers
Process for moving stock inside the company (e.g., Warehouse A $\rightarrow$ Warehouse B, or Shelf 1 $\rightarrow$ Shelf 2).
* [cite_start]**Logic:** Total stock value remains unchanged; only the *location* data updates[cite: 95].
* [cite_start]**Traceability:** Every movement is logged in the ledger[cite: 76].

### E. Stock Adjustments
Process for reconciling system data with physical reality (e.g., lost items, damages).
* **Logic:** User inputs "Counted Quantity" vs "System Quantity". [cite_start]The system calculates the difference and updates the ledger [cite: 81-84].
* **Visuals:** Discrepancies are highlighted in Red (Loss) or Green (Gain).

## 5. Application Pages & UI Specifications

### **1. Dashboard (`/dashboard`)**
* [cite_start]**Purpose:** A "Command Center" snapshot of operations[cite: 16].
* [cite_start]**KPI Header:** Total SKU, Total Value, and **Low Stock Alerts**[cite: 19].
* **Action Cards:** Large, clickable cards for "Receipts," "Deliveries," and "Transfers" showing:
    * *Late:* Scheduled date < Today (Urgent/Red).
    * *Waiting:* Awaiting availability (Amber).
    * *Scheduled:* Future operations.
* **Analytics:** Graphs showing Stock Value Trend and Category Distribution.

### **2. Move History (`/dashboard/history`)**
* **Purpose:** A ledger of all stock movements.
* [cite_start]**Views:** Toggle between **List View** (Table) and **Kanban View** (by Status)[cite: 25].
* **Visual Logic:**
    * **IN Moves:** Glow Emerald Green.
    * **OUT Moves:** Glow Rose Red.
    * **INTERNAL:** Glow Indigo Blue.

### **3. Stock View (`/dashboard/stock`)**
* **Purpose:** Real-time list of "On Hand" inventory.
* **Calculated Fields:**
    * `Free to Use` = `On Hand` - `Reserved` (Items in 'Waiting' deliveries).
* **Features:**
    * **Visual Progress Bar:** Shows stock level relative to Reorder Point.
    * **Quick Edit:** Slide-down mechanism to update stock counts instantly without leaving the page.

### **4. Adjustments (`/dashboard/adjustments`)**
* **Purpose:** Cycle counting and error correction.
* **Features:**
    * **"Start Count" Wizard:** A focused UI for warehouse staff to enter physical counts.
    * **Variance Tracking:** Highlights the financial impact of lost/found stock.

## 6. Inventory Lifecycle Example
[cite_start]The system must support this specific flow [cite: 90-100]:
1.  **Receive:** 100kg Steel arrives (Stock +100).
2.  **Transfer:** Move to Production Rack (Location update).
3.  **Deliver:** Ship 20kg to customer (Stock -20).
4.  **Adjust:** Find 3kg damaged (Stock -3).

---