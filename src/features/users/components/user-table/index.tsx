import { byNameAZ } from "../../../../shared/lib/format";
import type { Nationality, RandomUserSummary } from "../../types";
import { UserRow } from "../user-row";

export const UserTable = ({
  users,
  idLabel,
  nat,
  page,
}: {
  users: RandomUserSummary[];
  idLabel: string;
  nat: Nationality;
  page: number;
}) => {
  const sorted = [...users].sort(byNameAZ);
  return (
    <div role="region" aria-label="User list" style={{ overflowX: "auto" }}>
      <table
        role="table"
        aria-describedby="table-caption"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <caption id="table-caption" className="sr-only">
          Users sorted A to Z by name
        </caption>
        <thead>
          <tr>
            <th scope="col">ID {idLabel}</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((user) => (
            <UserRow key={user.email} user={user} nat={nat} page={page} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
