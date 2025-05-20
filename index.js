const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const workExpRoutes = require('./routes/workExperienceRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const app = express();

// Apply CORS middleware before defining routes
app.use(cors());
app.use(bodyParser.json());

// Apply CORS headers properly before defining routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, PATCH, DELETE, CONNECT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//replace mongo string with your db server
mongoose.connect('mongodb+srv://andikadiicky:Andika084360@capstonecluster.sdlfoob.mongodb.net/?retryWrites=true&w=majority&appName=CapstoneCluster').then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

app.use('/api/work-experiences', workExpRoutes);
app.use('/api/portfolios', portfolioRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
