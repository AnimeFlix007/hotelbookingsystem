const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const hotelsRoutes = require('./routes/hotels')
const roomsRoutes = require('./routes/rooms')
const usersRoutes = require('./routes/users')
const cookieParser = require('cookie-parser')
const verifyToken = require('./utils/verify-token')
const HttpError = require('./utils/http-error')
const app = express()
dotenv.config()

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI)
        console.log('db connected : ' + connection.host);
    } catch (error) {
        return next(HttpError(error))
    }
}

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/rooms', roomsRoutes)
app.use('/api/hotels', hotelsRoutes)

app.use((err, req, res, next) => {
  if (res.headetSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal server error",
  });
});

app.listen(8800, ()=>{
    connectDb()
    console.log('server is running');
})