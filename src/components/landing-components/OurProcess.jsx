import dots from "../../../assets/landing-page/our-process-dots.svg";
import AllProcessCards from "./AllProcessCards";
import { GradientText } from "../special_text/GradientText";

const OurProcess = () => (
  <div className="w-full lg:flex lg:justify-center">
    <div className="flex md:flex-row flex-col justify-center items-center w-full text-white my-16 md:my-12 lg:max-w-[100rem] lg:pr-10">
      <section className="relative w-full flex md:w-2/5 flex-col text-[2.6rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[0.9] font-bold pl-12 lg:pl-20">
        <img
          src={dots}
          alt="Decorative dots pattern"
          className="absolute -top-6 left-4 lg:left-10 h-20"
        />{" "}
        <GradientText
          text={
            <>
              Our <br />
              Process
            </>
          }
          className="sm:w-full justify-start text-start w-2/3 insetShadow lg:text-8xl text-[2.6rem] sm:text-5xl md:text-6xl font-bold tracking-tighter -translate-x-[2vw] pb-[6px]"
        />
        <span className="text-xs md:text-sm lg:text-[1.1rem] font-light pb-3 w-full leading-[1.5] lg:leading-[1.55]">
          Here&apos;s how we analyze and visualize{" "}
          <br className="hidden md:flex" /> Sui blockchain{" "}
          <br className="flex md:hidden" />
          transactions to provide clear <br className="hidden md:flex" />{" "}
          insights for all users
        </span>
      </section>

      <section className="relative flex justify-end items-center w-full md:w-3/5 my-10">
        <AllProcessCards />
        <div className="absolute max-w-[1000px] w-[75%] sm:w-[90%] md:w-[90%] lg:w-full rounded-l-2xl lg:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 h-[200px] sm:h-[370px]" />
      </section>
    </div>
  </div>
);

export default OurProcess;
