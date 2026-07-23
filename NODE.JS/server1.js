/**
 * ============================================================================
 *               THE COMPLETE JOB-READY NODE.JS & EXPRESS MASTER CLASS
 * ============================================================================
 * 
 * MODULE INDEX:
 * 1. Node.js Globals & Built-in Modules (fs, path, process)
 * 2. Asynchronous Patterns (Promises, Async/Await, Non-blocking I/O)
 * 3. Security Fundamentals (Helmet, CORS, Rate-Limiting)
 * 4. Express Core Architecture & Middleware
 * 5. Input Validation with Zod (Production Data Hygiene)
 * 6. Business Logic & Layered Architecture (Services & Controllers)
 * 7. Authentication & Security (Bcrypt Hashing & JWT)
 * 8. Centralized Async Error Handling Architecture
 * 9. REST API Routes (Public & Protected Endpoints)
 * 10. Server Initialization & Graceful Shutdown
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Load environment variables immediately
dotenv.config();

// ============================================================================
// MODULE 1: NODE.JS GLOBALS & BUILT-IN MODULES
// ============================================================================
// Real-World Explanation: In modern ES Modules (import/export), __dirname and __filename 
// don't exist by default like they did in CommonJS (require). We reconstruct them using URL utilities.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('----------------------------------------------------');
console.log('📍 MODULE 1: Built-in Path & Process Information');
console.log(`Current File Path: ${__filename}`);
console.log(`Current Directory: ${__dirname}`);
console.log(`Node.js Engine Version: ${process.version}`);
console.log('----------------------------------------------------');

// Real-World Use of 'path': Safely join folder paths regardless of OS (Windows uses \, Mac/Linux uses /)
const logFilePath = path.join(__dirname, 'server.log');

// Real-World Use of 'fs': Non-blocking file logging system
fs.appendFile(logFilePath, `[${new Date().toISOString()}] Server process booted up.\n`, (err) => {
  if (err) console.error('Failed to write boot log:', err);
});

// ============================================================================
// MODULE 2: ASYNCHRONOUS PATTERNS & UTILITIES
// ============================================================================
// Real-World Explanation: Node.js runs on a single thread event loop. Blocking operations freeze 
// your whole backend for every user! Always use non-blocking async operations.

/**
 * Custom Operational Error Class
 * Real-World Explanation: Distinguishes between expected user errors (e.g., 404, bad input) 
 * and critical server bugs/crashes (500).
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Flag to identify trusted errors
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Higher-Order Async Wrapper (Eliminates repetitive try/catch blocks!)
 * Real-World Explanation: Senior devs wrap async route controllers so thrown errors 
 * automatically get forwarded to Express's global error handler.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ============================================================================
// MODULE 3: SECURITY HYGIENE & EXPRESS APP SETUP
// ============================================================================
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_development_secret';

// 1. Helmet: Hides Node signature headers and injects defensive HTTP security headers
app.use(helmet());

// 2. CORS: Restricts unauthorized domains from calling your API
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Body Parsing: Parses JSON data payload into `req.body`
app.use(express.json({ limit: '10kb' })); // Guard against huge payloads (DoS)

// 4. Express Rate Limiting: Limits abusive repeated requests per IP address
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per window
  message: { status: 'fail', message: 'Too many requests from this IP. Please try again after 15 minutes.' }
});

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// Custom Request Logger Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`[${req.method}] ${req.originalUrl} - ${req.requestTime}`);
  next();
});

// ============================================================================
// MODULE 4: MOCK DATABASE & REPOSITORY LAYER
// ============================================================================
// Real-World Explanation: In production, this layer is replaced with SQL/NoSQL ORMs 
// like Prisma, PostgreSQL (pg), or MongoDB (Mongoose).
const Database = {
  users: [],
  async findByEmail(email) {
    return this.users.find((u) => u.email === email);
  },
  async findById(id) {
    return this.users.find((u) => u.id === id);
  },
  async create(userData) {
    const newUser = { id: this.users.length + 1, ...userData, createdAt: new Date() };
    this.users.push(newUser);
    return newUser;
  }
};

// ============================================================================
// MODULE 5: SCHEMA VALIDATION WITH ZOD
// ============================================================================
// Real-World Explanation: Never trust incoming data! Validate and sanitize everything 
// before it hits your business logic layer.

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']).optional().default('user')
});

const LoginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(1, 'Password is required')
});

/**
 * Generic Validation Middleware Factory
 * Takes a Zod schema and validates req.body automatically
 */
const validateInput = (schema) => (req, res, next) => {
  const parseResult = schema.safeParse(req.body);
  
  if (!parseResult.success) {
    // Format Zod error messages into a human-readable format
    const issueMessages = parseResult.error.issues.map((issue) => issue.message).join(' | ');
    return next(new AppError(`Validation Failed: ${issueMessages}`, 400));
  }

  // Assign clean, stripped data back to req.body (prevents unwanted fields injection)
  req.body = parseResult.data;
  next();
};

// ============================================================================
// MODULE 6 & 7: BUSINESS SERVICES, AUTHENTICATION & SECURITY
// ============================================================================

/**
 * Authentication Middleware
 * Real-World Explanation: Verifies JSON Web Tokens (JWT) attached in HTTP Bearer headers.
 */
const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please provide a token to gain access.', 401));
  }

  // Verify token using secret
  const decodedPayload = jwt.verify(token, JWT_SECRET);

  // Check if user still exists in DB
  const currentUser = await Database.findById(decodedPayload.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // Attach user to Express request context for subsequent route handlers
  req.user = currentUser;
  next();
});

// Business Logic Service Layer
const AuthService = {
  async registerUser({ name, email, password, role }) {
    // 1. Check if user already exists
    const existing = await Database.findByEmail(email);
    if (existing) {
      throw new AppError('An account with this email already exists.', 400);
    }

    // 2. Hash Password (bcrypt salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save to DB
    const user = await Database.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 4. Generate Auth Token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Strip sensitive password field before returning
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  async loginUser({ email, password }) {
    // 1. Find User
    const user = await Database.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    // 2. Verify Hashed Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', 401);
    }

    // 3. Issue Token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
};

// ============================================================================
// MODULE 8 & 9: REST API ROUTES & ENDPOINTS
// ============================================================================

// Modular Router Instance
const apiRouter = express.Router();

// Health Check Endpoint
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Node.js API Service is operational.',
    timestamp: req.requestTime,
    uptimeSeconds: Math.floor(process.uptime())
  });
});

// POST /api/v1/auth/register
apiRouter.post(
  '/auth/register',
  validateInput(RegisterSchema),
  asyncHandler(async (req, res) => {
    const result = await AuthService.registerUser(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User account created successfully.',
      data: result
    });
  })
);

// POST /api/v1/auth/login
apiRouter.post(
  '/auth/login',
  validateInput(LoginSchema),
  asyncHandler(async (req, res) => {
    const result = await AuthService.loginUser(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Authentication successful.',
      data: result
    });
  })
);

// GET /api/v1/users/me (PROTECTED ROUTE)
apiRouter.get(
  '/users/me',
  protectRoute,
  asyncHandler(async (req, res) => {
    // Don't expose password hash
    const { password: _, ...cleanProfile } = req.user;
    res.status(200).json({
      status: 'success',
      data: { user: cleanProfile }
    });
  })
);

// Mount Modular Router on Versioned Base Path
app.use('/api/v1', apiRouter);

// 404 Route Handler for Unknown Paths
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find route ${req.originalUrl} on this server.`, 404));
});

// ============================================================================
// MODULE 10: CENTRALIZED ERROR HANDLING & SHUTDOWN
// ============================================================================

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // Detailed error trace for development debugging
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production Mode: Avoid leaking stack traces to potential attackers
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      // Critical Programming/Infrastructure Error
      console.error('CRITICAL SERVER ERROR 💥:', err);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error occurred.'
      });
    }
  }
});

// Start Server Listening
const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
  console.log(`⚙️ Running Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful Shutdown Handling (Handles SIGINT/SIGTERM from Docker / Hosting Providers)
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION! Shutting down gracefully...', reason);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully.');
  server.close(() => {
    console.log('Process terminated!');
  });
});
