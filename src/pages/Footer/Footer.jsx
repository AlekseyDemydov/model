import React from 'react';
import s from './Footer.module.scss';
import footimg from './img/footimg.png';

const Footer = () => {
  return (
    <>
      <div className={s.footer}>
        <img src={footimg} alt="footimg" className={s.footimg} />
        <p className={s.discription}>
        © 2019 - 2024 ООО "Эскорт агентство Queen`s" | Все права защищены.
          <a href="https://telegra.ph/Polzovatelskoe-soglashenie-dlya-klientov-Queens-07-08" target="_blank" rel="noopener noreferrer">
            Пользовательское соглашение
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;