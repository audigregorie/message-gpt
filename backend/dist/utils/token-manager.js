import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === '')
        return res.status(401).json({ message: 'Authentication token not found' });
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ message: 'Authentication token expired or invalid' });
        }
        res.locals.jwtData = decoded;
        console.log('Authentication token verified successfully');
        next();
    });
};
// return new Promise<void>((resolve, reject) => {
//   return jwt.verify(token, process.env.JWT_SECRET, (error: any, success: any) => {
//     if (error) {
//       reject(error.message);
//       return res.status(401).json({ message: 'Authentication token expired' });
//     } else {
//       console.log('Authentication token verified successfully');
//       resolve();
//       res.locals.jwtData = success;
//       return next();
//     }
//   });
// });
// };
//# sourceMappingURL=token-manager.js.map