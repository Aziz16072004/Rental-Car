const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getUsers', userController.getUsers);
router.post('/addUser', userController.addUser);
router.post('/login', userController.loginUser);
router.put('/updateUser/:id', userController.updateUser);
router.put('/updatePassword/:id/', userController.changePassword);

module.exports = router;