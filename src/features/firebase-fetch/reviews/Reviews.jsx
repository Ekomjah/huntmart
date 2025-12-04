import { useOutletContext } from "react-router";
import StaticRatings from "../../../components/ratings/StaticRatings";

export default function Reviews() {
  const { reviewsObj } = useOutletContext();
  return (
    <div className="w-[95vw] px-4">
      <h2 className="font-pop m-4 text-xl font-semibold">Customer Reviews</h2>
      {reviewsObj.map(
        ({ rating, comment, date, reviewerName, reviewerEmail }) => (
          <div
            className="mb-6 rounded-lg border border-gray-500 bg-gray-200 p-4 shadow"
            key={date}
          >
            <div className="font-pop flex w-full items-start justify-between">
              <div className="m-0 text-sm font-semibold text-gray-800">
                {reviewerName}
              </div>
              <StaticRatings ratings={rating} />
            </div>
            <div className="text-left">{comment}</div>
            <div className="text-left text-gray-400">
              &lt;
              <span className="text-sm font-normal text-gray-500">
                {reviewerEmail}
              </span>
              &gt;
            </div>
          </div>
        ),
      )}
    </div>
  );
}
