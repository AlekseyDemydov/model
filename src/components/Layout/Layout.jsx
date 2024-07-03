import React from 'react';
import s from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from 'pages/Header/Header';
import Footer from 'pages/Footer/Footer';

export const Layout = () => {

  return (
    <>
      <div className={s.container}>
        <Header />
        <div className={s.body}>
          <Outlet />
        </div>
        <Footer/>
      </div>
    </>
  );
};
