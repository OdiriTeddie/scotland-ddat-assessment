import type { RandomUserLocation } from "../../features/users/types";

export const formatAddress = (location: RandomUserLocation): string => {
  const parts = [
    `${location.street.number} ${location.street.name}`,
    location.city,
    location.state,
    location.postcode,
    location.country,
  ].filter(Boolean);
  return parts.join(", ");
};

export const fullName = (name: { first: string; last: string }) =>
  `${name.first} ${name.last}`;

export const byNameAZ = <T extends { name: { first: string; last: string } }>(
  a: T,
  b: T
) => {
  const fa = `${a.name.first} ${a.name.last}`.toLocaleLowerCase();
  const fb = `${b.name.first} ${b.name.last}`.toLocaleLowerCase();
  return fa.localeCompare(fb);
};
