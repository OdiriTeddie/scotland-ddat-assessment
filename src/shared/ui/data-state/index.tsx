export const Loading = ({ label = "Loading…" }: { label?: string }) => (
  <div role="status" aria-live="polite">
    {label}
  </div>
);
export const ErrorState = ({ message }: { message: string }) => (
  <div role="alert" style={{ color: "crimson" }}>
    Error: {message}
  </div>
);
