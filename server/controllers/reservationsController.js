const db = require('../config/db');


const approveReservation = (req, res) => {
  const { id } = req.params;
  const updateQuery = `UPDATE reservations SET status = "approved" WHERE ReservationID = ?`;
  db.query(updateQuery, [id], (updateErr) => {
    if (updateErr) {
      console.error("Database error:", updateErr);
      return res.status(500).json({ code: updateErr.code, message: updateErr.message });
    }
    res.send("status updated successfully");
  });

}
const rejectReservation = (req, res) => {
  const { id } = req.params;
  const updateQuery = `UPDATE reservations SET status = "rejected" WHERE ReservationID = ?`;
  db.query(updateQuery, [id], (updateErr) => {
    if (updateErr) {
      console.error("Database error:", updateErr);
      return res.status(500).json({ code: updateErr.code, message: updateErr.message });
    }
    res.send("status updated successfully");
  });

}
const getReservations = (req, res) => {
db.query('select R.*, C.*, U.*  from reservations R , cars C , users U where R.CustomerID=U.CustomerID and R.VehicleID = C.VehicleID', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
const reservationsForUser = (req, res) => {
  const customerId = req.query.customerId;  // get userId from query param

  if (!customerId) {
    return res.status(400).json({ error: 'Missing userId parameter' });
  }

  const query = `
    SELECT R.*, C.* 
FROM reservations R 
JOIN cars C ON R.VehicleID = C.VehicleID 
WHERE R.customerId = ?

  `;

  db.query(query, [customerId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

const addReservation = (req, res) => {
  const {
    customerID,
    vehicleID,
    startDate,
    endDate,
    pickupLocation,
    dropoffLocation
  } = req.body;
  console.log(req.body);
  
  const getPriceQuery = `SELECT DailyRate FROM Cars WHERE vehicleID = ?`;

  db.query(getPriceQuery, [vehicleID], (err, priceResults) => {
    if (err) return res.status(500).send(err);
    if (priceResults.length === 0) return res.status(404).send('Car not found');

    const DailyRate = priceResults[0].DailyRate;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total = diffDays * DailyRate;

    const insertQuery = `
      INSERT INTO Reservations 
        (CustomerID, VehicleID, StartDate, EndDate, Total, PickupLocation, DropoffLocation)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [customerID, vehicleID, startDate, endDate, total, pickupLocation, dropoffLocation],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Reservation added', reservationId: results.insertId, total });
      }
    );
  });
};

module.exports = {rejectReservation, approveReservation,getReservations ,reservationsForUser, addReservation };
