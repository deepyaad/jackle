# Jackal

A modern full-stack web application built with React and MongoDB.

## Overview

Jackal is a comprehensive web platform that demonstrates modern full-stack development practices. The application features a responsive frontend built with React and a robust backend powered by Node.js and MongoDB.

## Features

- **User Authentication** - Secure login and registration system
- **Dynamic Content Management** - Real-time data updates and content management
- **Profile Management** - Comprehensive user profile system
- **Search & Discovery** - Advanced search functionality with filtering
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **Real-time Updates** - Live data synchronization across the platform

## Tech Stack

### Frontend
- **React** - Component-based UI library
- **React Router** - Client-side routing
- **Bootstrap/CSS** - Responsive styling and layout
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jackal.git
   cd jackal
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jackal
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the application**
   ```bash
   # Start backend server
   npm run server
   
   # Start frontend (in a new terminal)
   cd client
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
jackal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── public/
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── config/            # Configuration files
├── .env                   # Environment variables
└── package.json
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/search` - Search functionality
- `GET /api/content` - Get content data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## Acknowledgments

- Built with modern web development best practices
- Responsive design principles
- Security-first approach to authentication

---

© 2025 Jackal Project. All rights reserved.
