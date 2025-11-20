export default function StaticRatings({ ratings }) {
  const array = new Array(5).fill(null);
  return (
    <div className="justify-content flex items-center gap-1">
      {array.map((el, i) => {
        const index = i + 1;
        return (
          <div key={i}>
            {index <= ratings ? (
              <span>{"\u2B50"}</span>
            ) : (
              <span className="border-yellow-400 text-2xl font-semibold">
                {"\u2606"}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
