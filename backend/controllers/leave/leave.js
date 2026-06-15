const Leave = require('../models/Leave'); 

exports.createLeave = async (req, res) => {
  const { studentId, startDate, endDate, reason } = req.body;

  if (!studentId || !startDate || !endDate || !reason) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (new Date(startDate) > new Date(endDate)) {
    return res.status(400).json({ error: 'startDate must be before endDate.' });
  }

  try {
    const leave = new Leave({ studentId, startDate, endDate, reason });
    await leave.save();
    res.status(201).json({ message: 'Leave request submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit leave request.' });
  }
};

exports.getLeavesByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const leaves = await Leave.find({ studentId });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave requests.' });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  const { leaveId } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Approved', 'Denied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );
    if (!leave) {
      return res.status(404).json({ error: 'Leave request not found.' });
    }
    res.status(200).json({ message: 'Leave status updated successfully.', leave });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leave status.' });
  }
};