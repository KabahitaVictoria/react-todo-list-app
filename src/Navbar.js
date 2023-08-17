import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container">
      <div className="nav">
        <h2>React</h2>
        <div className="links">
          <Link to="/" className="link-nav">
            Home
          </Link>
          <Link to="form" className="link-nav">
            To-do
          </Link>
        </div>
      </div>
    </div>
  );
}
