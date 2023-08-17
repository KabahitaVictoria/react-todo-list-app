import { Link } from "react-router-dom";

export default function LandingPage(props) {
  return (
    <div className="intro">
      <h1>Hi, there!</h1>
      <img
        src="https://img.icons8.com/clouds/100/000000/happy.png"
        alt="happy face"
        className="intro--img"
      />
      <p>
        Welcome to <span className="bold">my todo list app</span>. I'm very
        excited to see you.
      </p>
      <button className="link" type="submit">
        <Link to="/form" className="link--a">
          Go to Todos
        </Link>
      </button>
    </div>
  );
}
