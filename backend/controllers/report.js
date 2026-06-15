import Report from '../models/report.model.js';
import { uploadImage } from '../util/cloud.js';

// Get reports (filterable by hostelName)
export const getReports = async (req, res) => {
  const { hostelName, mine } = req.query;
  
  let query = {};
  if (hostelName) {
    query.hostelName = hostelName;
  }

  if (req.user.role === 'attendant' && mine === 'true') {
    query.attendantId = req.user.userId;
  }

  try {
    // Attendants can see everything for their hostel, Students can see reports for the filtered hostel
    const reports = await Report.find(query)
      .populate('attendantId', 'name email')
      .sort({ createdAt: -1 });
      
    res.status(200).json({ reports, count: reports.length });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Create a report (Only for attendants)
export const createReport = async (req, res) => {
  if (req.user.role !== 'attendant') {
    return res.status(403).json({ msg: 'Only attendants can create reports' });
  }

  const { text, hostelName, imageUrl } = req.body;

  try {
    if (!text || !hostelName) {
      return res.status(400).json({ msg: 'Please provide text and hostel name' });
    }

    // Optional: if base64 image path is given and no imageUrl, we upload it
    // Let's assume frontend handles uploading & passes imageUrl or we upload here.
    // We'll keep it simple: frontend can pass imageUrl directly.
    
    let finalImageUrl = imageUrl;
    if (req.file?.buffer) {
      const uploaded = await uploadImage(req.file.buffer);
      finalImageUrl = uploaded?.secure_url || imageUrl;
    }

    const report = await Report.create({
      text,
      hostelName,
      imageUrl: finalImageUrl,
      attendantId: req.user.userId,
    });

    res.status(201).json({ report, msg: 'Report created successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Edit/close a report (Only owner attendant)
export const updateReport = async (req, res) => {
  if (req.user.role !== 'attendant') {
    return res.status(403).json({ msg: 'Only attendants can update reports' });
  }

  const { id } = req.params;
  const { text, imageUrl, status } = req.body;

  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }

    if (report.attendantId.toString() !== req.user.userId) {
      return res.status(403).json({ msg: 'You can update only your own reports' });
    }

    if (text !== undefined) {
      const nextText = String(text).trim();
      if (!nextText) {
        return res.status(400).json({ msg: 'Text cannot be empty' });
      }
      report.text = nextText;
    }

    if (req.file?.buffer) {
      const uploaded = await uploadImage(req.file.buffer);
      report.imageUrl = uploaded?.secure_url;
    } else if (imageUrl !== undefined) {
      report.imageUrl = imageUrl;
    }

    if (status !== undefined) {
      const allowedStatus = ['Open', 'In Progress', 'Resolved'];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ msg: 'Invalid status value' });
      }
      report.status = status;
    }

    await report.save();
    const populatedReport = await report.populate('attendantId', 'name email');

    res.status(200).json({ report: populatedReport, msg: 'Report updated successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};