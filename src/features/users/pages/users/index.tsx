import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Container } from "../../../../shared/ui/container";
import {
  DEFAULT_NAT,
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
} from "../../../../shared/config";
import { useUsersSummary } from "../../hooks";
import { NationalitySelect } from "../../components/nationality-select";
import { Card } from "../../../../shared/ui/card";
import { ErrorState } from "../../../../shared/ui/data-state";
import { UserTable } from "../../components/user-table";
import { UserTableSkeleton } from "./Skeleton";
import type { Nationality } from "../../types";
import { resolveGovIdLabel } from "../../utils";

export const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const natParam = searchParams.get("nat");
  const pageParam = searchParams.get("page");
  const initialNat = (natParam as Nationality) || DEFAULT_NAT;
  const parsedPage = pageParam ? Number.parseInt(pageParam, 10) : NaN;
  const initialPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : DEFAULT_PAGE;

  const [nat, setNat] = useState<Nationality>(initialNat);
  const [page, setPage] = useState<number>(initialPage);
  const { data, isLoading, isFetching, isError, error } = useUsersSummary(
    nat,
    page
  );

  useEffect(() => {
    const nextParams = new URLSearchParams();
    nextParams.set("nat", nat);
    nextParams.set("page", page.toString());
    setSearchParams(nextParams, { replace: true });
  }, [nat, page, setSearchParams]);

  const handleNatChange = (nextNat: Nationality) => {
    setNat(nextNat);
    setPage(DEFAULT_PAGE);
  };

  const goToPreviousPage = () =>
    setPage((current) => Math.max(DEFAULT_PAGE, current - 1));
  const goToNextPage = () => setPage((current) => current + 1);

  const hasPrevious = page > DEFAULT_PAGE;
  const hasNext = (data?.results?.length ?? 0) >= DEFAULT_RESULTS;
  const idLabel = resolveGovIdLabel(data?.results?.[0]?.id);

  return (
    <Container>
      <h1>Users</h1>
      <p id="summary-instructions">
        List is limited to a single nationality and sorted A → Z by name.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBlock: "1rem",
        }}
      >
        <NationalitySelect value={nat} onChange={handleNatChange} />
      </div>

      <Card>
        {isError && <ErrorState message={(error as Error).message} />}
        {isLoading ? (
          <UserTableSkeleton />
        ) : data?.results?.length ? (
          <>
            <UserTable
              users={data.results}
              idLabel={idLabel}
              nat={nat}
              page={page}
            />
            <div
              role="navigation"
              aria-label="Pagination"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
                gap: "1rem",
              }}
            >
              <button
                className="nextBtn"
                type="button"
                onClick={goToPreviousPage}
                disabled={!hasPrevious || isFetching}
              >
                Previous
              </button>
              <span aria-live="polite">
                Page {page}
                {isFetching && !isLoading ? " (updating...)" : ""}
              </span>
              <button
                className="prevBtn"
                type="button"
                onClick={goToNextPage}
                disabled={!hasNext || isFetching}
              >
                Next
              </button>
            </div>
          </>
        ) : null}
      </Card>
    </Container>
  );
};
