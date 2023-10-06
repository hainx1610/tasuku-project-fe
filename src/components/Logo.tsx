import { Link as RouterLink } from "react-router-dom";
import logoImg from "../logo.png";

function Logo() {
  const logo = (
    <div className=" w-10 h-10">
      <img src={logoImg} alt="logo" />
    </div>
  );
  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
