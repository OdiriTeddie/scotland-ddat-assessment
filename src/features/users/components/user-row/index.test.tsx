import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { UserRow } from ".";
import type { RandomUserSummary } from "../../types";

const summary: RandomUserSummary = {
  name: { title: "Mr", first: "Alan", last: "Turing" },
  email: "alan.turing@example.com",
  phone: "020 7946 0018",
  location: {
    street: { number: 23, name: "Bletchley Park" },
    city: "Milton Keynes",
    state: "Buckinghamshire",
    country: "UK",
    postcode: "MK3",
  },
  id: { name: "NINO", value: "QQ654321C" },
  nat: "gb",
};

describe("UserRow", () => {
  it("renders key fields and deep link with nationality and page", () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRow user={summary} nat="us" page={3} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    expect(screen.getByText("QQ654321C")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view details/i })).toHaveAttribute(
      "href",
      "/users/alan.turing%40example.com?nat=us&page=3"
    );
    expect(screen.getByRole("link", { name: summary.email })).toHaveAttribute(
      "href",
      `mailto:${summary.email}`
    );
    expect(screen.getByRole("link", { name: summary.phone })).toHaveAttribute(
      "href",
      `tel:${summary.phone}`
    );
  });
});
