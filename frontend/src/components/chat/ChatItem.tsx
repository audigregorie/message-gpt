import { Avatar } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../enums/common.enum';
import { ChatMessage } from '../../interface/common.interface';

const ChatItem: React.FC<ChatMessage> = ({ role, content }) => {
  const auth = useAuth();

  return (
    <div className={`flex my-2 rounded-xl p-4 gap-4 items-center ${role === Role.Assistant ? 'bg-[rgb(17,27,39)]' : 'bg-[rgb(2,19,31)]'}`}>
      <Avatar className="ml-0 !bg-black">
        {role === Role.Assistant ? (
          <img src="openai.png" alt="openai" className="w-8 invert" />
        ) : (
          <span className=" text-white">
            {auth?.user?.name[0]}
            {auth?.user?.name.split(' ')[1]?.[0] || ''}
          </span>
        )}
      </Avatar>
      <div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default ChatItem;
