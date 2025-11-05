import { Link } from "react-router";
import { formatAddress, fullName } from "../../../../shared/lib/format";
import { formatGovIdValue } from "../../utils";
import type { Nationality, RandomUserSummary } from "../../types";

export const UserRow = ({
  user,
  nat,
  page,
}: {
  user: RandomUserSummary;
  nat: Nationality;
  page: number;
}) => (
  <tr>
    <td>{formatGovIdValue(user.id)}</td>
    <td>
      <Link
        to={`/users/${encodeURIComponent(user.email)}?nat=${encodeURIComponent(
          nat
        )}&page=${page}`}
        aria-label={`View details for ${fullName(user.name)}`}
      >
        {fullName(user.name)}
      </Link>
    </td>
    <td>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </td>
    <td>
      <a href={`tel:${user.phone}`}>{user.phone}</a>
    </td>
    <td>{formatAddress(user.location)}</td>
  </tr>
);
