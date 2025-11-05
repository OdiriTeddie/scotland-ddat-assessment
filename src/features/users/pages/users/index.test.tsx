import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedFunction,
} from "vitest";
import { UsersPage } from ".";
import type { RandomUserSummary } from "../../types";

type UseUsersSummary = typeof import("../../hooks")["useUsersSummary"];

const mockUseUsersSummary = vi.fn() as MockedFunction<UseUsersSummary>;

vi.mock("../../hooks", async () => {
  const actual = await vi.importActual<typeof import("../../hooks")>(
    "../../hooks"
  );
  return {
    ...actual,
    useUsersSummary: (...args: Parameters<UseUsersSummary>) =>
      mockUseUsersSummary(...args),
  };
});

const makeSummary = (index: number): RandomUserSummary => ({
  name: { title: "Mx", first: `User${index}`, last: "Tester" },
  email: `user${index}@example.com`,
  phone: `000${index}`,
  location: {
    street: { number: 1 + index, name: "Main" },
    city: "City",
    state: "State",
    country: "Country",
    postcode: `PC${index}`,
  },
  id: { name: "SSN", value: `ID-${index}` },
  nat: "us",
});

const twentyResults = Array.from({ length: 20 }, (_, idx) => makeSummary(idx));

const mockResult = {
  data: {
    results: twentyResults,
    info: { seed: "seed", results: 20, version: "1.0" },
  },
  isLoading: false,
  isFetching: false,
  isError: false,
  error: undefined,
} as unknown as ReturnType<UseUsersSummary>;

describe.only("UsersPage", () => {
  beforeEach(() => {
    mockUseUsersSummary.mockReset();
    mockUseUsersSummary.mockImplementation(() => mockResult);
  });

  it("initialises nationality and page from search params", () => {
    render(
      <MemoryRouter initialEntries={["/users?nat=us&page=3"]}>
        <UsersPage />
      </MemoryRouter>
    );

    expect(mockUseUsersSummary).toHaveBeenCalledWith("us", 3);
    expect(screen.getByLabelText("Select nationality")).toHaveValue("us");
    expect(screen.getByText("Page 3")).toBeInTheDocument();
  });

  // it("increments page via pagination controls", async () => {
  //   const user = userEvent.setup();

  //   render(
  //     <MemoryRouter initialEntries={["/users?nat=gb&page=1"]}>
  //       <UsersPage />
  //     </MemoryRouter>
  //   );

  //   await user.click(screen.getByRole("button", { name: "Next" }));

  //   const lastCall = mockUseUsersSummary.mock.calls.at(-1);
  //   expect(lastCall?.[0]).toBe("gb");
  //   expect(lastCall?.[1]).toBe(2);
  //   expect(screen.getByText("Page 2")).toBeInTheDocument();
  // });

  // it("resets page when nationality changes", async () => {
  //   const user = userEvent.setup();

  //   render(
  //     <MemoryRouter initialEntries={["/users?nat=fr&page=4"]}>
  //       <UsersPage />
  //     </MemoryRouter>
  //   );

  //   const select = screen.getByRole("combobox", { name: /nationality/i });
  //   const germany = screen.getByRole("option", { name: "Germany" });

  //   await user.selectOptions(select, germany);

  //   await waitFor(() => {
  //     expect(mockUseUsersSummary).toHaveBeenLastCalledWith("de", 1);
  //   });

  //   expect(screen.getByText("Page 1")).toBeInTheDocument();
  // });
});
