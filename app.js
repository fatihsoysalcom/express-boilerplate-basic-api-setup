const express = require('express');
const app = express();
const port = 3000;

// --- BOILERPLATE FEATURE 1: Custom Request Logger Middleware ---
// This simulates a common utility provided by a boilerplate, 
// like a request logger or an authentication check, ready to use.
app.use((req, res, next) => {
  console.log(`[Boilerplate Logger] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next(); // Pass control to the next middleware/route handler
});

// --- BOILERPLATE FEATURE 2: Mock Database Connection Status ---
// In a real boilerplate, this might be a robust database connection pool 
// or a health check endpoint. Here, it's a simple mock to show a pre-configured check.
let dbConnected = true; // Simulate initial DB connection status

// Middleware to check mock DB status before accessing data routes
app.use('/api/data', (req, res, next) => {
  if (!dbConnected) {
    // If DB is not connected, immediately return an error, 
    // demonstrating pre-built error handling for common issues.
    return res.status(500).json({ message: 'Database connection unavailable (mock)' });
  }
  next();
});

// --- BOILERPLATE FEATURE 3: Example API Route ---
// A pre-defined route structure ready for business logic, saving setup time.
app.get('/api/data', (req, res) => {
  // Simulate fetching data from a database (this is where your core logic goes)
  const mockData = {
    id: 1,
    name: 'Boilerplate Item',
    description: 'This data comes from a pre-configured API route.',
    timestamp: new Date().toISOString()
  };
  res.json(mockData);
});

// --- BOILERPLATE FEATURE 4: Basic Error Handling Middleware ---
// A centralized error handler prevents crashes and provides consistent responses.
// This is crucial for production-ready applications and is often part of a boilerplate.
app.use((err, req, res, next) => {
  console.error('[Boilerplate Error Handler]', err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred.',
    // In a production environment, you might hide detailed error info
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start the server
app.listen(port, () => {
  console.log(`[Boilerplate Server] Server running on http://localhost:${port}`);
  console.log('Try visiting:');
  console.log(`- http://localhost:${port}/api/data`);
  console.log(`- (To simulate DB error, change 'dbConnected = true;' to 'dbConnected = false;' above and restart the server)`);
});
