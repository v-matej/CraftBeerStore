const jwt = require('jsonwebtoken');

function jwtUserId(id) {
	return jwt.sign({ id }, process.env.JWT_SECRET);
}

function getUserIdFromJwt(req) {
	const tokenHeader = req?.headers?.authorization?.split(' ')[1];
	var decoded = jwt.decode(tokenHeader, { complete: true });

	if (!decoded?.payload?.user?.id) {
		throw new UnauthorizedError('Unauthorized');
	}

	return decoded.payload.user.id;
}

module.exports = { jwtUserId, getUserIdFromJwt };
