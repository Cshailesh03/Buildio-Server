# 🌐 BuilderIO 
Website Builder Platform (Fullstack)

A powerful no-code, drag-and-drop website builder inspired by Wix and WordPress, built using the MERN stack with rich media handling, authentication, builder engine, and static site deployment.

# 📦 Tech Stack
    # Frontend
React.js

Redux/Context API

React Router

Axios

Tailwind CSS / styled-components

Craft.js / GrapesJS / React DnD (for builder)

Chart.js / Recharts (for analytics)

    # Backend
Node.js, Express.js

MongoDB (Mongoose ODM)

Cloudinary (media storage)

JWT (auth & refresh tokens)

Passport.js (Google OAuth)

Nodemailer (email services)

🔐 Authentication & Authorization
Signup / Login (JWT access + refresh tokens)

Google OAuth2 login via Passport.js

Forgot/Reset Password (secure token-based)

Role-based access control (admin/user)

Protected API routes with middleware

🧰 Core Features
✅ User Auth
/api/auth/signup — User registration

/api/auth/login — Local login

/api/auth/google — Google login via Passport

/api/auth/forgot-password → /reset-password — Secure reset flow

/api/auth/logout — Session termination

🌍 Site & Page Management
Create/edit/delete sites and pages

Dynamic routing per site/page

Site/page form components

APIs:

POST /api/sites

GET/PUT/DELETE /api/sites/:siteId

POST /api/sites/:siteId/pages

GET/PUT/DELETE /api/sites/:siteId/pages/:pageId

🧱 Visual Page Builder
Drag-and-drop UI

Layout saved as JSON (layoutTree)

Undo/Redo support

Live styling of components

APIs:

GET /api/sites/:siteId/pages/:pageId/layout

PUT /api/sites/:siteId/pages/:pageId/layout

🖼️ Media Management
Upload via Cloudinary

View, preview, delete files

Tagging, categorization

APIs:

POST /api/media/upload

GET /api/media

DELETE /api/media/:mediaId

🚀 Static Site Generation & Deployment
Publish to Netlify/S3 via backend

Add subdomain/custom domain

SSL support

APIs:

POST /api/sites/:siteId/publish

POST /api/sites/:siteId/domain

🔌 Plugin & Widget Management
Add third-party widgets

Drag-and-drop support

Admin-only plugin creation

APIs:

GET /api/plugins

POST /api/plugins

🎨 Theme Management
Choose or create custom themes

Apply global styles across site

APIs:

GET /api/themes

POST /api/sites/:siteId/theme

🛠️ Admin Panel & Analytics
View users, sites, plugin usage

Media storage stats

Real-time dashboard with metrics

APIs:

GET /api/admin/users

GET /api/admin/sites

GET /api/admin/plugins/usage

# 🗂️ Project Structure (Backend)
bash
Copy
Edit
/config        - Env & DB config
/controllers   - Route logic
/models        - Mongoose schemas
/routes        - API routes
/middleware    - Auth, roles, validation
/services      - Core business logic (auth, media, etc.)
/templates     - Email templates
/jobs          - Background jobs (e.g., cleanup)
🚀 Getting Started
Prerequisites
Node.js, MongoDB, Cloudinary credentials

Google OAuth credentials

Netlify/S3 credentials (for publishing)

Installation
bash
Copy
Edit
git clone https://github.com/Cshailesh03/Buildio-Server
cd backend
npm install
npm run dev

# In a separate terminal:
cd ../frontend
npm install
npm start
📁 Environment Variables
Create .env in /backend and /frontend with the following:

Backend
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client
GOOGLE_CLIENT_SECRET=your_google_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
Frontend
bash
Copy
Edit
REACT_APP_API_BASE=http://localhost:5000/api
🧪 Testing
Use Postman to test protected routes.

Trigger full OAuth login using /api/auth/google (opens Google consent screen).

Ensure email delivery via logs/real mailbox.

