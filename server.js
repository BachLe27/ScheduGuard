const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

// Init middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ extended: false })); 

app.get('/', (req, res) => {
   res.send('API is running...');
})

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/student', require('./routes/api/student'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/location', require('./routes/api/location'));
app.use('/api/schedule', require('./routes/api/schedule'));


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
   console.log('server is running on port', PORT);
})