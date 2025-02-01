import { cn } from "@/lib/utils";
import { ElementType, ComponentProps, JSX } from "react";

type HeadingElement = Extract<keyof JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'>;

type HeadingBaseProps = {
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
  className?: string;
};

type HeadingProps<C extends ElementType = HeadingElement> = HeadingBaseProps & {
  as?: C;
} & Omit<ComponentProps<C>, keyof HeadingBaseProps | 'as'>;

export default function Heading<C extends ElementType = 'h1'>({
  as,
  className,
  children,
  size = "xl",
  ...props
}: HeadingProps<C>) {
  const Component = (as || 'h1') as ElementType;

  return (
    <Component
      className={cn(
        "font-main",
        size === "xl" && "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-10xl",
        size === "lg" && "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl",
        size === "md" && "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl",
        size === "sm" && "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl",
        size === "xs" && "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}