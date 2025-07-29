/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("✅ Database is Connected Successfully");
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

// Unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log("Unhandle Rejection detected... Server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaught rejection error
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Signal termination error
process.on("SIGTERM", () => {
  console.log("SIGTERM Signal received... Server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// SIGINT -> manually server shutting down
process.on("SIGINT", () => {
  console.log("SIGINT Signal received... Server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("I forgot to catch this promise"))
// throw new Error("I forgot to handle this local error")
