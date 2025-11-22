import { useOutletContext } from "react-router";
import StaticRatings from "../../../components/ratings/StaticRatings";

export default function Reviews() {
  const { reviewsObj } = useOutletContext();
  return (
    <div>
      <h2 className="font-pop m-4 text-4xl font-semibold">Customer Reviews</h2>
      {reviewsObj.map(
        ({ rating, comment, date, reviewerName, reviewerEmail }) => (
          <div
            className="mb-6 rounded-lg border border-gray-500 bg-gray-200 p-4 shadow"
            key={date}
          >
            <div className="font-pop flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-gray-800">
                  {reviewerName}
                </div>
                <div className="text-gray-400">
                  &lt;
                  <span className="text-sm font-normal text-gray-500">
                    {reviewerEmail}
                  </span>
                  &gt;
                </div>
                {/*<div>{date}</div> */}
              </div>
              <StaticRatings ratings={rating} />
            </div>
            <div className="text-left">{comment}</div>
          </div>
        ),
      )}
    </div>
  );
}
