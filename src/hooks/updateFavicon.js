export const update = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document
    .querySelector("link[rel='icon']")
    ?.setAttribute(
      "href",
      isDark ? "/favicons/favicon-dark.svg" : "/favicons/favicon.svg",
    );
};
