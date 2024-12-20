import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_TOKEN } from '../../utils/constants.js';
import { statusMessage } from '../../utils/enum.js';

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.signedCookies[`${COOKIE_TOKEN}`];

    if (!token || token.trim() === '') {
      return res.status(401).json({ message: statusMessage.TOKEN_NOT_FOUND });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set the decoded token data to res.locals
    res.locals.jwtData = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: statusMessage.TOKEN_EXPIRED_INVALID,
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
};
