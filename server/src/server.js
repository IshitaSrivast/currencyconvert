const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/apiRoutes');

// Initialize Express application
const app = express();

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// HTTP request logging middleware for node.js
app.use(morgan('tiny')); // 'tiny' gives minimal output

const port = 5000;

// Mount the API routes on the '/api' path
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
