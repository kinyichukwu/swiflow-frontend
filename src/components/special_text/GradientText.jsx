import { cn } from "../../utils";

export const GradientText = ({
  text,
  children,
  variant,
  className = "",
}) => {
  return (
    <h1
      className={cn(
        "sm:leading-[3.25rem] md:text-6xl relative text-[2.6rem] tracking-tighter sm:text-5xl lg:text-[4rem] lg:w-full text-center mb-2 sm:mb-6 font-bold flex justify-center items-center text-white leading-none p-[0.3em]",
        variant === "grid-section" &&
          "font-medium text-4xl sm:text-3xl md:text-[2rem] lg:text-[2.5rem] xl:text-5xl mb-0 sm:mb-0",
        className
      )}
    >
      {children} {text}
    </h1>
  );
};
