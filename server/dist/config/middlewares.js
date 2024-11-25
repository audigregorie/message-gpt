import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
export const setupMiddlewares = (app) => {
    app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
};
//# sourceMappingURL=middlewares.js.map