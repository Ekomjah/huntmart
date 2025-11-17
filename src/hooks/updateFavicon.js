export const update = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document
    .querySelector("link[rel='icon']")
    ?.setAttribute(
      "href",
      isDark ? "/favicon/favicon-dark.svg" : "/favicon/favicon.svg",
    );
};
