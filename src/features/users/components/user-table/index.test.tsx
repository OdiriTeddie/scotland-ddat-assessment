import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { UserTable } from ".";
import type { RandomUserSummary } from "../../types";

const makeUser = (
  overrides: Partial<RandomUserSummary>
): RandomUserSummary => ({
  name: { title: "Ms", first: "Ada", last: "Lovelace" },
  email: "ada@example.com",
  phone: "111",
  location: {
    street: { number: 1, name: "Main" },
    city: "London",
    state: "England",
    country: "UK",
    postcode: "SW1A",
  },
  id: { name: "NINO", value: "QQ123456C" },
  nat: "gb",
  ...overrides,
});

describe("UserTable", () => {
  it("renders rows sorted by name with supplied ID label", () => {
    const users: RandomUserSummary[] = [
      makeUser({
        name: { title: "Adm", first: "Grace", last: "Hopper" },
        email: "grace@example.com",
      }),
      makeUser({
        name: { title: "Dr", first: "Ada", last: "Lovelace" },
        email: "ada@example.com",
        id: { name: "SSN", value: "123-45-6789" },
      }),
    ];

    render(
      <MemoryRouter>
        <UserTable users={users} idLabel="Social ID" nat="us" page={2} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("columnheader", { name: "ID Social ID" })
    ).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    const firstDataRow = rows[1]; // row[0] is header
    expect(within(firstDataRow).getByText("Ada Lovelace")).toBeInTheDocument();

    expect(
      within(firstDataRow).getByRole("link", { name: /view details/i })
    ).toHaveAttribute("href", "/users/ada%40example.com?nat=us&page=2");
  });
});
