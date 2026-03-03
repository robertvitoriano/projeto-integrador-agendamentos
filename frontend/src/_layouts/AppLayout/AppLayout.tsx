import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-background gap-4">
      <div className="px-9  py-4 overflow-auto flex flex-col h-[90vh] scrollbar-custom page-container ">
        <Outlet />
      </div>
    </div>
  );
}
