import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import s from './ProductDetail.module.scss'; // Подключаем файл стилей
import config from '../../config';

const Modal = ({ show, onClose, product }) => {
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');
  const [meetingDuration, setMeetingDuration] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [services, setServices] = useState({
    domination: false,
    bondage: false,
    eroticMassage: false,
    tying: false,
    threesomeMFM: false,
    threesomeFMF: false,
    rolePlaying: false,
  });

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
    setServices(prevServices => ({
      ...prevServices,
      [service]: !prevServices[service],
    }));
  };

  const handleOrderConfirm = () => {
    alert('Заказ подтвержден!');
  };

  return (
    <div className={s.modal} onClick={handleOverlayClick}>
      <div className={s.modalContent}>
        <h2>Оформление встречи</h2>
        <div className={s.inputBox}>
          <div className={s.formUp}>
          <label htmlFor="meetingDate">Дата:</label>
          <input
            type="date"
            id="meetingDate"
            value={meetingDate}
            onChange={e => setMeetingDate(e.target.value)}
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
                setMeetingTime(`${e.target.value}:${meetingTime.split(':')[1]}`)
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
                setMeetingTime(`${meetingTime.split(':')[0]}:${e.target.value}`)
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
            onChange={e => setMeetingDuration(e.target.value)}
          >
            <option value="">Выберите длительность</option>
            <option value="1">1 час / 5000₽</option>
            <option value="3">3 часа / 10000₽</option>
            <option value="night">Ночь / 20000₽</option>
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
              checked={services.domination}
              onChange={() => handleServiceChange('domination')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Анал +1500₽</p>
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
          <p>Доминирование +2000₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.eroticMassage}
              onChange={() => handleServiceChange('eroticMassage')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Бондаж +1000₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.tying}
              onChange={() => handleServiceChange('tying')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Массаж эро +1500₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.threesomeMFM}
              onChange={() => handleServiceChange('threesomeMFM')}
            />
            <span className={s.slider}></span>
          </label>
          <p>Связывание +2000₽</p>
        </div>
        <div className={s.formGroup}>
          <label className={s.switch}>
            <input
              type="checkbox"
              checked={services.threesomeFMF}
              onChange={() => handleServiceChange('threesomeFMF')}
            />
            <span className={s.slider}></span>
          </label>
          <p>МЖМ +5000₽</p>
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
          <p>ЖМЖ +8500₽</p>
        </div>
        <div className={s.modalActions}>
          <button onClick={handleOrderConfirm} className={s.modalButton}>
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
      {product.imageUrl && (
        <img
          className={s.imgDet}
          crossOrigin="anonymous"
          src={`${config.baseURL}${product.imageUrl}`}
          alt={product.name}
        />
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
                  Заказать девочку
                </button>
              </tr>
            </tbody>
          </table>
          {/* <div className={s.boxPlus}> */}
            <p className={s.plus}>Классический секс</p>
            <p className={s.plus}>МБР (минет без резинки)</p>
            <p className={s.plus}>Поцелуи</p>
            <p className={s.plus}>Куни</p>
          {/* </div> */}
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
