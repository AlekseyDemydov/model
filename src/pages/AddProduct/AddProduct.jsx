import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddProduct.module.scss"; // Путь к файлу стилей
import config from '../../config';

const AddProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    height: "",
    weight: "",
    age: "",
    priceOne: 0,
    priceThree: 0,
    priceNight: 0,
    imageUrl: ""
  });

  const [isLoading, setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${config.baseURL}/girls/${id}`);
          const { data } = response;
          setProductData({
            name: data.name || "",
            height: data.height || 0,
            weight: data.weight || 0,
            age: data.age || 0,
            priceOne: data.priceOne || 0,
            priceThree: data.priceThree || 0,
            priceNight: data.priceNight || 0,
            imageUrl: data.imageUrl || ""
          });
        } catch (error) {
          console.error("Ошибка при получении данных модели:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setProductData((prevData) => ({ ...prevData, imageUrl: data.url }));
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (id) {
        await axios.put(`${config.baseURL}/girls/${id}`, productData);
      } else {
        await axios.post(`${config.baseURL}/girls`, productData);
      }
      navigate("/girls");
    } catch (error) {
      console.error("Ошибка при создании/обновлении модели:", error);
      alert("Ошибка при создании/обновлении модели");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addProductContainer}>
      <h2>{id ? "Редактировать модель" : "Добавить новую модель"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input type="text" name="name" value={productData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Рост:
          <input type="number" name="height" value={productData.height} onChange={handleChange} placeholder="Только число" />
        </label>
        <br />
        <label>
          Вес:
          <input type="number" name="weight" value={productData.weight} onChange={handleChange} />
        </label>
        <br />
        <label>
          Возраст:
          <input type="number" name="age" value={productData.age} onChange={handleChange} />
        </label>
        <br />
        <label>
          Цена за час:
          <input type="number" name="priceOne" value={productData.priceOne} onChange={handleChange} />
        </label>
        <br />
        <label>
          Цена за три часа:
          <input type="number" name="priceThree" value={productData.priceThree} onChange={handleChange} />
        </label>
        <br />
        <label>
          Цена за ночь:
          <input type="number" name="priceNight" value={productData.priceNight} onChange={handleChange} />
        </label>
        <br />
        
        <label style={{ display: 'none' }}>
          Изображение URL:
          <input type="text" name="imageUrl" value={productData.imageUrl} onChange={handleChange} />
        </label>
        <br />
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        <button type="button" onClick={() => inputFileRef.current.click()}>
          Загрузить изображение
        </button>
        <br />
        {productData.imageUrl && (
          <img
            crossOrigin="anonymous"
            src={`${config.baseURL}${productData.imageUrl}`}
            alt="Uploaded"
            className={styles.uploadedImage}
          />
        )}
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : id ? "Обновить модель" : "Добавить модель"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
