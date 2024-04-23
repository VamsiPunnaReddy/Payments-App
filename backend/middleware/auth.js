import 'dotenv/config'
import jwt from 'jsonwebtoken'

const jwtSecretKey = process.env.JWT_SECRET_KEY

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({})
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.userId;
    next();

  } catch (err) {
    return res.status(403).json({});
  }
}