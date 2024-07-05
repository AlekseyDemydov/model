import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import s from './Payment.module.scss';
import imgPay from './img/secure-payment-icon.webp';
import config from '../../config'; // Предполагается, что у вас есть файл config.js
import { useVisibility } from 'components/Layout/VisibilityContext';

const Card = () => {
  const { setIsVisible } = useVisibility();
  const [numberCard, setNumberCard] = useState('');

  useEffect(() => {
    setIsVisible(false);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/card/6687d03eeb0990fe3bc87a46`);
        const { data } = response;
        console.log(data.numberCard)
        setNumberCard(data.numberCard)
      } catch (error) {
        console.error("Ошибка при получении данных модели:", error);
      }
    };

    fetchData();

    return () => setIsVisible(true); // Восстановить видимость после ухода со страницы
  }, [setIsVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${config.baseURL}/card/6687d03eeb0990fe3bc87a46`, {
        numberCard: numberCard // Отправляем номер карты
      });
    
        setNumberCard(response.data.numberCard);
        Notiflix.Notify.success('Карта успешно обновлена');
      
    } catch (error) {
      console.error('Ошибка при обновлении карты:', error);
      Notiflix.Notify.failure('Ошибка при обновлении карты');
    }
  };

  const handleChange = (e) => {
    setNumberCard(e.target.value);
  };

  return (
    <div className={s.payment}>
      <div className={s.cardForPay}>
        <h3>Карта для оплаты</h3>
        <div className={s.boxInputPay}>
          <img src={imgPay} alt="imgPay" className={s.imgPay} />
          <input type="text" className={s.inputPay} value={numberCard} onChange={handleChange} />
        </div>
      </div>
      <button className={s.btnBack} onClick={handleSubmit}>обновить</button>
    </div>
  );
};

export default Card;
