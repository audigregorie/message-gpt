import { useRef, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { ChatMessage } from '../interface/common.interface';
import { Role } from '../enums/common.enum';

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value || '';

    if (!content) {
      toast.error('Please enter a message');
      return;
    }

    const newMessage: ChatMessage = { role: Role.User, content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(content);
      setChatMessages((prev) => [...prev, ...chatData.chats]);

      if (inputRef.current) inputRef.current.value = '';
    } catch (error: any) {
      console.error('Error sending chat request:', error);
      toast.error('Failed to send your message. Please try again.');
    }
  };

  return (
    <div className="flex flex-1 w-full h-full mt-3 gap-3">
      <div className="md:flex md:flex-[0.2] md:flex-col hidden">
        <div className="flex w-full h-[60vh] bg-[rgb(17,29,39)] rounded-xl flex-col mx-3 ">
          <Avatar className="mx-auto my-4 bg-white text-black font-bold">
            {auth?.user?.name ? `${auth.user.name[0]}${auth.user.name.split(' ')[1]?.[0] || ''}` : '?'}
          </Avatar>
          <p className='mx-auto font-["work sans"]'>What can I help with?</p>
          <p className='mx-auto font-["work sans"] my-8 p-3'>
            You can ask questions related to Knowledge Business, Advices, Education and more. *Please avoid sharing any personal information
          </p>
          <button className=" w-[200px] bg-red-300 hover:bg-red-500 m-auto rounded-xl py-1 px-3 text-white">Clear Conversation</button>
        </div>
      </div>

      <div className="flex flex-1 sm:flex-1 md:flex-[0.8] flex-col mx-6">
        <p className="text-align text-4xl  text-white mb-4 mx-auto font-semibold">Model - GPT 3.5 Turbo</p>
        <div className="w-full h-[60vh] rounded-xl mx-auto flex flex-col overflow-y-auto scroll-smooth">
          {chatMessages.map((chat, index) => (
            <ChatItem role={chat.role} content={chat.content} key={index} />
          ))}
        </div>
        <div className="w-full p-5 rounded-xl  bg-[rgb(17,29,39)] flex m-auto}">
          <input ref={inputRef} type="text" className="w-full bg-transparent p-3 border-none outline-none text-white text-sm" />
          <IconButton onClick={handleSubmit} className="ml-auto, !text-white">
            <IoMdSend />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;
