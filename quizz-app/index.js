const express = require('express');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quizRoutes');
const app = express();
const cors = require('cors');
// Middleware for parsing JSON
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect("mongodb+srv://sujayv21:susri121@cluster0.9wnardq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Use quiz routes
app.use('/api', quizRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz Application!');
  });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
