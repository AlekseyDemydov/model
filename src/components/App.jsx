import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { VisibilityProvider } from './Layout/VisibilityContext';
import Main from 'pages/Main/Main';
import Feedback from 'pages/Feedback/Feedback';
import Health from 'pages/Health/Health';
import Question from 'pages/Question/Question';
import { Contacts } from 'pages/Contacts/Contacts';
import Payment from 'pages/Payment/Payment';
import Card from 'pages/Payment/Card';
import AdminLogin from 'pages/AdminLogin/AdminLogin';
import AddProduct from 'pages/AddProduct/AddProduct';
import ProductDetail from 'pages/ProductDetail/ProductDetail';
import { BackCash } from 'pages/BackCash/BackCash';

// Lazy load components
// const Main = lazy(() => import('pages/Main/Main'));
// const AddProduct = lazy(() => import('pages/AddProduct/AddProduct'));
// const ProductDetail = lazy(() => import('pages/ProductDetail/ProductDetail'));
// const AdminLogin = lazy(() => import('pages/AdminLogin/AdminLogin'));
// const Contacts = lazy(() => import('pages/Contacts/Contacts'));
// const Question = lazy(() => import('pages/Question/Question'));
// const Feedback = lazy(() => import('pages/Feedback/Feedback'));
// const Health = lazy(() => import('pages/Health/Health'));
// const Payment = lazy(() => import('pages/Payment/Payment'));
// const Card = lazy(() => import('pages/Payment/Card'));
// const BackCash = lazy(() => import('pages/BackCash/BackCash'));

const App = () => {
  return (
    <VisibilityProvider>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="health" element={<Health />} />
            <Route path="reviews" element={<Question />} />
            <Route path="address" element={<Contacts />} />
            <Route path="payment" element={<Payment />} />
            <Route path="card" element={<Card />} />
            <Route path="admin" element={<AdminLogin />} />
            <Route path="girls/add" element={<AddProduct />} />
            <Route path="girls/:id" element={<ProductDetail />} />
            <Route path="girls/:id/edit" element={<AddProduct />} /> 
            <Route path="cashback" element={<BackCash />} /> 
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      {/* </Suspense> */}
    </VisibilityProvider>
  );
};

export default App;
