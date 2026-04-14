/**
 * Optimized Startup Script for cPanel (Shared Hosting)
 * This script bridges to the Next.js standalone server for 
 * better performance and lower memory usage.
 */

// Set production environment automatically
process.env.NODE_ENV = 'production';

// Import the standalone server entry point
// Next.js generates this when 'output: standalone' is set in next.config.mjs
require('./.next/standalone/server.js');
