import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-8 py-6 flex flex-col justify-center items-center overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default MainLayout;
