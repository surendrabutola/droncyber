import React from 'react';
import TopBar from '@/partial/top-bar';
import Header from '@/partial/header';
import Footer from '@/partial/footer';

type FrontendLayoutProps = {
  children: React.ReactNode;
};

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900" >
        <TopBar></TopBar>
        <Header></Header>
     

      <main className="contents">
        {children}
      </main>
        <Footer></Footer>
      
    </div>
  );
}
