import { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { Role } from '../enums/common.enum';
import { useNavigate } from 'react-router-dom';
import { ChatMessage } from '../interface/common.interface';

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user, isLoggedIn } = useAuth();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: ChatMessage = { role: Role.User, content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting Chats', { id: 'deletechats' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Deleted chats successfully', { id: 'deletechats' });
    } catch (err: any) {
      console.error(err);
      toast.error('Failed deleting chats', { id: 'deletechats' });
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }

    if (isLoggedIn && user) {
      toast.loading('Loading Chats', { id: 'loadchats' });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success('Loaded chats successfully', { id: 'loadchats' });
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed loading chats', { id: 'loadchats' });
        });
    }
  }, [user, isLoggedIn, navigate]);

  return (
    <div className="flex flex-1 w-full h-full mt-3 gap-3">
      <div className="md:flex md:flex-[0.2] md:flex-col hidden">
        <div className="flex w-full h-[60vh] items-center bg-[rgb(17,29,39)] rounded-xl flex-col mx-3 ">
          <Avatar className="mx-auto my-4 bg-white text-black font-bold">{user?.name ? `${user.name[0]}${user.name.split(' ')[1]?.[0] || ''}` : '?'}</Avatar>
          <p className='font-["work sans"]'>What can I help with?</p>
          <p className='font-["work sans"] my-8 p-3'>
            You can ask questions related to Knowledge Business, Advice, Education, and more. *Please avoid sharing any personal information.
          </p>
          <button onClick={handleDeleteChats} className="w-[200px] bg-red-300 hover:bg-red-500 m-auto rounded-xl py-1 px-3 text-white">
            Clear Conversation
          </button>
        </div>
      </div>

      <div className="flex flex-1 sm:flex-1 md:flex-[0.8] flex-col mx-6">
        <p className="text-center text-4xl text-white mb-4 font-semibold">Model - GPT 3.5 Turbo</p>
        <div className="w-full h-[60vh] rounded-xl mx-auto flex flex-col overflow-y-auto scroll-smooth">
          {chatMessages.map((chat, index) => (
            <ChatItem role={chat.role} content={chat.content} key={index} />
          ))}
        </div>
        <div className="w-full p-5 rounded-xl bg-[rgb(17,29,39)] flex">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            className="w-full bg-transparent p-3 border-none outline-none text-white text-sm"
          />
          <IconButton onClick={handleSubmit} className="ml-auto !text-white">
            <IoMdSend />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;
