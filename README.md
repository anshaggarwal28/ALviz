# AlViz

Created website that help users to learn and visualize algorithms using animations by applying P5.js
It allows ensures user safety by storing user credentials through the concept of hashing applied through passport .js. Backend is done in node.js and database through MongoDB. It's hosted on Heroku.

Tech Stack
Node.js

Framework: Express
Package Manager: npm (Node Package Manager)
Database

Database: MongoDB
ODM (Object Data Modeling): Mongoose
Authentication

Authentication Middleware: Passport.js
Password Handling: Passport-Local-Mongoose
Templating Engine

View Engine: EJS (Embedded JavaScript)
Session Management

Session Middleware: express-session
Body Parsing

Middleware: body-parser
Environment Variables

Package: dotenv
Static File Serving

Static Middleware: express.static
Project Details
Express: A minimalist web framework for Node.js, used to handle HTTP requests and responses.
EJS: A templating engine that allows you to generate HTML with JavaScript logic.
Mongoose: An ODM library for MongoDB, providing a schema-based solution to model your application data.
Passport.js: Middleware for authentication in Node.js, supporting various strategies like local authentication.
express-session: Middleware to handle sessions, allowing you to manage user sessions in a web application.
body-parser: Middleware to parse incoming request bodies in a middleware before your handlers, available under req.body.
File Structure
views/: Contains EJS template files like home.ejs, login.ejs, etc.
public/: Used for serving static files like CSS, JavaScript, and images.
app.js: Main entry point of the application where you configure and start the Express server.