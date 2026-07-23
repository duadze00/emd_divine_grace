/*
 * BACKEND ARCHITECTURE CHEAT SHEET
 * ----------------------------------------------------------------------------
 *
 * LAYER 1: CLIENT / FRONTEND
 * • Analogy   : The Customer
 * • Job       : Sends HTTP requests (GET, POST, PUT, DELETE) with JSON payloads.
 * • Tools     : Browser, Postman, Mobile Apps, Axios, Fetch API
 * • Code Example:
 *   fetch('/api/v1/users', { method: 'POST', body: JSON.stringify(data) })
 *
 * ----------------------------------------------------------------------------
 * LAYER 2: SECURITY LAYER
 * • Analogy   : Bouncers at the Door
 * • Job       : Sets defensive HTTP headers, blocks bad origins, caps request spam.
 * • Tools     : helmet, cors, express-rate-limit
 * • Code Example:
 *   app.use(helmet());
 *   app.use(cors());
 *   app.use(rateLimit({ max: 100 }));
 *
 * ----------------------------------------------------------------------------
 * LAYER 3: ROUTER LAYER
 * • Analogy   : The Receptionist
 * • Job       : Inspects URL + HTTP verb and routes request to correct controller.
 * • Tools     : express.Router()
 * • Code Example:
 *   const router = express.Router();
 *   router.post('/users', userController);
 *
 * ----------------------------------------------------------------------------
 * LAYER 4: VALIDATION LAYER
 * • Analogy   : ID / Ticket Inspector
 * • Job       : Sanitizes and checks req.body data before touching business logic.
 * • Tools     : zod, joi
 * • Code Example:
 *   const schema = z.object({ email: z.string().email() });
 *   schema.safeParse(req.body);
 *
 * ----------------------------------------------------------------------------
 * LAYER 5: CONTROLLER LAYER
 * • Analogy   : The Waiter
 * • Job       : Extracts req parameters, calls Service layer, returns HTTP status.
 * • Tools     : Express Request & Response objects (req, res)
 * • Code Example:
 *   const user = await UserService.createUser(req.body);
 *   res.status(201).json({ status: 'success', data: user });
 *
 * ----------------------------------------------------------------------------
 * LAYER 6: SERVICE LAYER
 * • Analogy   : The Kitchen / Chef
 * • Job       : Handles business logic, hashes passwords, executes database queries.
 * • Tools     : bcryptjs, jsonwebtoken, Prisma, Mongoose, PostgreSQL
 * • Code Example:
 *   const hash = await bcrypt.hash(password, 10);
 *   const newUser = await db.users.create({ ... });
 *
 * ----------------------------------------------------------------------------
 * LAYER 7: CENTRAL ERROR MIDDLEWARE
 * • Analogy   : The Safety Net
 * • Job       : Catches thrown errors, logs bugs, returns safe errors to user.
 * • Tools     : Custom AppError class, Express Error Middleware
 * • Code Example:
 *   app.use((err, req, res, next) => {
 *     res.status(err.statusCode || 500).json({ message: err.message });
 *   });
 */

// * ============================================================================
// * QUICK IMPLEMENTATION CODE
// * ============================================================================

import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const app = express();

// * LAYER 2: SECURITY
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// * LAYER 7: ERROR UTILITY
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// * LAYER 4: VALIDATION
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password too short"),
});

const validateInput = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(", ");
    return next(new AppError(`Validation Error: ${message}`, 400));
  }
  req.body = result.data;
  next();
};

// * LAYER 6: SERVICE (Database & Business Logic)
const UserService = {
  async register(userData) {
    return { id: 101, email: userData.email, createdAt: new Date() };
  },
};

// * LAYER 5: CONTROLLER (HTTP Handling)
const registerController = asyncHandler(async (req, res) => {
  const newUser = await UserService.register(req.body);
  res.status(201).json({ status: "success", data: { user: newUser } });
});

// * LAYER 3: ROUTER
const router = express.Router();
router.post("/users/register", validateInput(userSchema), registerController);

app.use("/api/v1", router);

// * LAYER 7: CENTRAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000"),
);
