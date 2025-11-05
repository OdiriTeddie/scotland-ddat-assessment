import { useQuery } from "@tanstack/react-query";
import { fetchUsersSummary, fetchUsersDetails } from "./api";
import { DEFAULT_PAGE } from "../../shared/config";
import type {
  Nationality,
  RandomUserDetails,
  RandomUserSummary,
} from "./types";

export const useUsersSummary = (
  nat: Nationality,
  page: number = DEFAULT_PAGE
) =>
  useQuery({
    queryKey: ["users", "summary", nat, page],
    queryFn: () => fetchUsersSummary(nat, page),
    placeholderData: (previous) => previous,
  });

export const useUsersDetails = (
  nat: Nationality,
  page: number = DEFAULT_PAGE
) =>
  useQuery({
    queryKey: ["users", "details", nat, page],
    queryFn: () => fetchUsersDetails(nat, page),
  });

export const findUserByEmail = (
  email: string,
  list?: RandomUserSummary[] | RandomUserDetails[]
) => list?.find((user) => user.email === email);
