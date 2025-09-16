import React from 'react';

const APlus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 17L7 7L10 17" />
    <path d="M5 14H9" />
    <path d="M18 14V10" />
    <path d="M16 12H20" />
  </svg>
);

export default APlus;
