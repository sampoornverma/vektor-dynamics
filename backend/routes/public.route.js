import express from 'express';
import multer from 'multer';
import Contact from '../models/contact.model.js';
import Application from '../models/application.model.js';
import { sendMail } from '../util/mail.js';

const router = express.Router();

// Setup multer in-memory storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10MB limit
	},
	fileFilter: (req, file, cb) => {
		// Accept PDF, DOC, DOCX, or images
		const allowedMimeTypes = [
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'image/jpeg',
			'image/png'
		];
		if (allowedMimeTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error('Invalid file type. Only PDF, Word Documents, and Images are allowed.'));
		}
	}
});

// Contact Route
router.post('/contact', async (req, res) => {
	const { name, email, subject, message } = req.body;

	if (!name || !email || !subject || !message) {
		return res.status(400).json({ success: false, error: 'Please provide name, email, subject, and message' });
	}

	try {
		// Save to Database
		try {
			const contact = new Contact({ name, email, subject, message });
			await contact.save();
		} catch (dbError) {
			console.warn('⚠️ MongoDB Write Failed. Inbound contact query was not stored:', dbError.message);
		}

		// Compose Email HTML
		const emailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
				<h2 style="color: #00ffcc; background-color: #0d1117; padding: 10px; border-radius: 4px; text-align: center;">New Contact Inquiry - Vektor Dynamics</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
				<p><strong>Subject:</strong> ${subject}</p>
				<hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
				<p><strong>Message:</strong></p>
				<p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00ffcc; border-radius: 4px; white-space: pre-wrap;">${message}</p>
				<p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">Submitted automatically by Vektor Dynamics Contact Form.</p>
			</div>
		`;

		// Send Email
		await sendMail({
			subject: `[Contact Form] ${subject} - From ${name}`,
			html: emailHtml,
		});

		return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
	} catch (error) {
		console.error('Error in /contact endpoint:', error);
		return res.status(500).json({ success: false, error: 'Internal server error. Failed to process contact request.' });
	}
});

// Apply Route (Careers)
router.post('/apply', upload.single('resume'), async (req, res) => {
	const { name, email, role, message } = req.body;

	if (!name || !email || !role) {
		return res.status(400).json({ success: false, error: 'Please provide name, email, and the role you are applying for.' });
	}

	try {
		// Save to Database
		try {
			const application = new Application({
				name,
				email,
				role,
				message,
				resumePath: req.file ? `attachment:${req.file.originalname}` : 'none',
			});
			await application.save();
		} catch (dbError) {
			console.warn('⚠️ MongoDB Write Failed. Inbound job application was not stored:', dbError.message);
		}

		// Compose Email HTML
		const emailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
				<h2 style="color: #00ffcc; background-color: #0d1117; padding: 10px; border-radius: 4px; text-align: center;">New Job Application - Vektor Dynamics</h2>
				<p><strong>Candidate Name:</strong> ${name}</p>
				<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
				<p><strong>Applied Role:</strong> <span style="background-color: #eee; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${role}</span></p>
				<hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
				<p><strong>Cover Letter/Message:</strong></p>
				<p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00ffcc; border-radius: 4px; white-space: pre-wrap;">${message || 'No cover letter provided.'}</p>
				${req.file ? `<p style="color: #28a745;"><strong>📎 Resume attached:</strong> ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)</p>` : '<p style="color: #dc3545;">❌ No resume file attached.</p>'}
				<p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">Submitted automatically by Vektor Dynamics Careers Portal.</p>
			</div>
		`;

		// Set attachments if a file is present
		const attachments = [];
		if (req.file) {
			attachments.push({
				filename: req.file.originalname,
				content: req.file.buffer,
			});
		}

		// Send Email
		await sendMail({
			subject: `[Job Application] ${role} - ${name}`,
			html: emailHtml,
			attachments,
		});

		return res.status(200).json({ success: true, message: 'Application submitted successfully!' });
	} catch (error) {
		console.error('Error in /apply endpoint:', error);
		return res.status(500).json({ success: false, error: 'Internal server error. Failed to process application.' });
	}
});

// Error handling for Multer
router.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
	} else if (err) {
		return res.status(400).json({ success: false, error: err.message });
	}
	next();
});

export default router;
