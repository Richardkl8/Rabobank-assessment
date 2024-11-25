import React, { FC } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col ">
      <Header />
      <div className="mx-auto flex-1 md:container">{children}</div>
      <Footer />
    </div>
  );
};
