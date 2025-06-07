const express = require('express')
const cors = require('cors')
require('dotenv').config()
const logger = require('morgan')
const connectDB = require('./db/connect')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')
const errorHandler = require('./middlewares/error-handler')

const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin
  credentials: true, // allow cookies
};

connectDB()
const app = express()
app.use(cors(corsOptions)) 
app.use(cookieParser());

// middleware
app.use(express.json())
app.use(logger('dev'))


// routes
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})