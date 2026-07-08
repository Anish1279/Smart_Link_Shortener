# Smart Link Shortener

A Bitly-style URL shortener with click analytics, rate limiting, and TTL-based link expiry. Built as a full-stack application with a React frontend and Node.js/Express backend.

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React, Material UI (MUI), Recharts      |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB (Mongoose ODM)                  |
| Auth      | JWT (jsonwebtoken + bcryptjs)           |

## Project Structure

```
smart-link-shortener/
├── .env.example              # Environment variable template
├── .gitignore
├── README.md
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js         # Entry point — loads env, connects DB, starts server
│       ├── app.js            # Express app — middleware stack + route mounting
│       ├── config/
│       │   └── db.js         # Mongoose connection logic
│       ├── models/
│       │   ├── User.js       # User schema (email, hashed password, name)
│       │   ├── Link.js       # Link schema (shortCode, longUrl, expiry, etc.)
│       │   └── ClickEvent.js # Click event schema (referrer, UA, ipHash)
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── linkRoutes.js
│       │   └── redirectRoutes.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── linkController.js
│       │   └── redirectController.js
│       ├── middleware/
│       │   ├── authMiddleware.js   # JWT verification
│       │   ├── errorHandler.js     # Centralized error handler
│       │   └── rateLimiter.js      # Sliding-window rate limiter
│       ├── utils/
│       │   ├── generateShortCode.js
│       │   └── hashIp.js
│       └── validators/
│           └── linkValidator.js
│
└── frontend/
    ├── package.json
    └── src/
        ├── App.js
        ├── index.js
        ├── api/
        │   └── axiosInstance.js    # Pre-configured axios client
        ├── components/
        │   ├── Layout/
        │   │   └── Navbar.js
        │   └── common/
        │       └── ProtectedRoute.js
        ├── context/
        │   └── AuthContext.js
        ├── hooks/
        │   └── useAuth.js
        ├── pages/
        │   ├── Login.js
        │   ├── Register.js
        │   ├── Dashboard.js
        │   ├── CreateLink.js
        │   └── Analytics.js
        ├── theme/
        │   └── theme.js          # MUI custom theme
        └── utils/
            └── constants.js
```

## Setup

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

```bash
# 1. Clone the repo
git clone <repo-url>
cd smart-link-shortener

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Install backend dependencies
cd backend
npm install

# 4. Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

```bash
# Terminal 1 — Start the backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Start the frontend (port 3000)
cd frontend
npm start
```

## API Overview

| Method | Endpoint                      | Auth     | Description                          |
|--------|-------------------------------|----------|--------------------------------------|
| POST   | `/api/auth/register`          | No       | Register a new user                  |
| POST   | `/api/auth/login`             | No       | Login and receive JWT                |
| POST   | `/api/links`                  | Yes      | Create a short link (rate-limited)   |
| GET    | `/api/links`                  | Yes      | List current user's links            |
| GET    | `/api/links/:id/analytics`    | Yes      | Get analytics for a specific link    |
| GET    | `/:code`                      | No       | Redirect to original URL + record click |

## Data Models

### Link
| Field       | Type     | Notes                        |
|-------------|----------|------------------------------|
| ownerId     | ObjectId | Reference to User            |
| longUrl     | String   | The original URL             |
| shortCode   | String   | Unique index, auto-generated |
| customAlias | String   | Optional user-chosen alias   |
| expiresAt   | Date     | Optional, TTL index          |
| isActive    | Boolean  | Soft-delete / deactivation   |
| createdAt   | Date     | Auto-generated               |

### ClickEvent
| Field     | Type     | Notes                          |
|-----------|----------|--------------------------------|
| linkId    | ObjectId | Reference to Link              |
| timestamp | Date     | When the click occurred        |
| referrer  | String   | HTTP referrer header           |
| userAgent | String   | Raw user-agent string          |
| ipHash    | String   | SHA-256 hash (never raw IP)    |
| country   | String   | Optional, geo-IP enrichment    |

## Milestones

1. **Auth + create/list links** — JWT login, DTO validation, unique short-code generation with collision retry
2. **Redirect + click recording** — Fire-and-forget click writes, user-agent parsing
3. **Analytics dashboard** — MongoDB aggregation pipelines → MUI charts with range filters
4. **Rate limiting + TTL + hot-link cache** — Throttle creation, TTL-based expiry, in-memory cache

## Implementation Details & Trade-offs

### Architecture & Trade-offs
- **Fire-and-forget Click Recording**: In the redirect controller, click tracking (`ClickEvent.create`) and click count incrementing (`$inc`) run asynchronously without blocking the main thread (`await` is deliberately omitted). This ensures minimal latency for end-users during redirects, with the trade-off that a database write failure might silently drop a click event.
- **302 (not 301) Redirects**: 301 redirects are heavily cached by browsers, which would bypass our click tracking for repeat visitors. A 302 temporary redirect forces browsers to hit our server every time.
- **Rate Limiting Placeholder**: While rate limiting is a stated milestone, the current `rateLimiter` middleware uses a dummy passthrough (`next()`). Implementing true rate limiting (e.g., with Redis) is pending to keep the MVP stack simple.
- **Real-time Aggregation vs Pre-aggregation**: Analytics (e.g., browser/device breakdown, clicks over time) are computed in real-time using heavy MongoDB `$facet` aggregation pipelines rather than pre-aggregating data periodically. This prioritizes real-time accuracy over read performance.
- **In-Memory Cache omitted**: Redirect lookups currently perform direct database queries (`Link.findOne`) rather than utilizing an in-memory cache layer. This trades read performance at scale for simplicity in the current implementation.
- **nanoid v3**: Used instead of v5 because v5 is ESM-only and this backend is built with CommonJS.

### Edge Cases Handled
- **Collision Resistance**: Shortcodes are generated using `nanoid(8)`, and explicit `while(!isUnique)` loops verify the code against the database to guarantee zero collisions upon generation.
- **Custom Alias Conflicts**: If a user requests a custom alias that already exists, the API gracefully rejects it with a 400 error rather than throwing a database duplicate key error.
- **Graceful Deactivation & TTL Expiry**: When processing redirects, the app strictly checks `!link.isActive` and `link.expiresAt`. If a link is soft-deleted or its TTL has expired, it renders a customized 410 Gone HTML page instead of failing silently or redirecting maliciously.
- **Privacy-Preserving IP Tracking**: Raw IP addresses are never stored. The system captures IPs (accounting for proxy headers like `x-forwarded-for`) and immediately hashes them via SHA-256 to allow unique-visitor tracking without violating privacy laws.
- **Robust User-Agent Parsing**: Browser and device derivations don't rely on massive external regex libraries. Instead, they use a streamlined MongoDB `$switch` aggregation at the DB level, handling missing user-agents and providing reliable fallbacks ("Other"/"Desktop").
