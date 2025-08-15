import { Link } from "react-router-dom";
import ModeToggle from "./header-toogle-darkmode";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="border-b border-border w-full flex justify-between items-center">
      <div className="pl-10">
        <Link to="/">
          <img src="/images/commithubLogo.png" alt="Logo" className="w-12" />
        </Link>
      </div>
      <div className="flex items-center gap-5 pr-10">
        <div>
          <Link to="/developer" className="">
            Developers
          </Link>
        </div>
        <ModeToggle />
        <div>
          <Button variant="ghost">Sign In</Button>
          <Button variant="outline">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
