import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import React, { type ReactNode } from "react";
import { useUsersSummary, useUsersDetails, findUserByEmail } from "./hooks";
import type { RandomUserDetails, RandomUserSummary } from "./types";

vi.mock("./api", () => ({
  fetchUsersSummary: vi.fn(),
  fetchUsersDetails: vi.fn(),
}));

import { fetchUsersSummary, fetchUsersDetails } from "./api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: { children: ReactNode }) =>
  React.createElement(QueryClientProvider, { client: queryClient }, children);

const summaryFixture: RandomUserSummary = {
  name: { title: "Ms", first: "Ada", last: "Lovelace" },
  email: "ada.lovelace@example.com",
  phone: "0102030405",
  location: {
    street: { number: 10, name: "Downing Street" },
    city: "London",
    state: "England",
    country: "United Kingdom",
    postcode: "SW1A",
  },
  id: { name: "NINO", value: "QQ123456C" },
  nat: "gb",
};

const detailFixture: RandomUserDetails = {
  ...summaryFixture,
  gender: "female",
  dob: { date: "1980-01-01T00:00:00Z", age: 45 },
  registered: { date: "2010-01-01T00:00:00Z", age: 15 },
  cell: "07123456789",
  picture: {
    large: "https://example.com/large.jpg",
    medium: "https://example.com/medium.jpg",
    thumbnail: "https://example.com/thumb.jpg",
  },
};

describe("user hooks", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches user summaries with nationality and page", async () => {
    vi.mocked(fetchUsersSummary).mockResolvedValue({
      results: [summaryFixture],
      info: { seed: "seed", results: 1, version: "1.0" },
    });

    const { result } = renderHook(() => useUsersSummary("us", 2), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchUsersSummary).toHaveBeenCalledWith("us", 2);
    expect(result.current.data?.results).toEqual([summaryFixture]);
  });

  it("retains previous summary data while fetching next page", async () => {
    const firstPage = {
      results: [summaryFixture],
      info: { seed: "seed", results: 1, version: "1.0" },
    };
    const secondPage = {
      results: [{ ...summaryFixture, email: "ada.page2@example.com" }],
      info: { seed: "seed", results: 1, version: "1.0" },
    };

    vi.mocked(fetchUsersSummary)
      .mockResolvedValueOnce(firstPage)
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(secondPage), 0);
          })
      );

    const { result, rerender } = renderHook(
      ({ nat, page }: { nat: string; page: number }) =>
        useUsersSummary(nat, page),
      {
        initialProps: { nat: "gb", page: 1 },
        wrapper,
      }
    );

    await waitFor(() =>
      expect(result.current.data?.results).toEqual(firstPage.results)
    );

    rerender({ nat: "gb", page: 2 });

    expect(result.current.data?.results).toEqual(firstPage.results);

    await waitFor(() =>
      expect(result.current.data?.results).toEqual(secondPage.results)
    );
  });

  it("fetches user details with nationality and page", async () => {
    vi.mocked(fetchUsersDetails).mockResolvedValue({
      results: [detailFixture],
      info: { seed: "seed", results: 1, version: "1.0" },
    });

    const { result } = renderHook(() => useUsersDetails("fr", 3), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchUsersDetails).toHaveBeenCalledWith("fr", 3);
    expect(result.current.data?.results?.[0]?.email).toBe(detailFixture.email);
  });
});

describe("findUserByEmail", () => {
  it("returns matching user by email", () => {
    expect(findUserByEmail(summaryFixture.email, [summaryFixture])).toEqual(
      summaryFixture
    );
  });

  it("returns undefined when email is absent", () => {
    expect(
      findUserByEmail("absent@example.com", [summaryFixture])
    ).toBeUndefined();
  });
});
