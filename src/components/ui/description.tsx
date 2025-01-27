import React from 'react'
import clsx from "clsx";

type DescriptionProps = {
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
  className?: string;
};

const Description = ({
  children,
  size = "lg",
  className,
}: DescriptionProps) => {
  return (
    <div
      className={clsx(
        size === "xl" && "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl",
        size === "lg" && "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl",
        size === "md" && "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl",
        size === "sm" && "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl",
        size === "xs" && "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Description;
