import { useNavigate } from "react-router-dom";

const FeaturedProjectsCarousel = ({ next }) => {
  const navigate = useNavigate();

  return (
    <section
      className={`flex justify-start min-[1640px]:justify-center gap-3 sm:gap-5 lg:gap-8 pl-[12%] sm:pl-[20%] lg:pl-[5%]  min-[1640px]:pl-0 transition-all duration-300 ease-in-out w-screen ${
        next &&
        "-translate-x-[220px] sm:-translate-x-[330px] lg:-translate-x-[600px] min-[1640px]:translate-x-0"
      }`}
    >
      <div
        onClick={() => navigate('/graph/demo')}
        className="cursor-pointer min-w-[280px] sm:min-w-[420px] lg:min-w-[900px] h-[220px] sm:h-[330px] lg:h-[600px] bg-gradient-to-r from-[#3DB3FC] via-[#5C80FA] to-[#936BF9] rounded-2xl lg:rounded-[3rem] flex flex-col justify-center items-center gap-6 sm:gap-12 overflow-hidden hover:scale-105 transition-transform"
      >
        <div className="text-white text-center px-6">
          <h3 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4">
            Transaction Graph
          </h3>
          <p className="text-sm sm:text-base lg:text-xl font-light">
            Visualize Sui blockchain transactions with interactive graphs
          </p>
        </div>
      </div>

      <div
        onClick={() => navigate('/graph/demo')}
        className="cursor-pointer h-[220px] sm:h-[330px] lg:h-[600px] aspect-square bg-gradient-to-br from-sui-blue to-sui-blue-dark flex justify-center items-center rounded-2xl lg:rounded-[3rem] hover:scale-105 transition-transform shadow-lg shadow-sui-blue/20"
      >
        <div className="text-white text-center px-6">
          <h3 className="text-xl sm:text-3xl lg:text-5xl font-bold mb-3">
            Analytics
          </h3>
          <p className="text-xs sm:text-sm lg:text-lg font-light">
            Deep insights into transaction patterns
          </p>
        </div>
      </div>

      <div
        onClick={() => navigate('/graph/demo')}
        className="cursor-pointer h-[220px] sm:h-[330px] lg:h-[600px] aspect-square bg-gradient-to-tr from-[#936BF9] to-sui-blue-dark flex justify-center items-center rounded-2xl lg:rounded-[3rem] hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
      >
        <div className="text-white text-center px-6">
          <h3 className="text-xl sm:text-3xl lg:text-5xl font-bold mb-3">
            Real-time Data
          </h3>
          <p className="text-xs sm:text-sm lg:text-lg font-light">
            Live blockchain transaction monitoring
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsCarousel;
