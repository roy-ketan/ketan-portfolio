import type { SVGProps } from "react";

const Cpp = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 32 32">
    <path
      fill="#00599C"
      d="M16 2.5 28 9.25v13.5L16 29.5 4 22.75V9.25L16 2.5z"
    />
    <text
      x="16"
      y="20.5"
      fill="#fff"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="11"
      fontWeight="700"
      textAnchor="middle"
    >
      C++
    </text>
  </svg>
);

export { Cpp };
