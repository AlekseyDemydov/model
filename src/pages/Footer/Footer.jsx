import React from 'react';
import s from './Footer.module.scss';
import footimg from './img/footimg.png';

const Footer = () => {
  return (
    <>
      <div className={s.footer}>
        <img src={footimg} alt="footimg" className={s.footimg} />
        <p className={s.discription}>
          © 2019 - 2024 ООО "Эскорт агентство Amo-Girls" | Все права защищены.
          Пользовательское соглашение
        </p>
      </div>
    </>
  );
};

export default Footer;
