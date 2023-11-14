import { ReactNode } from "react";

type SectionProps = {
  title?: string;
  children: ReactNode;
};

export const Section = ({ children, title = "ShuttleCLub" }: SectionProps) => {
  return (
    <section>
      <p>{title}</p>
      <p className="w-full pt-5 text-start text-3xl font-black">{children}</p>
    </section>
  );
};
