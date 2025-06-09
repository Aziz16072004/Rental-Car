require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes =require("./Routes/userRoutes")
const reservationsRoutes =require("./Routes/reservationRoutes")
const carRoutes =require("./Routes/carRoutes")
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/reservations', reservationsRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
