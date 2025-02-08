const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Generate and serve API documentation.
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
require('dotenv').config();

// Initialize the Express app
const app = express();

connectDB();

// Enable Cross-Origin Resource
app.use(cors());

// Parse body request body as JSON objects
app.use(express.json());

// Define route for the API endpoints
app.use('/api/auth', authRoutes);

// Define Swagger settings: for security and API details
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 Auth API',
      version: '1.0.0',
      description: 'CSE341 Project 2 - CRUD with Authentication API documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

// Generate Swagger documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve /api-docs route for swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Run the app and define the port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started and running on port ${PORT}`));