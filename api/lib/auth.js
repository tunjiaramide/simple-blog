import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        req.username = verifyToken.username;
        next()

    } catch (err) {
        res.status(403).send({"msg": "Wrong credentials"})
    }
}

export default auth;