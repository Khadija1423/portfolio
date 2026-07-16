const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
