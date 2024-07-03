import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import styles from './Pagination.module.css';
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <BootstrapPagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
        className={`${styles['pagination-item']} ${number === currentPage ? styles.active : ''}`}
      >
        {number}
      </BootstrapPagination.Item>
    );
  }

  return (
    <BootstrapPagination className={styles.pagination}>
      {currentPage > 1 && (
        <BootstrapPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          className={styles['pagination-item']}
        />
      )}
      {items}
      {currentPage < totalPages && (
        <BootstrapPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          className={styles['pagination-item']}
        />
      )}
    </BootstrapPagination>
  );
};

export default Pagination;
