require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
console.log('Auth routes loaded:', typeof authRoutes);
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/', (req, res) => res.send('API running...'));
app.get('/test', (req, res) => res.send('Server is running!'));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected!');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => console.error('MongoDB Connection Error:', err));
