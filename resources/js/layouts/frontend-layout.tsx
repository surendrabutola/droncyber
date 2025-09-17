import React from 'react';
import { Head } from "@inertiajs/react";
import TopBar from '@/partial/top-bar';
import Header from '@/partial/header';
import Footer from '@/partial/footer';

type FrontendLayoutProps = {
  children: React.ReactNode;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

export default function FrontendLayout({ children, meta }: FrontendLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900" >
        <Head>
          <title>{meta?.title ?? "Dron Cyber"}</title>
          <meta
            name="description"
            content={meta?.description ?? "Default description for my app"}
          />
          <meta
            name="keywords"
            content={meta?.keywords ?? "laravel, react, inertia"}
          />
        </Head>
        <TopBar></TopBar>
        <Header></Header>
     

      <main className="contents">
        {children}
      </main>
        <Footer></Footer>
      
    </div>
  );
}
