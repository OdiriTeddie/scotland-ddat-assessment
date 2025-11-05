import { describe, expect, it } from "vitest";
import {
  formatGovIdValue,
  resolveGovIdLabel,
  userKey,
} from "./utils";

describe("user utils", () => {
  it("returns trimmed ID value or N/A", () => {
    expect(
      formatGovIdValue({ name: "NINO", value: "  QQ123456C  " })
    ).toBe("QQ123456C");
    expect(formatGovIdValue({ name: "SSN", value: "" })).toBe("N/A");
    expect(formatGovIdValue(undefined)).toBe("N/A");
  });

  it("resolves ID label with fallback", () => {
    expect(resolveGovIdLabel({ name: " SSN ", value: "1" })).toBe("SSN");
    expect(resolveGovIdLabel(undefined)).toBe("Government ID");
  });

  it("uses email as the user key", () => {
    const email = "jane.doe@example.com";
    expect(
      userKey({
        email,
        name: { title: "Ms", first: "Jane", last: "Doe" },
        phone: "01234 567890",
        location: {
          street: { number: 1, name: "Main Street" },
          city: "Edinburgh",
          state: "Lothian",
          country: "UK",
          postcode: "EH1",
        },
        id: { name: "NINO", value: "QQ123456C" },
        nat: "gb",
      })
    ).toBe(email);
  });
});
