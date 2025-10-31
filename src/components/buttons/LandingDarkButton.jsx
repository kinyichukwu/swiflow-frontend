export default function LandingDarkButton({
  isIcon = true,
  myIcon,
  text = "",
  className = "",
}) {
  return (
    <button
      className={`${className} bg-white/[0.06] shadow-lg rounded-full py-2 px-3 flex justify-center items-center text-white gap-3 w-fit transition-all z-10 text-[0.8rem] font-extralight text-sm lg:text-base`}
    >
      {myIcon && <img src={myIcon} alt="button icon" className="w-[25px]" />}
      {text}
    </button>
  );
}
