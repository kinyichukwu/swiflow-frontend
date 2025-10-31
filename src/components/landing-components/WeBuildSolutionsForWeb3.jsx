import Transition from "../transitions";
import { useNavigate } from "react-router-dom";
import worlddextop from "../../../assets/landing-page/WeBuildSolutionsForWeb3/WorldDextop.png";
import worldTablet from "../../../assets/landing-page/WeBuildSolutionsForWeb3/World.svg";
import imageGroup from "../../../assets/landing-page/WeBuildSolutionsForWeb3/groupImageDextop.svg";

const WeBuildSolutionsForWeb3 = () => {
  const navigate = useNavigate();

  return (
    <Transition>
      <div className="text-white bg-gradient-to-r from-[#3DB3FC] via-[#5C80FA] to-[#936BF9] w-full flex justify-center items-center mb-24 py-10 lg:py-[4.5rem] relative px-4 overflow-hidden max-w-[100rem]">
        <img
          src={worlddextop}
          alt="World background"
          className="absolute -z-0 opacity-100 left-0 hidden md:block"
        />
        <img
          src={worldTablet}
          alt="World background"
          className="absolute -z-0 opacity-100 left-0 md:hidden h-full"
        />
        <div className="max-w-[100rem] flex flex-col justify-center items-center md:flex-row lg:gap-[3rem] gap-10 sm:gap-4 lg:px-20">
          <div className="flex flex-col w-full">
            <button className="bg-white/[0.1] rounded-full py-2 px-3 flex justify-center items-center text-white gap-3 w-fit tracking-widest font-light mb-6 flex-col">
              OUR MISSION
            </button>

            <div className="font-semibold text-[3.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] text-white leading-[0.85] tracking-tighter">
              We build <br /> transaction tools <br /> for Sui blockchain
            </div>
          </div>

          <div className="flex flex-col w-full gap-10">
            <p className="font-thin lg:text-[1.25rem]">
              Swiflow is dedicated to helping users understand Sui blockchain
              transactions through interactive graph visualizations and advanced
              analytics. We bridge the gap between complex blockchain data and
              user-friendly insights.
            </p>

            <button
              onClick={() => navigate('/graph/demo')}
              className={`bg-white shadow-lg rounded-full px-4 lg:px-6 py-2 flex justify-center
              items-center gap-2 w-fit transition-all z-10 hover:scale-105`}
            >
              <div
                className="font-semibold bg-gradient-to-tr from-blue-400 to-purple-600 bg-clip-text
              text-transparent tracking-tighter text-[1.25rem] lg:text-[1.5rem]"
              >
                Start Visualizing
              </div>
              <img
                src={imageGroup}
                alt="button-image"
                className="max-md:w-[3.2rem]"
              />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default WeBuildSolutionsForWeb3;
