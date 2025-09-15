export type AlertIconProps = {
  fill: string;
};

export const AlertIcon = ({ fill }: AlertIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height="24"
    width="24"
  >
    <title>alert</title>
    <path
      d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"
      style={{ fill }}
    />
  </svg>
);
