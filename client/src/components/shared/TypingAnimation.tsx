import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        'Chat with your own AI',
        2000,
        'Built with OpenAI',
        2000,
        'What can I help you with?',
        2000
      ]}
      speed={50}
      repeat={Infinity}
      className="text-[35px] tet-white inline-block md:text-6xl"
    />
  );
};

export default TypingAnimation;
