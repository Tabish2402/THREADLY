import "../instruments.js" 
import express from "express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node"
const app = express();
app.use(express.json());
app.use(clerkMiddleware());

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});
// Test route
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
Sentry.setupExpressErrorHandler(app);

// Start server and connect to DB
const startServer = async () => {
  try {
    await connectDB();

    // In serverless environments like Vercel, listen is optional; Vercel handles it
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
