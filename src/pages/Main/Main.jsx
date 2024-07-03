import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios';
import s from './Main.module.scss';
import List from 'pages/List/List';
import config from 'config';

const Main = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('adminEmail') || '';
    setUserEmail(storedEmail);
  }, []);

  const handleDelete = productId => {
    axios
      .delete(`${config.baseURL}/girls/${productId}`)
      .then(response => {
        setProducts(prevProducts =>
          prevProducts.filter(product => product._id !== productId)
        );
      })
      .catch(error => {
        console.error('Ошибка при удалении продукта:', error);
      });
  };

  useEffect(() => {
    axios
      .get(`${config.baseURL}/girls`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке продуктов:', error);
        setError(
          'Не удалось загрузить список продуктов. Пожалуйста, попробуйте позже.'
        );
      });
  }, []); // Добавляем пустой массив зависимостей, чтобы выполнить запрос только один раз при монтировании компонента

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {userEmail === 'ivan@gmail.com' && (
        <NavLink to="/girls/add" className={s.btnCreate}>
          Создать
        </NavLink>
      )}
      <div className={s.listContainer}>
        <div className={s.listBox}>
          <List products={products} handleDelete={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default Main;
