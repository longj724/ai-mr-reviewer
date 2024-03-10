// External Dependencies
import React from "react";

// Relative Dependencies
import Sidebar from "../_components/sidebar";

type Props = {};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <main className="flex-1">
        <Sidebar />
        <div className="flex min-h-screen flex-col sm:border-r sm:border-zinc-700 md:ml-60">
          <div className="flex flex-grow flex-col space-y-2 bg-zinc-100 px-4 pb-4 pt-2">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
