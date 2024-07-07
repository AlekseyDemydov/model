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
  const [numberCardSBP, setNumberCardSBP] = useState('');
  const [bank, setBank] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setIsVisible(false);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/card/668adaeb859a580507f9c1af`);
        const { data } = response;
        setNumberCard(data.numberCard);
        setNumberCardSBP(data.numberCardSBP);
        setBank(data.bank);
        setName(data.name);
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
      const response = await axios.put(`${config.baseURL}/card/668adaeb859a580507f9c1af`, {
        numberCard: numberCard,
        numberCardSBP: numberCardSBP,
        bank: bank,
        name: name,
      });

      setNumberCard(response.data.numberCard);
      setNumberCardSBP(response.data.numberCardSBP);
      setBank(response.data.bank);
      setName(response.data.name);

      Notiflix.Notify.success('Карта успешно обновлена');
    } catch (error) {
      console.error('Ошибка при обновлении карты:', error);
      Notiflix.Notify.failure('Ошибка при обновлении карты');
    }
  };

  const handleChangeNumberCard = (e) => {
    setNumberCard(e.target.value);
  };

  const handleChangeNumberCardSBP = (e) => {
    setNumberCardSBP(e.target.value);
  };

  const handleChangeBank = (e) => {
    setBank(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={s.payment}>
      <div className={s.cardForPay}>
        <h3>Карта для оплаты</h3>
        <div className={s.boxInputPay}>
          <img src={imgPay} alt="imgPay" className={s.imgPay} />
          <input type="text" className={s.inputPay} value={numberCard} onChange={handleChangeNumberCard} />
        </div>
        <input type="text" className={s.inputPay} value={numberCardSBP} onChange={handleChangeNumberCardSBP} />
        <input type="text" className={s.inputPay} value={bank} onChange={handleChangeBank} />
        <input type="text" className={s.inputPay} value={name} onChange={handleChangeName} />
      </div>
      <button className={s.btnBack} onClick={handleSubmit}>обновить</button>
    </div>
  );
};

export default Card;
