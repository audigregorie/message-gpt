import TypingAnimation from '../components/shared/TypingAnimation';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div className="flex flex-col items-center justify-start pt-16">
        <div>
          <TypingAnimation />
        </div>
        <div className="flex items-center gap-8 md:gap-48 mt-16 md:mt-24">
          <img src="openai.png" alt="openai" className="w-32 md:w-36 invert rotate" />
          <img src="robot.png" alt="robot" className="w-40 md:w-48" />
        </div>
        <div className="w-full mt-24 md:mt-32">
          <img src="chat.png" alt="chatbot" className="w-4/5 xl:w-3/5 mx-auto rounded-lg shadow-[0px_0px_25px_#64f3d5]" />
        </div>
      </div>
    </div>
  );
};

export default Home;
