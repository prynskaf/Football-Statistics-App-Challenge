const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRouter = require('./api');
const routes = require('./routes');

const app = express();

// Define the view engine
app.set('view engine', 'ejs');

// Use the routers
app.use('/api', apiRouter);
app.use('/app', routes);

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the Football Statistics App');
});

// Connect to the database
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Atlas connected!');
  // Start the server after the database is connected
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
