import { cn } from "@/lib/utils";
import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "xl",
}: HeadingProps) {
  return (
    <Comp
      className={cn(
        "font-main",
        size === "xl" && "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-10xl",
        size === "lg" && "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl",
        size === "md" && "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl",
        size === "sm" && "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl",
        size === "xs" && "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl",
        className
      )}
    >
      {children}
    </Comp>
  );
}
