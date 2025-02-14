import React from "react";
import { Toaster } from "react-hot-toast";

export const AppProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Toaster position="top-right" />
      {children}
    </main>
  );
};

export default AppProviders;
