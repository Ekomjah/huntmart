import { Link } from "react-router";
import { useRouteError } from "react-router";
import { House } from "lucide-react";
export default function ErrorPage() {
  const error = useRouteError();
  console.log("errorElement: ", error);
  return (
    <div>
      <div className="relative flex w-full">
        <img
          src="https://res.cloudinary.com/ekomjah/image/upload/c_fill,ar_16:9,g_center,w_1600,h_900,e_improve:outdoor,e_sharpen,e_saturation:10,q_auto,f_auto/v1763244678/pic_wtjjr6.jpg"
          alt="error img"
          className="h-screen w-full object-cover object-center"
        />
        <div className="absolute top-1/2 right-2 bottom-2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-red-600/80 p-4 font-mono text-white shadow-lg backdrop-blur-md">
          <h1 className="text-8xl!">{error.status}!</h1>
          <p className="text-xl font-semibold">You hit the wrong webpage.</p>
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
