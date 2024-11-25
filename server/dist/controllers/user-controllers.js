import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
import { COOKIE_TOKEN } from '../utils/constants.js';
import { createToken } from '../config/auth/token.js';
import { statusMessage } from '../utils/enum.js';
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: statusMessage.SUCCESS,
            users
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: statusMessage.INTERNAL_SERVER_ERROR,
            cause: err.message
        });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send(statusMessage.USER_ALREADY_REGISTERED);
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // Store cookie
        res.clearCookie(COOKIE_TOKEN, {
            httpOnly: true,
            domain: process.env.COOKE_DOMAIN,
            signed: true,
            path: '/'
        });
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_TOKEN, token, {
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({
            message: statusMessage.SUCCESS,
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: statusMessage.INTERNAL_SERVER_ERROR,
            cause: err.message
        });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send(statusMessage.USER_NOT_REGISTERED);
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send(statusMessage.INCORRECT_PASSWORD);
        }
        res.clearCookie(COOKIE_TOKEN, {
            httpOnly: true,
            domain: process.env.COOKIE_DOMAIN,
            signed: true,
            path: '/'
        });
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_TOKEN, token, {
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(200).json({
            message: statusMessage.SUCCESS,
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: statusMessage.INTERNAL_SERVER_ERROR,
            cause: err.message
        });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        if (!res.locals.jwtData) {
            return res.status(401).send(statusMessage.TOKEN_NOT_FOUND);
        }
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send(statusMessage.USER_NOT_REGISTERED);
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send(statusMessage.PERMISSIONS_DID_NOT_MATCH);
        }
        return res.status(200).json({
            message: statusMessage.SUCCESS,
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: statusMessage.INTERNAL_SERVER_ERROR,
            cause: err.message
        });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        if (!res.locals.jwtData) {
            return res.status(401).send(statusMessage.TOKEN_NOT_FOUND);
        }
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send(statusMessage.USER_NOT_REGISTERED);
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send(statusMessage.PERMISSIONS_DID_NOT_MATCH);
        }
        res.clearCookie(COOKIE_TOKEN, {
            httpOnly: true,
            domain: process.env.COOKIE_DOMAIN,
            signed: true,
            path: '/'
        });
        return res.status(200).json({
            message: statusMessage.SUCCESS,
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: statusMessage.INTERNAL_SERVER_ERROR,
            cause: err.message
        });
    }
};
//# sourceMappingURL=user-controllers.js.map