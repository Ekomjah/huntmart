import { Link } from "react-router";
export default function Welcome() {
  return (
    <div>
      <h1>Welcome to Hunt Mart</h1>
      <p>
        where shoppers hunt down the most quality products at unbeatable prices!
      </p>
      <Link to="/shop">Shop Now</Link>
    </div>
  );
}
