# 🌐 BuilderIO 
Website Builder Platform (Fullstack)

A powerful no-code, drag-and-drop website builder inspired by Wix and WordPress, built using the MERN stack with rich media handling, authentication, builder engine, and static site deployment.

# Buildio Server API Documentation

🌐 **Base URL:**  
`https://buildio-server.onrender.com`

---

## 📌 Authentication Routes

### Signup  
`POST /api/auth/signup`  
Request Body (JSON):  
```json
{
  "username": "user123",
  "email": "user@example.com",
  "fullname": "John Doe",
  "password": "password123"
}
```

### Login  
`POST /api/auth/login`  
Request Body (JSON):  
```json
{
  "emailOrUsername": "user@example.com",
  "password": "password123"
}
```

### Logout  
`POST /api/auth/logout`  
Headers:  
`Authorization: Bearer <accessToken>`

### Refresh Token  
`POST /api/auth/refresh-token`

### Forgot Password  
`POST /api/auth/forgot-password`  
Request Body (JSON):  
```json
{
  "email": "user@example.com"
}
```

### Reset Password  
`POST /api/auth/reset-password/:token`  
Replace `:token` with the reset token received via email.  
Request Body (JSON):  
```json
{
  "password": "newpassword123"
}
```

---

## 🔐 Google OAuth Routes

### Initiate Google Login  
`GET /api/auth/google`  
Redirects to Google OAuth consent screen.

### Google OAuth Callback  
`GET /api/auth/google/callback`  
- On success, redirects to:  
  `{FRONTEND_URL}/oauth-success?user=user@example.com`  
- On failure, redirects to:  
  `{FRONTEND_URL}/login`

---

## 📁 Media Routes

### Upload Media  
`POST /api/media/upload`  
Content-Type: `multipart/form-data`  
Form Data:  
- Key: `file` (File, required)

### Get All Media  
`GET /api/media/`

### Delete Media  
`DELETE /api/media/:mediaId`  
Replace `:mediaId` with the media ID to delete.

---

## 📄 Page Routes  
**(Protected – require `Authorization: Bearer <accessToken>` header)**

### Create Page  
`POST /api/pages/`  
Request Body (JSON):  
```json
{
  "name": "Sample Page",
  "siteId": "site123",
  "layout": {
    "type": "section",
    "children": [
      { "type": "heading", "props": { "text": "Welcome to Sample" } },
      { "type": "text", "props": { "text": "This is a sample page content." } }
    ]
  }
}
```

### Get Page by ID  
`GET /api/pages/:id`  
Replace `:id` with the Page ID.

### Update Page  
`PUT /api/pages/:id`  
Request Body (JSON):  
```json
{
  "name": "Updated Sample Page",
  "layout": {
    "type": "section",
    "children": [
      { "type": "heading", "props": { "text": "Updated Heading" } },
      { "type": "text", "props": { "text": "Updated text content." } }
    ]
  }
}
```

### Delete Page  
`DELETE /api/pages/:id`  
Replace `:id` with the Page ID.

---

## 🗂 Site Routes

### Create Site  
`POST /api/sites/`  
Request Body (JSON):  
```json
{
  "name": "Sample Site",
  "description": "This is a sample site description."
}
```

### Get All Sites for Logged-in User  
`GET /api/sites/`

### Get Site by ID  
`GET /api/sites/:id`  
Replace `:id` with the Site ID.

### Update Site  
`PUT /api/sites/:id`  
Request Body (JSON):  
```json
{
  "name": "Updated Site Name",
  "description": "Updated site description."
}
```

### Delete Site  
`DELETE /api/sites/:id`  
Replace `:id` with the Site ID.

---

## 🧩 Template Routes  
**(Protected – require `Authorization: Bearer <accessToken>` header)**

### Create Template  
`POST /api/templates/`  
Request Body (JSON):  
```json
{
  "name": "Sample Template",
  "components": {
    "type": "section",
    "props": {},
    "children": [
      {
        "type": "heading",
        "props": { "text": "Sample Heading" }
      },
      {
        "type": "button",
        "props": { "text": "Click Here", "link": "/sample" }
      }
    ]
  }
}
```

### Get Template by ID  
`GET /api/templates/:id`  
Replace `:id` with the Template ID.

### Update Template  
`PUT /api/templates/:id`  
Request Body:  
```json
{
  "name": "Updated Template",
  "components": {
    "type": "section",
    "props": {},
    "children": [
      {
        "type": "heading",
        "props": { "text": "Updated Heading" }
      },
      {
        "type": "button",
        "props": { "text": "Learn More", "link": "/updated" }
      }
    ]
  }
}
```

### Delete Template  
`DELETE /api/templates/:id`  
Replace `:id` with the Template ID.

---

## 👤 User Routes  
**(Protected – require `Authorization: Bearer <accessToken>` header)**

### Get My Profile  
`GET /api/users/me`

### Update Profile  
`PUT /api/users/update`  
Request Body (form data):  
```json
{
  "name": "New Name",
  "email": "new@example.com",
  "profilePic": "https://example.com/profile.jpg"
}
```

### Change Password  
`PUT /api/users/change-password`  
Request Body (JSON):  
```json
{
  "oldPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

### Get User Analytics  
`GET /api/users/analytics`

### Get Recent Media  
`GET /api/users/recent-media`

---

**Note:** For all protected routes, include the header:  
`Authorization: Bearer <accessToken>`  
where `<accessToken>` is the JWT obtained after login.

---

# Thank you for using Buildio API!


