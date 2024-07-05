import React from 'react';
import s from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from 'pages/Header/Header';
import Footer from 'pages/Footer/Footer';
import { useVisibility } from './VisibilityContext';

export const Layout = () => {
  const { isVisible } = useVisibility();

  return (
    <>
      <div className={s.container}>
        {isVisible && <Header />}
        <div className={s.body}>
          <Outlet />
        </div>
        {isVisible && <Footer />}
      </div>
    </>
  );
};
