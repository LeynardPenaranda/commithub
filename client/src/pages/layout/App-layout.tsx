import Header from "@/components/header-components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] relative">
      <div className="sticky bg-background top-0 z-50">
        <Header />
      </div>
      <main className="mt-20 mb-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
