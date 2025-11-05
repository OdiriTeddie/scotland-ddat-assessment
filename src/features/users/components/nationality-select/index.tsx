import type { Nationality } from "../../types";

const options: { value: Nationality; label: string }[] = [
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
];

export const NationalitySelect = ({
  value,
  onChange,
  disabled,
}: {
  value: Nationality;
  onChange: (nat: Nationality) => void;
  disabled?: boolean;
}) => (
  <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
    <span className="nationality">Nationality</span>
    <select
      aria-label="Select nationality"
      data-testid="nationality-select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      className="nationality-select"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
