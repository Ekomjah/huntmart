export default function StaticRatings({ ratings = 0, size = 16 }) {
  const clamped = Math.max(0, Math.min(5, Math.round(ratings)));
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${clamped} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < clamped ? "#e9c46a" : "none"}
          stroke={i < clamped ? "#e9c46a" : "#d1d5db"}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
