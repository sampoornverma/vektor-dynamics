import User from '../models/user.model.js';

const updatePhoneNumber = async (req, res) => {
	const userId = req.user && req.user.userId;
	if (!userId) {
		return res.status(401).json({ message: 'User not authenticated' });
	}

	const { phoneNumber } = req.body || {};
	if (phoneNumber === undefined || phoneNumber === null || phoneNumber === '') {
		return res.status(400).json({ message: 'phoneNumber is required' });
	}

	const numericPhone = Number(phoneNumber);
	if (!Number.isInteger(numericPhone) || numericPhone < 1000000000 || numericPhone > 9999999999) {
		return res.status(400).json({ message: 'phoneNumber must be a 10 digit number' });
	}

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		user.phoneNumber = numericPhone;
		await user.save();

		const token = user.createJWT();

		return res.status(200).json({
			message: 'Phone number updated',
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				phoneNumber: user.phoneNumber,
				roomNumber: user.roomNumber,
				hostelName: user.hostelName,
			},
			token,
		});
	} catch (error) {
		if (error && error.code === 11000 && error.keyPattern && error.keyPattern.phoneNumber) {
			return res.status(400).json({ message: 'phoneNumber already in use' });
		}

		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};

export { updatePhoneNumber };
