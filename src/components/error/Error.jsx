import { Link } from "react-router";
import { useRouteError } from "react-router";
import { House } from "lucide-react";
import "./error.css";
export default function ErrorPage() {
  const error = useRouteError();
  console.error("errorElement: ", error);
  return (
    <div>
      <div className="relative flex w-full">
        <img
          src="https://res.cloudinary.com/ekomjah/image/upload/c_fill,ar_16:9,g_center,w_1600,h_900,e_improve:outdoor,e_sharpen,e_saturation:10,q_auto,f_auto/v1763244678/pic_wtjjr6.jpg"
          alt="error img"
          className="h-screen w-full object-cover object-center"
        />
        <div className="broken absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-between gap-8 rounded-lg p-6">
          <h1 className="font-pop text-5xl! font-bold lg:text-8xl!">
            {error.status}!
          </h1>
          <h2 className="font-pop text-2xl! font-semibold">
            You hit the wrong webpage.
          </h2>
          <Link
            to="/"
            className="mt-4 flex justify-center gap-4 rounded bg-(--hunt-primary) p-4 text-white! hover:opacity-90"
          >
            <House />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
