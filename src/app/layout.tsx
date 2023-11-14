import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const layout = ({ children }: LayoutProps) => {
  return (
    <section>
      <div>Test</div>
      <main>{children}</main>
    </section>
  );
};

export default layout;
