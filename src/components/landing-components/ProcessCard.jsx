const ProcessCard = ({ icon, title, desc }) => {
  return (
    <div className="rounded-3xl sm:rounded-[2rem] border border-ashyBorder/50 bg-ashy w-[140px] sm:w-[210px] lg:w-[280px] h-[165px] sm:h-[248px] lg:h-[330px] flex flex-col py-4 px-3 sm:px-[19px] lg:px-[27px] justify-center items-center gap-2 sm:gap-4 lg:gap-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] lg:shadow-[14px_14px_0px_0px_rgba(0,0,0,0.2)]">
      <span className="flex justify-center items-center">
        <img
          src={icon}
          alt={`${title} process step icon`}
          className="w-[42px] sm:w-[60px] lg:w-[80px]"
        />
      </span>
      <span className="text-base sm:text-[1.5rem] lg:text-[2rem] font-semibold">
        {title}
      </span>
      <span className="text-[0.5rem] sm:text-[0.75rem] lg:text-base font-extralight text-center">
        {desc}
      </span>
    </div>
  );
};

export default ProcessCard;
