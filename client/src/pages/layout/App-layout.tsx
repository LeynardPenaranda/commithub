import Header from "@/components/header-components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <Header />
      <main className="mt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
