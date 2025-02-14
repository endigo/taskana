import React from "react";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./query-provider";

export const AppProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ReactQueryProvider>
      <Toaster position="top-right" />
      {children}
    </ReactQueryProvider>
  );
};

export default AppProviders;
