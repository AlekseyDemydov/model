import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';
import s from './Payment.module.scss';
import imgPay from './img/secure-payment-icon.webp';
import imgBank from './img/payments22.png';
import config from '../../config'; // Предполагается, что у вас есть файл config.js
import { useVisibility } from 'components/Layout/VisibilityContext';

const Payment = () => {
  const { setIsVisible } = useVisibility();
  const navigate = useNavigate();
  const [numberCard, setNumberCard] = useState('');
  const userEmail = localStorage.getItem('adminEmail') || '';


  const handleClick = () => {
    const tgAdmin =localStorage.getItem('tgAdmin')
    window.open(`${tgAdmin}`, '_blank');
  };

  
  useEffect(() => {
    setIsVisible(false);

    // Выполняем запрос для получения номера карты
    axios.get(`${config.baseURL}/card`)
      .then(response => {
        setNumberCard(response.data[0].numberCard);
      })
      .catch(error => {
        console.error('Ошибка при получении номера карты:', error);
      });

    return () => setIsVisible(true); // Восстановить видимость после ухода со страницы
  }, [setIsVisible]);

  const handleBack = () => {
    navigate(-1); // Возвращает пользователя на предыдущую страницу
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('meetingDuration');
  };
 
  

// Функция для удаления totalPrice из localStorage
function removeTotalPrice() {
  localStorage.removeItem('totalPrice');
  localStorage.removeItem('meetingDuration');
}



// Проверяем при загрузке страницы, что URL не заканчивается на '/payment'
window.addEventListener('DOMContentLoaded', function() {
  var currentURL = window.location.href;

  if (!currentURL.endsWith('/payment')) {
      removeTotalPrice();
  }
});

// Также можно добавить проверку при изменении истории браузера
window.addEventListener('popstate', function(event) {
  var currentURL = window.location.href;

  if (!currentURL.endsWith('/payment')) {
      removeTotalPrice();
  }
});


  const copyToClipboard = () => {
    navigator.clipboard.writeText(numberCard).then(() => {
      Notiflix.Notify.success('Скопировано');
    }).catch(err => {
      console.error('Ошибка при копировании:', err);
    });
  };
  const totalPrice = parseInt(localStorage.getItem('totalPrice')) + parseInt(localStorage.getItem('meetingDuration'));

  return (
    <div className={s.payment}>
      <div className={s.cardForPay}>
        <h3>Карта для оплаты</h3>
        {userEmail === 'ivan@gmail.com' && (
        <NavLink
          to={`/card`}
          style={({ isActive }) => ({
            border: isActive
              ? '3px solid rgb(8, 7, 7)'
              : '1px solid rgb(8, 7, 7)',
          })}
          className={s.btnCor}
        >
          Редактировать
        </NavLink>
      )}
        <div className={s.boxInputPay}>
          <img src={imgPay} alt="imgPay" className={s.imgPay} />
          <input type="text" className={s.inputPay} value={numberCard} readOnly />
        </div>
        <button className={s.btnCopy} onClick={copyToClipboard}>Копировать номер карты</button>
      </div>
      <div className={s.discription}>
        <ol>
          <li>Скопируйте номер карты.</li>
          <li>Откройте приложение вашего банка или перейдите на его веб-сайт.</li>
          <li>Совершите перевод и отправьте чек/квитанцию об оплате менеджеру.</li>
        </ol>
      </div>
      <div className={s.price}>
        <h3>К оплате: {totalPrice} руб</h3>
      </div>
      <input type="text" className={s.inputPay} value={numberCard} readOnly />
      <input type="text" className={s.inputPay} value={numberCard} readOnly />
      <input type="text" className={s.inputPay} value={numberCard} readOnly />
      <button onClick={handleClick}>Отправить чек менеджеру</button>
      <div className={s.bankImg}>
        <img src={imgBank} alt="imgBank" className={s.imgBank} />
        <h4 onClick={handleClick}>
          
          <span className={s.statusIndicator}></span> Онлайн менеджер
        </h4>
      </div>
      <button className={s.btnBack} onClick={handleBack}>Вернуться назад</button>
    </div>
  );
};

export default Payment;
