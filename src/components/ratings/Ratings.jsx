import { useState } from "react";
export default function Ratings({ totalStars = 5 }) {
  const [stars, setStars] = useState(0);
  const array = new Array(totalStars).fill(null);
  return (
    <div className="justify-content flex items-center gap-1">
      {array.map((el, i) => {
        const index = i + 1;
        return (
          <div className="cursor-pointer hover:shadow-xl">
            {index <= stars ? (
              <span
                onClick={() => {
                  setStars(index);
                }}
              >
                {"\u2B50"}
              </span>
            ) : (
              <span
                className="border-yellow-400 text-2xl font-semibold"
                onClick={() => setStars(index)}
              >
                {"\u2606"}
              </span>
            )}
          </div>
        );
      })}{" "}
    </div>
  );
}
