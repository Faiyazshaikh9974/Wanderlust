# Wanderlust

Wanderlust is a full-stack web application for managing travel listings. Users can create, view, edit, and delete travel listings. The application supports user authentication, session management, and flash messaging for user feedback.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- CRUD operations for travel listings
- Session management and flash messaging for user feedback
- Middleware for error handling and validation
- Integration with MongoDB for data persistence

## Technologies Used

- **Frontend:** HTML, CSS, EJS (Embedded JavaScript)
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Authentication:** Passport.js with `passport-local-mongoose`
- **Session Management:** `express-session`
- **Flash Messages:** `connect-flash`


.
├── models
│   ├── listing.js
│   ├── review.js
│   └── userModel.js
├── routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views
│   ├── listings
│   │   ├── newlisting.ejs
│   │   ├── editlisting.ejs
│   │   └── showlisting.ejs
│   ├── partials
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── error.ejs
│   ├── login.ejs
│   └── register.ejs
├── public
│   ├── css
│   │   └── styles.css
│   └── js
│       └── scripts.js
├── utils
│   └── expressErrors.js
├── [app.js](http://_vscodecontentref_/0)
└── [package.json](http://_vscodecontentref_/1)


Routes
Listings:

GET /listings - View all listings
GET /listings/new - Form to create a new listing
POST /listings - Create a new listing
GET /listings/:id - View a specific listing
GET /listings/:id/edit - Form to edit a listing
PUT /listings/:id - Update a listing
DELETE /listings/:id - Delete a listing

Reviews:

POST /listings/:id/reviews - Add a review to a listing
DELETE /listings/:id/reviews/:reviewId - Delete a review
User:

GET /register - Form to register a new user
POST /register - Register a new user
GET /login - Form to log in
POST /login - Log in a user
GET /logout - Log out a user