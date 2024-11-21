import { Avatar } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../enums/common.enum';
import { ChatMessage } from '../../interface/common.interface';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeBlocks(message: string) {
  return message.split(/```/).map((block, index) => {
    // Check if this is a code block (odd index) and extract the language if available
    const [firstLine, ...restOfMessage] = block.split('\n');
    const isCode = index % 2 !== 0;
    const language = isCode && firstLine.match(/^[a-z]+$/i) ? firstLine.trim() : '';

    return {
      isCode,
      language: language || 'plaintext',
      content: isCode ? restOfMessage.join('\n').trim() : block.trim()
    };
  });
}

const ChatItem: React.FC<ChatMessage> = ({ role, content }) => {
  const messageBlocks = extractCodeBlocks(content);
  const { user } = useAuth();

  return role === Role.Assistant ? (
    <div className="flex my-2 rounded-xl p-4 gap-4 items-start bg-[rgb(17,27,39)]">
      <Avatar className="ml-0 !bg-black">
        <img src="openai.png" alt="openai" className="w-8 invert" />
      </Avatar>
      <div className="pt-2">
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
          {user?.name[0]}
          {user?.name.split(' ')[1]?.[0] || ''}
        </span>
      </Avatar>
      <div className="pt-2">
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
