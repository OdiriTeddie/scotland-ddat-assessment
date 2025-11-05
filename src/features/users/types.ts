export type NINO = string | null;

export interface RandomUserId {
  name: string | null;
  value: NINO;
}

export interface RandomUserName {
  title: string;
  first: string;
  last: string;
}

export interface RandomUserLocation {
  street: { number: number; name: string };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

export interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface RandomUserSummary {
  name: RandomUserName;
  email: string;
  phone: string;
  location: RandomUserLocation;
  id: RandomUserId;
  nat: string; // e.g., GB
}

export interface RandomUserDetails extends RandomUserSummary {
  gender: "male" | "female" | "other" | string;
  dob: { date: string; age: number };
  registered: { date: string; age: number };
  cell: string;
  picture: RandomUserPicture;
}

export interface ApiResponse<T> {
  results: T[];
  info: { seed: string; results: number; page?: number; version: string };
}

export type Nationality =
  | "gb"
  | "us"
  | "fr"
  | "de"
  | "es"
  | "nl"
  | "au"
  | "ca"
  | string;
