import { Request, Response } from 'express';
import User from '../models/User.js';
import { statusMessage } from '../utils/constants.js';
import { configureOpenAI } from '../config/openai-config.js';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

export const generateChatCompletion = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    console.log('JWT Data:', res.locals.jwtData);
    if (!user) return res.status(401).send(`${statusMessage.USER_NOT_REGISTERED} OR ${statusMessage.TOKEN_NOT_FOUND}`);

    const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
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
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: statusMessage.CHAT_COMPLETION_REQUEST_MESSAGE });
  }
};
