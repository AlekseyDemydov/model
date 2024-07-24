import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import s from './Main.module.scss';
import List from 'pages/List/List';
import config from 'config';
import './Main.css';
import cities from './city';

const Main = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState('');
  const [showList, setShowList] = useState(false);

  const sortedCities = cities.sort().map(city => ({ value: city, label: city }));

  useEffect(() => {
    const storedEmail = localStorage.getItem('adminEmail') || '';
    setUserEmail(storedEmail);

    const storedCity = localStorage.getItem('city') || '';
    if (!storedCity) {
      setShowModal(true);
    } else {
      // setTimeout(() => {
        setShowList(true);
      // }, 2000); // Задержка на 2 секунды
    }
  }, []);

  const handleDelete = (productId) => {
    axios
      .delete(`${config.baseURL}/girls/${productId}`)
      .then((response) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((error) => {
        console.error('Ошибка при удалении продукта:', error);
      });
  };

  useEffect(() => {
    axios
      .get(`${config.baseURL}/girls`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке продуктов:', error);
        setError(
          'Не удалось загрузить список продуктов. Пожалуйста, попробуйте позже.'
        );
      });
  }, []);

  const handleCitySubmit = () => {
    localStorage.setItem('city', city);
    setShowModal(false);
    // setTimeout(() => {
      setShowList(true);
    // }, 2000); // Задержка на 2 секунды после закрытия модалки
  };

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption ? selectedOption.value : '');
  };

  const filterOption = (option, inputValue) => {
    return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    input: (provided) => ({
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
    placeholder: (provided) => ({
      ...provided,
      color: '#ccc',
    }),
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {showModal && (
        <div className={s.overlay}>
          <div className={s.modal}>
            <h2>Введите ваш город</h2>
            <Select
              value={sortedCities.find(option => option.value === city)}
              onChange={handleCityChange}
              options={sortedCities}
              placeholder="Ваш город"
              isClearable
              filterOption={filterOption}
              styles={customStyles}
            />
            <button onClick={handleCitySubmit}>Сохранить</button>
          </div>
        </div>
      )}
      {userEmail === 'ivan@gmail.com' && (
        <NavLink to="/girls/add" className={s.btnCreate}>
          Создать
        </NavLink>
      )}
      <div className={s.listContainer}>
        <div className={s.listBox}>
          {showList ? (
            <List products={products} handleDelete={handleDelete} />
          ) : (
            <div className="loader">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
