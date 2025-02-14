import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import ReactQueryProvider from "./query-provider";

export const AppProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <Toaster position="top-right" />
        {children}
      </ThemeProvider>
    </ReactQueryProvider>
  );
};

export default AppProviders;
