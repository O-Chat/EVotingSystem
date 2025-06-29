const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//load env variables
dotenv.config();
//connct to the db
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

//MIDDLEWARE FOR JSON Parsing
app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}  BODY:`, req.body);
//   next();
// });


//POST ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vote', require('./routes/vote'));
app.use('/api/vote-session', require('./routes/voting'));
app.use('/api/results', require('./routes/results'));


//START OF SERVER
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}.. YEH!!!`);
});