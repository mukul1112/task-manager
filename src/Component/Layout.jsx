import React from "react";

function Layout({ header, children }) {
  return (
    <div className="container mx-auto border-2 border-gray-200 rounded-md mt-4">
      <div>
        <h1 className=" border-b-2  p-4">{header}</h1>
      </div>
      <div className="">{children}</div>
    </div>
  );
}

export default Layout;
