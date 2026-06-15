import jwt from 'jsonwebtoken';

const authenticationMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ msg: 'Token not found' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = {
			userId: payload.userId,
			name: payload.name,
			email: payload.email,
			role: payload.role || 'student', // default to student since original createJWT didn't have role
			hostelName: payload.hostelName,
		};
		return next();
	} catch (error) {
		return res.status(401).json({ msg: 'Not authorized to access this route' });
	}
};

export default authenticationMiddleware;
