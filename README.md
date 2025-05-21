# ETGram MERN Stack Social Network Backend

## Overview
ETGram is a social network backend built using the MERN stack (MongoDB, Express, React, Node.js). It provides a RESTful API for user management, authentication, and post management.

## Features
- User registration and login
- User profile management (update, delete, follow/unfollow)
- Post creation, update, deletion, and interaction (like/dislike)
- Timeline and profile post retrieval
- File upload support for images

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: bcrypt for password hashing
- **Middleware**: cors, helmet, morgan, multer (for file uploads)
- **Development**: nodemon for auto-reloading

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- npm or yarn

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ETGram-mern-stack-social-network-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URL=<your-mongodb-connection-string>
   ```
4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   The server will run on http://localhost:8800.

## API Endpoints

### Authentication
- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login a user

### Users
- **GET /api/users**: Get a user by ID or username
- **PUT /api/users/:id**: Update a user
- **DELETE /api/users/:id**: Delete a user
- **GET /api/users/friends/:userId**: Get a user's friends
- **PUT /api/users/:id/follow**: Follow a user
- **PUT /api/users/:id/unfollow**: Unfollow a user
- **GET /api/users/all**: Get all users

### Posts
- **POST /api/posts**: Create a new post
- **PUT /api/posts/:id**: Update a post
- **DELETE /api/posts/:id**: Delete a post
- **PUT /api/posts/:id/like**: Like or dislike a post
- **GET /api/posts/:id**: Get a post by ID
- **GET /api/posts/timeline/:userParam**: Get timeline posts
- **GET /api/posts/profile/:username**: Get all posts by a user

### File Upload
- **POST /api/upload**: Upload an image file

## Models

### User
- username (String, required, unique)
- email (String, required, unique)
- password (String, required)
- profilePicture (String, default: "")
- coverPicture (String, default: "")
- followers (Array, default: [])
- followings (Array, default: [])
- isAdmin (Boolean, default: false)
- desc (String, max: 50)
- city (String, max: 50)
- from (String, max: 50)
- relationship (Number, enum: [1, 2, 3])
- displayName (String)
- dateOfBirth (Date)
- timestamps (createdAt, updatedAt)

### Post
- userId (String, required)
- desc (String, max: 500)
- img (String)
- likes (Array, default: [])
- timestamps (createdAt, updatedAt)

## Environment Variables
- `MONGO_URL`: MongoDB connection string

## .gitignore
- `.env`: Environment variables file

## License
ISC 