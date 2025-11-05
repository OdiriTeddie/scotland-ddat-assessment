import { Link, useParams, useSearchParams } from "react-router";
import { findUserByEmail, useUsersDetails } from "../../hooks";
import { DEFAULT_NAT, DEFAULT_PAGE } from "../../../../shared/config";
import { Container } from "../../../../shared/ui/container";
import { Card } from "../../../../shared/ui/card";
import { ErrorState, Loading } from "../../../../shared/ui/data-state";
import { UserDetail } from "../../components/user-detail";
import type { Nationality } from "../../types";

export const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const natParam = searchParams.get("nat");
  const pageParam = searchParams.get("page");

  const nat = (natParam as Nationality) || DEFAULT_NAT;
  const parsedPage = pageParam ? Number.parseInt(pageParam, 10) : NaN;
  const page =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : DEFAULT_PAGE;

  const { data, isLoading, isError, error } = useUsersDetails(nat, page);

  const user =
    id && data?.results
      ? findUserByEmail(decodeURIComponent(id), data.results)
      : undefined;

  return (
    <Container>
      <nav aria-label="breadcrumb" style={{ marginBottom: "1rem" }}>
        <Link
          to={`/users?nat=${encodeURIComponent(nat)}&page=${page}`}
          aria-label="Back to Users"
        >
          Back to Users
        </Link>
      </nav>

      <Card>
        {isLoading && <Loading label="Loading user..." />}
        {isError && <ErrorState message={(error as Error).message} />}
        {!isLoading && !user && (
          <p role="status">User not found in current dataset.</p>
        )}
        {user && (
          <div>
            <h1 style={{ marginTop: 0 }}>User Details</h1>

            {/* @ts-expect-error trust details superset at runtime */}
            <UserDetail user={user} />
          </div>
        )}
      </Card>
    </Container>
  );
};
