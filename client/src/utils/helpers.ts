export const extractCodeBlocks = (message: string) => {
  return message.split(/```/).map((block, index) => {
    // Check if this is a code block (which is the odd index) and extract the language if available
    const [firstLine, ...restOfMessage] = block.split('\n');
    const isCode = index % 2 !== 0;
    const language = isCode && firstLine.match(/^[a-z]+$/i) ? firstLine.trim() : '';

    return {
      isCode,
      language: language || 'plaintext',
      content: isCode ? restOfMessage.join('\n').trim() : block.trim()
    };
  });
};
