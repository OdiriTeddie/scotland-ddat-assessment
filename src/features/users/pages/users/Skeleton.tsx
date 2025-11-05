const shimmer = {
  background: "linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%)",
  backgroundSize: "400% 100%",
  animation: "placeholderShimmer 1.4s ease infinite",
};

export const UserTableSkeleton = () => (
  <div role="status" aria-live="polite" style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {["Government ID", "Name", "Email", "Phone", "Address"].map((label) => (
            <th key={label} scope="col">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 8 }).map((_, idx) => (
          <tr key={idx}>
            {Array.from({ length: 5 }).map((__, cellIdx) => (
              <td key={cellIdx} style={{ padding: "0.75rem 0.5rem" }}>
                <span
                  style={{
                    display: "block",
                    height: "1rem",
                    borderRadius: 4,
                    ...shimmer,
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
