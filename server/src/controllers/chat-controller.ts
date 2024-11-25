import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { configureOpenAI } from '../config/openai.js';
import { OpenAIApi, ChatCompletionRequestMessage } from 'openai';
import { statusMessage } from '../utils/enum.js';

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;

    if (!res.locals.jwtData) {
      return res.status(401).send(statusMessage.TOKEN_NOT_FOUND);
    }

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: statusMessage.USER_NOT_REGISTERED });

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: 'user' });
    user.chats.push({ content: message, role: 'user' });

    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: chats
    });

    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();

    return res.status(200).json({
      message: statusMessage.SUCCESS,
      chats: user.chats
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: statusMessage.INTERNAL_SERVER_ERROR,
      cause: (err as Error).message
    });
  }
};

export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
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
      chats: user.chats
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: statusMessage.INTERNAL_SERVER_ERROR,
      cause: (err as Error).message
    });
  }
};

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
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

    // user.chats = [];
    // await user.save();
    await User.updateOne({ _id: user._id }, { $set: { chats: [] } });

    return res.status(200).json({ message: statusMessage.SUCCESS });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error',
      cause: (err as Error).message
    });
  }
};
