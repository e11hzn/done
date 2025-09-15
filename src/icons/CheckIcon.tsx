export type CheckIconProps = {
  fill: string;
};

export const CheckIcon = ({ fill }: CheckIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Mark/Unmark this Todo as done</title>
    <path
      d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
      style={{ fill }}
    />
  </svg>
);
