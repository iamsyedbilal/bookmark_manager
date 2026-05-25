import type { ReactNode } from "react";

type HeadingProps = {
  heading: string | ReactNode;
};

export default function Heading({ heading }: HeadingProps) {
  return <h1 className="font-bold text-2xl">{heading}</h1>;
}
