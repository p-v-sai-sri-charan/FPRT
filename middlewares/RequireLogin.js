import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    return res.status(401).json({message: 'Unauthorized'})
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({message: 'Unauthorized'})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({message: 'Unauthorized'})
    }
    req.userId = decoded.userId
    next()
  } catch (e) {
    res.status(500).json({message: 'Invalid token'})
  }
}
