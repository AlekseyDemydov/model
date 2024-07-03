import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './List.module.scss';
import config from 'config';
import Pagination from 'components/Pagination/Pagination';

const List = ({ products, handleDelete }) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const userEmail = localStorage.getItem('adminEmail') || '';

  useEffect(() => {
    const params = new URLSearchParams(search);
    const pageParam = params.get('page');
    setCurrentPage(parseInt(pageParam, 10) || 1);
  }, [search]);

  const onPageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      navigate(`/?page=${pageNumber}`);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);
const city = localStorage.getItem('city')
  return (
    <Container>
      <Row>
        {currentProducts.map(product => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={4} className={styles.item}>
            <div className={styles.imgBox}>
              <img
                crossOrigin="anonymous"
                src={`${config.baseURL}${product.imageUrl}`}
                alt={product.name}
                className={styles.image}
              />
            </div>
            <div className={styles.description}>
              <h2 className={styles.title}>{product.name}</h2>
              <p>{city}</p>
              <ul className={styles.listDescr}>
                {product.height && <li className={styles.listDesc}>Рост: {product.height}</li>}
                {product.weight && <li className={styles.listDesc}>Вес: {product.weight}</li>}
                {product.age && <li className={styles.listDesc}>Возраст: {product.age}</li>}
                {/* {product.priceOne && <li className={styles.listDesc}>Цена за час: {product.priceOne}</li>}
                {product.priceThree && <li className={styles.listDesc}>Цена за три часа: {product.priceThree}</li>}
                {product.priceNight && <li className={styles.listDesc}>Цена за ночь: {product.priceNight}</li>} */}
              </ul>
            </div>
            {userEmail === 'ivan@gmail.com' && (
              <button
                onClick={() => handleDelete(product._id)}
                className={styles.btnDelete}
              >
                Удалить
              </button>
            )}
            <Link to={`/girls/${product._id}?page=${currentPage}`} className={styles.link}>
              Узнать подробнее
            </Link>
          </Col>
        ))}
      </Row>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Container>
  );
};

List.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      height: PropTypes.number,
      weight: PropTypes.number,
      age: PropTypes.number,
      priceOne: PropTypes.number,
      priceThree: PropTypes.number,
      priceNight: PropTypes.number,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default List;
