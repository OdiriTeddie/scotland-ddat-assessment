import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1rem" }}>
    {children}
  </div>
);
