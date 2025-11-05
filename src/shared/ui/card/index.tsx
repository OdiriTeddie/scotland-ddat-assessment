import type { PropsWithChildren } from "react";

export const Card = ({ children }: PropsWithChildren) => (
  <section
    role="region"
    aria-label="panel"
    style={{
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: "1rem",
    }}
  >
    {children}
  </section>
);
