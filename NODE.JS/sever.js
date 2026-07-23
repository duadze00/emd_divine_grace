// *        ┌───────────────────────┐
// *        │                       │
// *     FRONTEND                BACKEND
// *        │                       │
// * HTML + CSS + JS             Node.js/Express.js
// *        │                       │
// *        │                    API Key
// *        │                       │
// *        │                       ▼
// *        │                 Weather API
// *        │                       │
// *        │                       ▼
// *        │                  Weather Data
// *        │                       │
// *        ◄───────────────────────┘

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Load Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// ==========================================
// 1. SECURITY & UTILITY MIDDLEWARE
// ==========================================

// Set security-related HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(cors({ origin: "http://localhost:3000" })); // Restrict to your frontend domain in production

// Parse incoming JSON payloads
app.use(express.json());

// Rate Limiting: Prevent abuse (max 100 requests per 15 mins per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "fail",
    message: "Too many requests, please try again later.",
  },
});
app.use("/api", limiter);

// ==========================================
// 2. IN-MEMORY DATABASE (Mocking ORM/Database)
// ==========================================
const usersDB = [];

// ==========================================
// 3. UTILITIES & CUSTOM ERROR HANDLING
// ==========================================

// Operational Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

// Higher-Order Async Handler (Eliminates try-catch blocks in route controllers)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <TOKEN>"

  if (!token) {
    return next(new AppError("Access denied. No token provided.", 401));
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return next(new AppError("Invalid or expired token.", 403));
    }
    req.user = decodedUser;
    next();
  });
};

// ==========================================
// 4. VALIDATION SCHEMAS (ZOD)
// ==========================================
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(2, "Name is required"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Middleware factory for validating schemas
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const formattedErrors = result.error.errors
      .map((err) => err.message)
      .join(", ");
    return next(new AppError(`Validation Error: ${formattedErrors}`, 400));
  }
  req.body = result.data; // Strips unexpected properties automatically
  next();
};

// ==========================================
// 5. ROUTE HANDLERS / CONTROLLERS
// ==========================================

// Public Route: User Registration
app.post(
  "/api/v1/auth/register",
  validate(registerSchema),
  asyncHandler(async (req, res, next) => {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = usersDB.find((user) => user.email === email);
    if (existingUser) {
      return next(new AppError("User with this email already exists.", 400));
    }

    // Hash Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save User to DB
    const newUser = {
      id: usersDB.length + 1,
      name,
      email,
      password: hashedPassword,
    };
    usersDB.push(newUser);

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(201).json({
      status: "success",
      data: {
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      },
    });
  }),
);

// Public Route: User Login
app.post(
  "/api/v1/auth/login",
  validate(loginSchema),
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Find User
    const user = usersDB.find((u) => u.email === email);
    if (!user) {
      return next(new AppError("Invalid email or password.", 401));
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password.", 401));
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      data: {
        token,
        user: { id: user.id, name: user.name, email: user.email },
      },
    });
  }),
);

// Protected Route: Get Profile
app.get(
  "/api/v1/users/me",
  authenticateToken,
  asyncHandler(async (req, res, next) => {
    const user = usersDB.find((u) => u.id === req.user.id);
    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user: { id: user.id, name: user.name, email: user.email },
      },
    });
  }),
);

// 404 Handler for undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ==========================================
// 6. GLOBAL ERROR HANDLING MIDDLEWARE
// ==========================================
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production Mode: Do not leak internal stack traces to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error("ERROR 💥:", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong on the server.",
      });
    }
  }
});

// ==========================================
// 7. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
