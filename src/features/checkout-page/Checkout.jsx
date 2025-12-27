import { Link } from "react-router";
import GreenTick from "/static/tick.jpeg";
export function Checkout() {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-[1000px] flex-col items-center justify-center">
      <img src={GreenTick} alt="success tick" className="w-32" />
      <div className="flex flex-col items-center gap-4 p-4 text-center text-gray-800">
        <h1 className="font-pop text-center text-2xl font-bold">
          Thanks for Hunting with us
        </h1>
        <p className="font-pop font-semibold">
          We have received your order and it will be shipped shortly
        </p>
        <Link
          to="/shop"
          className="cta rounded p-4 font-semibold text-gray-50 hover:opacity-90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
