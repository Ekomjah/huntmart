import { useRef } from "react";
import { useNavigate } from "react-router";

import { createSearchRouter } from "./searchRouting";

/**
 * Binds InstantSearch's routing to React Router.
 *
 * The `routing` prop is read once when InstantSearch starts and cannot be
 * swapped afterwards, so the router instance is built exactly once and reads
 * `navigate` through a ref to stay current without rebuilding itself.
 *
 * `navigate` with `replace: true` does not emit `popstate`, so InstantSearch's
 * own writes never bounce back through `onUpdate` and re-trigger a search. A
 * real back/forward emits `popstate`, reaches `onUpdate`, and is the only path
 * allowed to drive a search from the URL.
 */
export function useSearchRouter() {
  const navigate = useNavigate();

  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const routerRef = useRef(null);
  if (routerRef.current === null) {
    routerRef.current = createSearchRouter((url) => {
      navigateRef.current(url, { replace: true });
    });
  }

  return { router: routerRef.current };
}
