const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const token = req.cookies.token; // Get the token from the cookies
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, '7583d88d1f4614edf7e3d4b52e496a0fb02fbc1885bb64b06d62257549ee0a1929fa5a52e14e979587536fee27e7f20980719862c1c1664b3461e3eaa9c9f9c1'); // Verify the token
        req.user = decoded.admin; // Attach admin info to request object
        next(); // Call next middleware or route handler
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
