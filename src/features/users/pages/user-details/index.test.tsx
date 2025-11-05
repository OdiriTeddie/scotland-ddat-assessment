import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserDetailsPage } from ".";
import type { RandomUserDetails } from "../../types";

const mockUseUsersDetails = vi.fn();
const mockFindUserByEmail = vi.fn();

vi.mock("../../hooks", () => ({
  useUsersDetails: (...args: unknown[]) => mockUseUsersDetails(...args),
  findUserByEmail: (...args: unknown[]) => mockFindUserByEmail(...args),
}));

const detail: RandomUserDetails = {
  name: { title: "Dr", first: "Ada", last: "Lovelace" },
  email: "ada@example.com",
  phone: "0200000000",
  location: {
    street: { number: 1, name: "Main" },
    city: "London",
    state: "England",
    country: "UK",
    postcode: "SW1A",
  },
  id: { name: "INSEE", value: "123456789" },
  nat: "fr",
  gender: "female",
  dob: { date: "1980-01-01T00:00:00Z", age: 45 },
  registered: { date: "2010-01-01T00:00:00Z", age: 15 },
  cell: "0700000000",
  picture: {
    large: "large.jpg",
    medium: "medium.jpg",
    thumbnail: "thumb.jpg",
  },
};

describe.skip("UserDetailsPage", () => {
  beforeEach(() => {
    mockUseUsersDetails.mockReset();
    mockFindUserByEmail.mockReset();
  });

  it("uses query parameters for fetching and breadcrumb", () => {
    mockUseUsersDetails.mockReturnValue({
      data: { results: [detail] },
      isLoading: false,
      isError: false,
      error: undefined,
    });
    mockFindUserByEmail.mockReturnValue(detail);

    render(
      <MemoryRouter initialEntries={["/users/ada%40example.com?nat=fr&page=2"]}>
        <UserDetailsPage />
      </MemoryRouter>
    );

    expect(mockUseUsersDetails).toHaveBeenCalledWith("fr", 2);
    expect(mockFindUserByEmail).toHaveBeenCalledWith("ada@example.com", [
      detail,
    ]);
    expect(
      screen.getByRole("link", { name: /back to users/i })
    ).toHaveAttribute("href", "/users?nat=fr&page=2");
    expect(
      screen.getByRole("heading", { name: "User Details" })
    ).toBeInTheDocument();
  });

  it("shows not found message when user is absent", () => {
    mockUseUsersDetails.mockReturnValue({
      data: { results: [detail] },
      isLoading: false,
      isError: false,
      error: undefined,
    });
    mockFindUserByEmail.mockReturnValue(undefined);

    render(
      <MemoryRouter
        initialEntries={["/users/missing%40example.com?nat=gb&page=1"]}
      >
        <UserDetailsPage />
      </MemoryRouter>
    );

    expect(
      screen.getAllByText("User not found in current dataset.")
    ).toHaveLength(2);
  });
});
