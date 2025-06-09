require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes =require("./Routes/userRoutes")
const reservationsRoutes =require("./Routes/reservationRoutes")
const carRoutes =require("./Routes/carRoutes")
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reservations', reservationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});