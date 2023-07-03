import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

// Create Express application
const app = express();

app.use(cors())

// Console Logging middleware
app.use(morgan("dev")); // Logs HTTP request details to the console

// JSON body parsing middleware
app.use(express.json()); // Parses incoming requests with JSON payloads

// Routes
app.use("/api/notes", notesRoutes); // Mounts notesRoutes as middleware at the "/api/notes" endpoint

// Middleware for handling not found endpoints
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found")); // Throws an error for unknown endpoints
});

// Error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error); // Logs the error to the console
  let errorMess = "An unknown error occurred";
  let statusCode = 500;
  
  if (isHttpError(error)) {
    statusCode = error.status; // Sets the status code based on the error
    errorMess = error.message; // Sets the error message based on the error
  }
  res.status(statusCode).json({ error: errorMess }); // Sends a JSON response with the error information
});

export default app;