import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <div>Page not Found!</div>
      <Link to={"/"}>Back to Homepage</Link>;
    </div>
  );
}
