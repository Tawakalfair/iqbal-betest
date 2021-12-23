import jwt from 'jsonwebtoken';
const secret = "ms_iqbal_betest";

function getJwt(username) {
    return jwt.sign({ username: username }, secret, { expiresIn: '24h' });
}

function claimJwt(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw error;
    }
}

function isAuth(req, res, next) {
    const authorization = req.headers.authorization;
    if (authorization) {
        let token = authorization.split(" ")[1];
        try {
            claimJwt(token);
            next();
        } catch (err) {
            res.status(401).json({
                message: 'Invalid / Expired token'
            });
        }
    } else {
        res.status(401).json({
            message: 'Token required'
        });
    }
}

export { getJwt, isAuth, claimJwt }