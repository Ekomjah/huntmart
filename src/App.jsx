import "./App.css";
import { useEffect } from "react";
import CarouselApp from "./components/carousel/carousel";
import PrimaryAppBar from "./components/AppBar/appBar";

function App() {
  useEffect(() => {
    const update = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document
        .querySelector("link[rel='icon']")
        ?.setAttribute("href", isDark ? "/favicon-dark.svg" : "/favicon.svg");
    };
    update();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", update);
  }, []);
  return (
    <>
      <PrimaryAppBar />{" "}
      <div style={{ padding: "2rem" }}>
        <CarouselApp />
        <h1>Hello Theme!</h1>
        <p>The theme is now applied to your document.</p>
      </div>
    </>
  );
}

export default App;
