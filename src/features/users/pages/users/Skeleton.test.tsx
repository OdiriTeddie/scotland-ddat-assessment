import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UserTableSkeleton } from "./Skeleton";

describe("UserTableSkeleton", () => {
  it("renders placeholder table structure", () => {
    render(<UserTableSkeleton />);

    expect(
      screen.getByRole("columnheader", { name: "Government ID" })
    ).toBeInTheDocument();

    // 1 header row + 8 placeholder rows
    expect(screen.getAllByRole("row")).toHaveLength(9);
  });
});
