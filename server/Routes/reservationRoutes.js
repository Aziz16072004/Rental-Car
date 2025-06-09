const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');

router.get('/getReservations', reservationsController.getReservations);
router.post('/addReservation', reservationsController.addReservation);
router.get('/reservationsForUser', reservationsController.reservationsForUser);
router.put('/approveReservation/:id', reservationsController.approveReservation);
router.put('/rejectReservation/:id', reservationsController.rejectReservation);

module.exports = router;