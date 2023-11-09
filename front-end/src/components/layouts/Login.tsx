import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <div className="hidden md:flex flex-col w-full">
        <div className="relative w-full h-full">{children}</div>
      </div>

      <div className="flex md:hidden relative w-full h-full">{children}</div>
    </div>
  );
};
export default LoginLayout;
