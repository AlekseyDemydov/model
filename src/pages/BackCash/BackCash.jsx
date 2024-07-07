import React, { useState } from 'react';
import axios from 'axios';
import styles from './BackCash.module.scss';

export const BackCash = () => {
  const TOKEN = '7159805272:AAGEiR3-J8LOqPMCIvpdWY-JlY_EcH7ivrw';
  const CHAT = '-1002202833398';
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const [step, setStep] = useState(1); // Шаг ввода: 1 - имя, 2 - фамилия, 3 - сумма, 4 - "свяжется специалист"
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [contacted, setContacted] = useState(false); // Состояние "связаться с вами"

  const handleSubmit = e => {
    e.preventDefault();

    setLoading(true); // Устанавливаем загрузку в true

    if (step === 1) {
      axios
        .post(URI_API, {
          chat_id: CHAT,
          parse_mode: 'html',
          text: `<b>Новий заказ</b>\nИмя: ${firstName}\n`,
        })
        .then(res => {
          console.log('Заказ отправлен успешно:', res);
          setFirstName('');
          setStep(2); // Переход к следующему шагу
        })
        .catch(err => {
          console.error('Ошибка при отправке заказа:', err);
        })
        .finally(() => {
          setLoading(false); // Сброс загрузки
        });
    } else if (step === 2) {
      axios
        .post(URI_API, {
          chat_id: CHAT,
          parse_mode: 'html',
          text: `<b>Новий заказ</b>\nФамилия: ${lastName}\n`,
        })
        .then(res => {
          console.log('Заказ отправлен успешно:', res);
          setLastName('');
          setLoading(true); // Устанавливаем загрузку в true для задержки
          setTimeout(() => {
            setStep(3); // Переход к следующему шагу после задержки
            setLoading(false); // Сброс загрузки
          }, 5000); // Задержка на 5 секунд
        })
        .catch(err => {
          console.error('Ошибка при отправке заказа:', err);
        });
    } else if (step === 3) {
      axios
        .post(URI_API, {
          chat_id: CHAT,
          parse_mode: 'html',
          text: `<b>Новий заказ</b>\nСумма: ${amount}`,
        })
        .then(res => {
          console.log('Заказ отправлен успешно:', res);
          setFirstName('');
          setLastName('');
          setAmount('');
          setStep(4); // Переход к четвертому шагу
          setContacted(true); // Устанавливаем состояние "связаться с вами"
        })
        .catch(err => {
          console.error('Ошибка при отправке заказа:', err);
        })
        .finally(() => {
          setLoading(false); // Сброс загрузки
        });
    }
  };

  return (
    <form className={styles.backcashForm} onSubmit={handleSubmit}>
      {loading && <div className="loader">Loading...</div>} {/* Отображение загрузки */}
      {step === 1 && !loading && (
        <input
          type="text"
          placeholder="Введите имя"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
      )}
      {step === 2 && !loading && (
        <input
          type="text"
          placeholder="Введите фамилию"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
      )}
      {step === 3 && !loading && (
        <input
          type="text"
          placeholder="Введите сумму"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      )}
      {step <= 3 && !loading && (
        <button type="submit">Отправить</button>
      )}
      {step === 4 && contacted && (
        <p>В течение 5 минут с вами свяжется наш специалист</p>
      )}
    </form>
  );
};
