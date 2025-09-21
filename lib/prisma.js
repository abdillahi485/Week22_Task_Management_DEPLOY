import { PrismaClient } from "@prisma/client";

// Create a global variable to store the Prisma client instance
// This prevents multiple instances during development with hot reload
const globalForPrisma = globalThis;

// Initialize Prisma client with connection error handling
const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'pretty',
});

// Test database connection on startup
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
    console.log('⚠️ App will continue without database connection');
  });

// In development, store the instance globally to prevent multiple instances
if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}

// Handle graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
