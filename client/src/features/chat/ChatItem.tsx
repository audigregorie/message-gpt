import { Avatar } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChatMessage } from '../../utils/common.interface';
import { Role } from '../../utils/common.enum';
import { useAuth } from '../../utils/auth/AuthContext';
import { extractCodeBlocks } from '../../utils/helpers';

const ChatItem: React.FC<ChatMessage> = ({ role, content }) => {
  const messageBlocks = extractCodeBlocks(content);
  const auth = useAuth();

  return role === Role.Assistant ? (
    <div className="flex my-2 rounded-xl p-4 gap-4 items-start bg-[rgb(17,27,39)]">
      <Avatar className="ml-0 !bg-black">
        <img src="openai.png" alt="openai" className="w-8 invert" />
      </Avatar>
      <div className="pt-2 leading-6">
        {messageBlocks.map((block, index) =>
          block.isCode ? (
            <SyntaxHighlighter key={index} style={coldarkDark} language={block.language}>
              {block.content}
            </SyntaxHighlighter>
          ) : (
            <p key={index} className="text-sm">
              {block.content}
            </p>
          )
        )}
      </div>
    </div>
  ) : (
    <div className="flex my-2 rounded-xl p-4 gap-4 items-start bg-[rgb(2,19,31)]">
      <Avatar className="ml-0 !bg-black">
        <span className="text-white">
          {auth?.user?.name[0]}
          {auth?.user?.name.split(' ')[1]?.[0] || ''}
        </span>
      </Avatar>
      <div className="pt-2 leading-6">
        {messageBlocks.map((block, index) =>
          block.isCode ? (
            <SyntaxHighlighter key={index} style={coldarkDark} language={block.language}>
              {block.content}
            </SyntaxHighlighter>
          ) : (
            <p key={index} className="text-sm">
              {block.content}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ChatItem;
