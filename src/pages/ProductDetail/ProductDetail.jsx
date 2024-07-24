import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import s from './ProductDetail.module.scss'; // Подключаем файл стилей
import config from '../../config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductSlider from './Slider/Slider';
import Example from './ModalForNumber/ModalForNumber';

const Modal = ({ show, onClose, product }) => {
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');
  const [meetingDuration, setMeetingDuration] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [services, setServices] = useState({
    anal: false,
    domination: false,
    bondage: false,
    massage: false,
    gmg: false,
    svyazivanie: false,
    mgm: false,
    rolePlaying: false,
  });
  const navigate = useNavigate();

  const price = {
    anal: 1500,
    domination: 2000,
    bondage: 1000,
    massage: 1500,
    gmg: 2000,
    svyazivanie: 5000,
    mgm: 8500,
    rolePlaying: 3000,
  };

  useEffect(() => {
    if (show) {
      document.body.classList.add(s.noScroll);
    } else {
      document.body.classList.remove(s.noScroll);
    }
    return () => {
      document.body.classList.remove(s.noScroll);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleServiceChange = service => {
    setServices(prevServices => {
      const newServices = {
        ...prevServices,
        [service]: !prevServices[service],
      };

      // Пересчитываем общую стоимость
      let newTotalPrice = 0;

      // Добавляем стоимость всех выбранных услуг
      for (const [key, value] of Object.entries(newServices)) {
        if (value) {
          newTotalPrice += price[key];
        }
      }

      setTotalPrice(newTotalPrice);

      return newServices;
    });
  };

  const handlePaymentClick = () => {
    // Проверяем, заполнены ли все обязательные поля
    if (
      !meetingDate ||
      !meetingTime ||
      !meetingPlace ||
      !meetingDuration
    ) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return; // Останавливаем выполнение функции, чтобы не произошло перехода на страницу оплаты
    }

    // Сохраняем выбранные услуги и общую стоимость в local storage
 
    localStorage.setItem('totalPrice', totalPrice);
   

    setTimeout(() => {
    navigate('/payment');
  }, 2000); // Задержка на 2 секунды
  
  };
  const handleMeetingDurationChange = duration => {
    setMeetingDuration(duration);
  
    // Сохраняем выбранную длительность в локальное хранилище
    localStorage.setItem('meetingDuration', duration);
  };
  return (
    <div className={s.modal} onClick={handleOverlayClick}>
      <div className={s.modalContent}>
        <h2>Оформление встречи</h2>
        <div className={s.inputBox}>
          <div className={s.formUp}>
            <label htmlFor="meetingDate">Дата:</label>
            <DatePicker
          selected={meetingDate}
          onChange={date => setMeetingDate(date)}
          placeholderText="выберите дату"
          dateFormat="yyyy-MM-dd"
          className={s.dateInput}
          id="meetingDate"
        />
          </div>
          <div className={s.formUp}>
            <label htmlFor="meetingTime">Время:</label>
            <div className={s.time}>
              <select
                className={s.hour}
                id="meetingHour"
                value={meetingTime.split(':')[0]} // Получаем часы из текущего времени
                onChange={e =>
                  setMeetingTime(
                    `${e.target.value}:${meetingTime.split(':')[1]}`
                  )
                } // Обновляем только часы
              >
                {[...Array(24).keys()].map(hour => (
                  <option key={hour} value={hour}>
                    {hour < 10 ? `0${hour}` : hour}
                  </option>
                ))}
              </select>
              :
              <select
                className={s.minute}
                id="meetingMinute"
                value={meetingTime.split(':')[1]} // Получаем минуты из текущего времени
                onChange={e =>
                  setMeetingTime(
                    `${meetingTime.split(':')[0]}:${e.target.value}`
                  )
                } // Обновляем только минуты
              >
                {[...Array(60).keys()].map(minute => (
                  <option key={minute} value={minute}>
                    {minute < 10 ? `0${minute}` : minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={s.formUp}>
            <label htmlFor="meetingPlace">Место:</label>
            <select
              id="meetingPlace"
              value={meetingPlace}
              onChange={e => setMeetingPlace(e.target.value)}
            >
              <option value="">Выберите место</option>
              <option value="Отель">Отель</option>
              <option value="У модели">У модели</option>
              <option value="Салон">Салон</option>
              <option value="У клиента">У клиента</option>
            </select>
          </div>
          <div className={s.formUp}>
            <label htmlFor="meetingDuration">Длительность:</label>
            <select
              id="meetingDuration"
              value={meetingDuration}
              onChange={e => handleMeetingDurationChange(e.target.value)}
            >
              <option value="">Выберите длительность</option>
              <option value={product.priceOne}>1 час / {product.priceOne}₽</option>
              <option value={product.priceThree}>3 часа / {product.priceThree}₽</option>
              <option value={product.priceNight}>Ночь / {product.priceNight}₽</option>
            </select>
          </div>
        </div>
        <div className={s.formUp}>
          <label htmlFor="contactInfo">Контактная информация:</label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={e => setContactInfo(e.target.value)}
            placeholder="Телефон/Telegram/Whatsapp"
          />
        </div>
        <div className={`${s.formGroup} ${s.margin}`}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.anal}
              onChange={() => handleServiceChange('anal')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Анал +{price.anal}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.domination}
              onChange={() => handleServiceChange('domination')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Доминирование +{price.domination}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.bondage}
              onChange={() => handleServiceChange('bondage')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Бондаж +{price.bondage}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.massage}
              onChange={() => handleServiceChange('massage')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Массаж эро +{price.massage}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.svyazivanie}
              onChange={() => handleServiceChange('svyazivanie')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Связывание  +{price.svyazivanie}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.mgm}
              onChange={() => handleServiceChange('mgm')}
            />
            <span className={s.slider}></span>
          </label>
          <p>МЖМ +{price.mgm}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.gmg}
              onChange={() => handleServiceChange('gmg')}
            />
            <span className={s.slider}></span>
          </label>
          <p>ЖМЖ +{price.gmg}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.rolePlaying}
              onChange={() => handleServiceChange('rolePlaying')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Ролевые игры +{price.rolePlaying}₽</p>
        </div>
        
        <div className={s.modalActions}>
          <p className={s.totalPrice}>Итого: {totalPrice}₽</p>
          <button onClick={handlePaymentClick} className={s.modalButton}>
            Оплатить
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  const userEmail = localStorage.getItem('adminEmail') || '';

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  const openModal1 = () => setModal1Open(true);
  const closeModal1 = () => setModal1Open(false);
  const openModal2 = () => setModal2Open(true);
  const closeModal2 = () => setModal2Open(false);
  const openModal3 = () => setModal3Open(true);
  const closeModal3 = () => setModal3Open(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/girls/${id}`);
        setProduct(response.data);
        localStorage.setItem('tgAdmin', response.data.tgAdmin);
      } catch (error) {
        console.error('Ошибка при получении деталей продукта:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className={s.detBox}>
     
      {product.imageUrl && (
        <ProductSlider images={product.imageUrl}/>
      )}
      <div className={s.prodInfo}>
      <div className={s.iconMass}>
<div  onClick={openModal1} className={s.iconImg}> 
 <svg xmlns="https://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 64 64"><path fill="#5c6d6d" d="M50 4.1c0-2-2.1-4.1-4.3-4.1H18.3C16.1 0 14 2.1 14 4.1v55.7c0 2.1 2.1 4.1 4.3 4.1h27.5c2.1 0 4.3-2.1 4.3-4.1V4.1z"></path><path fill="#212528" d="M49 59c0 2-2 4-4 4H19c-2 0-4-2-4-4V5c0-2 2-4 4-4h26c2 0 4 2 4 4z"></path><g fill="#94989b"><circle cx="43.5" cy="4.5" r="1"></circle><path d="M35 4.5c0 .3-.1.5-.3.5h-5.4c-.2 0-.3-.2-.3-.5c0-.2.1-.5.3-.5h5.4c.2 0 .3.3.3.5"></path></g><path fill="#3e4347" d="M17 8h30v48H17z"></path><path fill="#94989b" d="M35.8 60.2c0 .4-.3.8-.8.8h-6c-.4 0-.8-.3-.8-.8v-1.5c0-.4.3-.8.8-.8h6c.4 0 .8.3.8.8z"></path><path fill="#42ade2" d="M24 14.7c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#c7e755" d="M31 14.7c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#f2b200" d="M38 14.7c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#42ade2" d="M45 14.7c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#c7e755" d="M24 53.2c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#ff435e" d="M31 53.2c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#42ade2" d="M38 53.2c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#c28fef" d="M45 53.2c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#c7e755" d="M24 33.9c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#c28fef" d="M31 33.9c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#42ade2" d="M38 33.9c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#ff435e" d="M24 27.5c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#f2b200" d="M31 27.5c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#c7e755" d="M38 27.5c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#f2b200" d="M45 27.5c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#c28fef" d="M24 21.1c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#42ade2" d="M31 21.1c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#ff435e" d="M38 21.1c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path><path fill="#c28fef" d="M45 21.1c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8v-3.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8z"></path></svg>
</div>
<div  onClick={openModal2} className={s.iconImg}> 
<svg xmlns="https://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 256 256"><defs><linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#2AABEE"></stop><stop offset="100%" stopColor="#229ED9"></stop></linearGradient></defs><path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"></path><path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"></path></svg>
</div>
<div  onClick={openModal3} className={s.iconImg}> 
<svg xmlns="https://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#1FAF38"></stop><stop offset="100%" stopColor="#60D669"></stop></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#F9F9F9"></stop><stop offset="100%" stopColor="#FFF"></stop></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"></path><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"></path><path fill="#FFF" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"></path></svg>
</div>
</div>
<Example
        show={modal1Open || modal2Open || modal3Open}
        onHide={() => {
          closeModal1();
          closeModal2();
          closeModal3();
        }}
      />
        <h2>{product.name}</h2>
        <div className={s.description}>
          <table className={s.tableDescr}>
            <tbody>
              <tr>
                <td className={s.tableDescLabel}>Время</td>
                <td className={s.tableDescValue}>Цена</td>
              </tr>
              {product.priceOne && (
                <tr>
                  <td className={s.tableDescLabel}>Цена за час:</td>
                  <td className={s.tableDescValue}>{product.priceOne} ₽</td>
                </tr>
              )}
              {product.priceThree && (
                <tr>
                  <td className={s.tableDescLabel}>Цена за три часа:</td>
                  <td className={s.tableDescValue}>{product.priceThree} ₽</td>
                </tr>
              )}
              {product.priceNight && (
                <tr>
                  <td className={s.tableDescLabel}>Цена за ночь:</td>
                  <td className={s.tableDescValue}>{product.priceNight} ₽</td>
                </tr>
              )}
              <tr className={s.boxbtnBye}>
                <button className={s.btnBye} onClick={() => setShowModal(true)}>
                  Заказать девочку
                </button>
              </tr>
            </tbody>
          </table>
          <p className={s.plus}>Классический секс</p>
          <p className={s.plus}>МБР (минет без резинки)</p>
          <p className={s.plus}>Поцелуи</p>
          <p className={s.plus}>Куни</p>
        </div>
      </div>
      {userEmail === 'ivan@gmail.com' && (
        <NavLink
          to={`/girls/${id}/edit`}
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
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;
