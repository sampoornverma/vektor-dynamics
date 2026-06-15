const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave');

router.post('/leaves', leaveController.createLeave);

router.get('/leaves/:studentId', leaveController.getLeavesByStudent);

router.put('/leaves/:leaveId', leaveController.updateLeaveStatus);

module.exports = router;