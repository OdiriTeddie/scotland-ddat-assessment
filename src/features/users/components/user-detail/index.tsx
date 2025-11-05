import { formatAddress, fullName } from "../../../../shared/lib/format";
import type { RandomUserDetails } from "../../types";

export const UserDetail = ({ user }: { user: RandomUserDetails }) => (
  <article aria-label={`Details for ${fullName(user.name)}`}>
    <header style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {user.picture?.medium && (
        <img
          src={user.picture.medium}
          alt={`Photo of ${fullName(user.name)}`}
          width={80}
          height={80}
          style={{ borderRadius: "50%" }}
        />
      )}
      <div>
        <h1 style={{ margin: 0 }}>{fullName(user.name)}</h1>
        <p style={{ margin: 0, color: "#555" }}>{user.gender?.toString?.()}</p>
      </div>
    </header>
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "max-content 1fr",
        gap: "0.5rem 1rem",
        marginTop: "1rem",
      }}
    >
      <dt>Email</dt>
      <dd>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </dd>
      <dt>Phone</dt>
      <dd>
        <a href={`tel:${user.phone}`}>{user.phone}</a>
      </dd>
      <dt>Mobile</dt>
      <dd>
        <a href={`tel:${user.cell}`}>{user.cell}</a>
      </dd>
      <dt>Address</dt>
      <dd>{formatAddress(user.location)}</dd>
      <dt>DOB</dt>
      <dd>{new Date(user.dob.date).toLocaleDateString()}</dd>
      <dt>Registered</dt>
      <dd>{new Date(user.registered.date).toLocaleDateString()}</dd>
      <dt>Nationality</dt>
      <dd>{user.nat}</dd>
    </dl>
  </article>
);
