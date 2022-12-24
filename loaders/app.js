// Global App File

// Built in middlewares
// Path
const path = require("path");

// Third party middlewares
// Express
const express = require("express");

// App
const app = express();

// Compression
const compression = require("compression");

// Helmet
const helmet = require("helmet");

// Rate Limiter
const rateLimiter = require("express-rate-limit");

// MongoDB Sanitizer
const mongoDBSanitizer = require("express-mongo-sanitize");

// Hpp
const hpp = require("hpp");

// Cross Site Scripting cleaning
const xss = require("xss-clean");

// Cors
const cors = require("cors");

// Helmet csp
const csp = require("helmet-csp");

// Custom modules
// App Error
const AppError = require("../utils/appError");


// Routers
//User Routes
const userRoutes = require("../api/user/router");

//Class Routes
const classRoutes = require("../api/class/router");

// Use Third party middlewares
app.use(cors());
app.use(compression());
app.use(helmet());

app.use(mongoDBSanitizer());
app.use(xss());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(process.cwd(), "public")));

// Use routers
app.use("/api/v1/user", userRoutes);

// Class routers
app.use("/api/v1/class", classRoutes);

// Handle URL which don't exist
app.use("*", (req, res, next) => {
  return next(
    new AppError(
      `Unknown URL - ${req.protocol}://${req.get("host")}${req.originalUrl}`,
      404
    )
  );
});


// Export App
module.exports = app;
