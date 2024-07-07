import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import s from './ProductDetail.module.scss'; // Подключаем файл стилей
import config from '../../config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductSlider from './Slider/Slider';

const Modal = ({ show, onClose, product }) => {
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');
  const [meetingDuration, setMeetingDuration] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [services, setServices] = useState({
    car: false,
    qwest: false,
    card: false,
    massage: false,
    jump: false,
    freegame: false,
    goup: false,
    rolePlaying: false,
  });
  const navigate = useNavigate();

  const price = {
    car: 1500,
    qwest: 2000,
    card: 1000,
    massage: 1500,
    jump: 2000,
    freegame: 5000,
    goup: 8500,
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
              checked={services.car}
              onChange={() => handleServiceChange('car')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Авто +{price.car}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.qwest}
              onChange={() => handleServiceChange('qwest')}
            />
            <span className={s.slider}></span>
          </label>
          <p>qwest +{price.qwest}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.card}
              onChange={() => handleServiceChange('card')}
            />
            <span className={s.slider}></span>
          </label>
          <p>card +{price.card}₽</p>
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
          <p>Массаж +{price.massage}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.freegame}
              onChange={() => handleServiceChange('freegame')}
            />
            <span className={s.slider}></span>
          </label>
          <p>freegame +{price.freegame}₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.goup}
              onChange={() => handleServiceChange('goup')}
            />
            <span className={s.slider}></span>
          </label>
          <p>goup +{price.goup}₽</p>
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
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.jump}
              onChange={() => handleServiceChange('jump')}
            />
            <span className={s.slider}></span>
          </label>
          <p>jump +{price.jump}₽</p>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/girls/${id}`);
        setProduct(response.data);
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
      {/* {product.imageUrl && (
        <img
          className={s.imgDet}
          crossOrigin="anonymous"
          src={`${config.baseURL}${product.imageUrl}`}
          alt={product.name}
        />
      )} */}
      {product.imageUrl && (
        <ProductSlider images={product.imageUrl}/>
      )}
      <div className={s.prodInfo}>
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
                  Заказать игру
                </button>
              </tr>
            </tbody>
          </table>
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
