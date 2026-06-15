import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create transporter if SMTP configuration is available
const isSmtpConfigured = () => {
	return !!(
		process.env.SMTP_HOST &&
		process.env.SMTP_PORT &&
		process.env.SMTP_USER &&
		process.env.SMTP_PASS
	);
};

export const sendMail = async ({ to, subject, html, attachments = [] }) => {
	const receiverEmail = to || process.env.CONTACT_RECEIVER_EMAIL;

	if (!receiverEmail) {
		console.warn('⚠️ CONTACT_RECEIVER_EMAIL or target recipient is not configured in environment variables.');
	}

	if (!isSmtpConfigured()) {
		console.log('==================================================');
		console.log('📬 [SMTP DRY-RUN] SMTP credentials not fully configured. Email was not sent over SMTP.');
		console.log(`To: ${receiverEmail || '(not configured)'}`);
		console.log(`Subject: ${subject}`);
		console.log(`HTML Body:\n${html}`);
		if (attachments.length > 0) {
			console.log(`Attachments: ${attachments.map(a => a.filename).join(', ')}`);
		}
		console.log('==================================================');
		return { dryRun: true, success: true };
	}

	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT, 10),
			secure: parseInt(process.env.SMTP_PORT, 10) === 465, // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const mailOptions = {
			from: `"Vektor Dynamics System" <${process.env.SMTP_USER}>`,
			to: receiverEmail,
			subject,
			html,
			attachments,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log(`📨 Email sent successfully: ${info.messageId}`);
		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error('❌ Failed to send email via SMTP:', error);
		throw error;
	}
};
