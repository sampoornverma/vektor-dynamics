import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.model.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
	const token = req.body.token || req.body.credential || req.body.id_token;
	const mode = req.body.mode === 'signup' ? 'signup' : 'login';
	if (!token) {
		return res.status(401).json({ msg: 'No Google token provided' });
	}

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		const { email, name, sub } = payload;

		let user = await User.findOne({ email });

		if (!user) {
			if (mode !== 'signup') {
				return res.status(409).json({
					msg: 'Signup required for first-time Google users',
					code: 'SIGNUP_REQUIRED',
				});
			}

			const { roomNumber, hostelName } = req.body;
			if (!roomNumber || !hostelName) {
				return res.status(400).json({
					msg: 'roomNumber and hostelName are required for first-time Google signup',
				});
			}

			user = await User.create({
				name,
				email,
				googleId: sub,
				roomNumber,
				hostelName,
			});
		} else if (!user.googleId) {
			user.googleId = sub;
			await user.save();
		}

		const customToken = user.createJWT();

		return res.status(200).json({
			user: {
				name: user.name,
				_id: user._id,
				email: user.email,
				phoneNumber: user.phoneNumber,
				roomNumber: user.roomNumber,
				hostelName: user.hostelName,
			},
			token: customToken,
		});
	} catch (error) {
        console.log(error);
		return res.status(401).json({
			msg: 'Invalid Google token',
			error: error.message || error,
			code: 'GOOGLE_TOKEN_INVALID',
		});
	}
};

export { googleLogin };
