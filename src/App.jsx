import "./App.css";
import CarouselApp from "./components/carousel/carousel";
import PrimaryAppBar from "./components/AppBar/appBar";

function App() {
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
