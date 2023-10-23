import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-container">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <h1 className="title">SNAKE GAME</h1>
    </div>
  );
};

export default Logo;
