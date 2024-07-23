# Admin Panel

## Project Description

This project is a web application designed for managing various aspects of a product catalog, including categories, subcategories, and products. It provides functionalities for authentication, and CRUD (Create, Read, Update, Delete) operations on categories, subcategories, and products. The application has both frontend and backend components, each fulfilling specific roles in the overall system.

## Frontend

The frontend of the application is built using React and provides a user-friendly interface for managing categories, subcategories, and products. The key features and functionalities include:

- **Login & Authentication**: Users can log in, sign up, and reset their passwords.
- **Dashboard**: A central area for navigating through the application.
- **Category Management**: Users can view, add, edit, and manage categories.
- **Subcategory Management**: Users can view, add, edit, and manage subcategories, with each subcategory associated with a category.
- **Product Management**: Users can view, add, edit, and manage products, with each product associated with a category and subcategory.
- **Image Upload**: Allows uploading and previewing images for categories and products.
- **Private Routes**: Certain routes are protected and accessible only to authenticated users.

## Backend

The backend is built using Node.js with Express.js and provides RESTful APIs for the frontend to interact with. The key features and functionalities include:

- **Authentication**: Handles user registration, login, and password management.
- **Category API**: Endpoints for CRUD operations on categories.
- **Subcategory API**: Endpoints for CRUD operations on subcategories.
- **Product API**: Endpoints for CRUD operations on products.
- **File Upload**: Handles image uploads and serves them to the frontend.

## Tech Stack

- **Frontend**:

  - React
  - React Router
  - Bootstrap

- **Backend**:
  - Node.js
  - Express.js
  - MySQL (via Sequelize ORM)
  - Multer (for file uploads)
  - JSON Web Token (JWT) for authentication

## Installation and Setup

### Frontend

**1. Navigate to the frontend directory**:

```bash
cd frontend
npm install
```

**2. in the frontend directory and add the baseurl in utils/axiosInstance.jsx.**

```
 BaseURL: 'http://localhost:5000'
```

**3. Start the frontend**:

```
 npm run dev
```

### Backend

**1. Navigate to the Backend directory**:

```
cd backend
npm install
```

**2. Start the backend**

```
 npm run start
```

## .env Configuration

Below are the environment variables used in this project. Ensure you have a `.env` file in your root directory with the following variables:

```env
DB_NAME==
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
JWT_SECRET=
EMAIL=
EMAIL_PASSWORD=
```

## Notes

- **Routes**:
  - The frontend uses `react-router-dom` for routing.
  - The backend APIs are protected with JWT authentication.
  - The reset password route is configured for token-based access.
