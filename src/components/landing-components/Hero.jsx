import { GradientButton } from "../buttons/GradientButton";
import { useNavigate } from "react-router-dom";
import zigzag from "../../../assets/landing-page/Zigzag.png";
import zigzag2 from "../../../assets/landing-page/Zigzag2.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="w-full text-white flex flex-col justify-center items-center pb-24 md:pb-32 z-10 px-4">
        <h1 className="flex flex-col justify-center items-center text-center lg:text-8xl text-[2.8rem] sm:text-[4rem] font-bold sm:px-3 tracking-tighter leading-[0.9] pt-24 md:pt-32 lg:pt-36">
          Visualize <span className="text-sui-blue">Sui</span> <br />
          <div className="flex gap-3 justify-center flex-wrap">
            <span className="text-sui-blue">
              Blockchain
            </span>
            Transactions
          </div>
          with Precision
        </h1>
        <p className="text-center pt-6 pb-8 sm:pt-6 text-base lg:text-xl z-10 text-white/70 max-w-3xl">
        Suiflow is dedicated to helping users understand{" "}
          Sui blockchain transactions{" "}
          through interactive graph{" "}
          visualizations and analytics
        </p>

        <GradientButton
          myPadding={true}
          className="text-sm px-6 py-2 sm:px-10 sm:py-3"
          text="Start Visualizing"
          isIcon={false}
          onClick={() => navigate('/graph/demo')}
        />
      </section>
      <img
        src={zigzag}
        alt="Decorative zigzag pattern element"
        className="zig-float top-[21rem] lg:top-[30rem] h-24 md:h-28 lg:h-32 min-[1200px]:h-40 absolute left-[6%] md:left-[18%] lg:left-[10%] min-[1200px]:left-[15%] z-[5]"
      />
      <img
        src={zigzag2}
        alt="Decorative zigzag pattern element"
        className="zig-float-2 top-[16.5rem] sm:top-[18rem] lg:top-[24rem] h-14 md:h-20 lg:h-24 min-[1200px]:h-32 absolute right-[10%] md:right-[15%] lg:right-[10%] z-[5]"
      />
    </>
  );
};

export default Hero;
