const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const authenticateToken = require('./middleware/authMiddleware');
const cors = require("cors");
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();
app.use(cors());
// Middleware
app.use('/api/products', authenticateToken);
app.use('/api/products/multiple', authenticateToken);
app.use('/api/invoices', authenticateToken);
app.use('/api/auth/current', authenticateToken);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
