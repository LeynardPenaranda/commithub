import { useTheme } from "../context/theme-provider";
import { Monitor, MoonStar, SunDim } from "lucide-react";
import { Button } from "../ui/button";
const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };
  return (
    <div>
      <Button variant="ghost" onClick={handleToggle}>
        {theme === "light" && <SunDim />}
        {theme === "dark" && <MoonStar />}
        {theme === "system" && <Monitor />}
      </Button>
    </div>
  );
};

export default ModeToggle;
