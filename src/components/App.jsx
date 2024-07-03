import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import Main from 'pages/Main/Main';
import AddProduct from 'pages/AddProduct/AddProduct';
import ProductDetail from 'pages/ProductDetail/ProductDetail';
import AdminLogin from 'pages/AdminLogin/AdminLogin';
import { Contacts } from 'pages/Contacts/Contacts';
import Question from 'pages/Question/Question';
import Feedback from 'pages/Feedback/Feedback';
import Health from 'pages/Health/Health';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="health" element={<Health />} />
        <Route path="reviews" element={<Question />} />
        <Route path="address" element={<Contacts />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="girls/add" element={<AddProduct />} />
        <Route path="girls/:id" element={<ProductDetail />} />
        <Route path="girls/:id/edit" element={<AddProduct />} /> 
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
