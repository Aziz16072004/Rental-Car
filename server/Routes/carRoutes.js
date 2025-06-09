const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const upload = require('../middleware/upload'); // adjust path as needed

router.get('/getCars', carController.getCars);
router.post('/addCar' ,upload.single('image'), carController.addCar);
router.post('/addLikedCar' , carController.addLikedCar);
router.delete('/removeLikedCar' , carController.removeLikedCar);
router.delete('/deleteCar/:id' , carController.deleteCar);
router.get('/isCarLiked' , carController.isCarLiked);
router.get('/liked/:CustomerID', carController.getLikedCars);
router.put('/editCar/:id', upload.single('image'),carController.editCar);


module.exports = router;