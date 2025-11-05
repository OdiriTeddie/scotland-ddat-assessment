import type { RandomUserId, RandomUserSummary } from "./types";

export const userKey = (u: RandomUserSummary) => `${u.email}`; // email is unique per payload

export const formatGovIdValue = (id?: RandomUserId) =>
  id?.value?.toString?.().trim() || "N/A";

export const resolveGovIdLabel = (id?: RandomUserId) =>
  id?.name?.trim() || "Government ID";
