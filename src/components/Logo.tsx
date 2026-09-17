type LogoProps = {
  size?: number;
};

export function Logo({ size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="6" fill="#18181b" />
      <path
        d="M16 8.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5c1.55 0 2.99-.47 4.18-1.28l2.3 2.3 1.41-1.41-2.24-2.24A7.47 7.47 0 0 0 23.5 16c0-4.14-3.36-7.5-7.5-7.5Zm0 2c3.03 0 5.5 2.47 5.5 5.5s-2.47 5.5-5.5 5.5-5.5-2.47-5.5-5.5 2.47-5.5 5.5-5.5Z"
        fill="#fafafa"
      />
      <rect x="14.25" y="14" width="3.5" height="4.5" rx="0.6" fill="#fafafa" />
    </svg>
  );
}
