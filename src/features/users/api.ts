import {
  API_BASE,
  DEFAULT_PAGE,
  DEFAULT_RESULTS,
  DEFAULT_SEED,
} from "../../shared/config";
import type {
  ApiResponse,
  Nationality,
  RandomUserDetails,
  RandomUserSummary,
} from "./types";

const summaryInc = "name,location,email,phone,id,nat";
const detailsInc =
  "gender,name,location,email,dob,registered,phone,cell,id,picture,nat";

export async function fetchUsersSummary(
  nat: Nationality = "gb",
  page: number = DEFAULT_PAGE
): Promise<ApiResponse<RandomUserSummary>> {
  const url = new URL(API_BASE);
  url.searchParams.set("results", String(DEFAULT_RESULTS));
  url.searchParams.set("seed", DEFAULT_SEED);
  url.searchParams.set("nat", nat);
  url.searchParams.set("page", String(page));
  url.searchParams.set("inc", summaryInc);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  return res.json();
}

export async function fetchUsersDetails(
  nat: Nationality = "gb",
  page: number = DEFAULT_PAGE
): Promise<ApiResponse<RandomUserDetails>> {
  const url = new URL(API_BASE);
  url.searchParams.set("results", String(DEFAULT_RESULTS));
  url.searchParams.set("seed", DEFAULT_SEED);
  url.searchParams.set("nat", nat);
  url.searchParams.set("page", String(page));
  url.searchParams.set("inc", detailsInc); // excludes login
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch details: ${res.status}`);
  return res.json();
}
