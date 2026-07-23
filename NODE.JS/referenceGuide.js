/* ============================================================================
 *                 NODE.JS BACKEND QUICK-REFERENCE GUIDE
 * ============================================================================
 * 
 * STEP 1: PREREQUISITES (TERMINAL)
 * ----------------------------------------------------------------------------
 * 1. Install Node.js LTS from https://nodejs.org/
 * 2. Verify installation in terminal:
 *    $ node -v
 *    $ npm -v
 * 
 * STEP 2: PROJECT INITIALIZATION (TERMINAL)
 * ----------------------------------------------------------------------------
 * $ mkdir my-api && cd my-api
 * $ npm init -y
 * 
 * STEP 3: PACKAGE.JSON CONFIGURATION
 * ----------------------------------------------------------------------------
 * Add `"type": "module"` to package.json to enable modern ES import/export syntax:
 * {
 *   "name": "my-api",
 *   "version": "1.0.0",
 *   "type": "module",
 *   "scripts": { "start": "node server.js" }
 * }
 * 
 * STEP 4: INSTALL DEPENDENCIES (TERMINAL)
 * ----------------------------------------------------------------------------
 * $ npm install express dotenv cors helmet express-rate-limit bcryptjs jsonwebtoken zod
 * 
 * STEP 5: ENVIRONMENT SETUP (.env FILE)
 * ----------------------------------------------------------------------------
 * Create a `.env` file in the root folder:
 * PORT=5000
 * JWT_SECRET=super_secret_key
 * NODE_ENV=development
 * 
 * ============================================================================
 * STEP 6: CORE SERVER REFERENCE TEMPLATE (server.js)
 * ============================================================================
 */

// 1. IMPORTS
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// 2. CONFIGURATION & INITIALIZATION
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 3. GLOBAL SECURITY & PARSING MIDDLEWARE
app.use(helmet());                             // Defensive security headers
app.use(cors());                               // Enable Cross-Origin requests
app.use(express.json());                       // Body parser for JSON
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 })); // Rate limiter

// 4. UTILITIES & ASYNC ERROR WRAPPER
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 5. ZOD SCHEMA VALIDATION MIDDLEWARE EXAMPLE
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return next(new AppError('Invalid request payload', 400));
  req.body = result.data;
  next();
};

// 6. SAMPLE AUTHENTICATION MIDDLEWARE
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new AppError('Unauthorized', 401));

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) return next(new AppError('Forbidden', 403));
    req.user = decoded;
    next();
  });
};

// 7. ROUTE EXAMPLES (MINIMAL ENDPOINTS)
app.post('/api/register', validate(userSchema), asyncHandler(async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET || 'secret');
  
  res.status(201).json({ status: 'success', token });
}));

app.get('/api/profile', protect, (req, res) => {
  res.status(200).json({ status: 'success', user: req.user });
});

// 8. GLOBAL ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// 9. START SERVER
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));

/* ============================================================================
 * STEP 7: START & TEST (TERMINAL)
 * ----------------------------------------------------------------------------
 * Run server:
 * $ npm start
 * 
 * Test Registration Endpoint (cURL):
 * $ curl -X POST http://localhost:5000/api/register \
 *     -H "Content-Type: application/json" \
 *     -d "{\"email\":\"user@test.com\",\"password\":\"123456\"}"
 * ============================================================================
 */
