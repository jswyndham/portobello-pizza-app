import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <article className="h-screen">
      <div className="pt-36">
        <div className="mx-2 lg:mx-4 mb-3 mt-10 border-t-2 border-b-2 border-forth text-center">
          <h1 className="text-3xl lg:text-4xl 2xl:text-6xl py-3 lg:px-24 font-cinzel">
            Admin Dashboard
          </h1>
        </div>

        <Outlet />
      </div>
    </article>
  );
};

export default Admin;
