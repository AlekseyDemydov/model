import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
    anal: 0,
    domination: 0,
    bondage: 0,
    massage: 0,
    gmg: 0,
    svyazivanie: 0,
    mgm: 0,
    rolePlaying: 0,
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

            anal: data.anal || 0,
            domination: data.domination || 0,
            bondage: data.bondage || 0,
            massage: data.massage || 0,
            gmg: data.gmg || 0,
            svyazivanie: data.svyazivanie || 0,
            mgm: data.mgm || 0,
            rolePlaying: data.rolePlaying || 0,


            tgAdmin: data.tgAdmin || "",
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
      const files = event.target.files; // Получаем все выбранные файлы
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      // const { data } = await axios.post("http://localhost:4444/upload", formData);
      const { data } = await axios.post(`${config.baseURL}/upload`, formData);
      // data.urls содержит массив всех загруженных ссылок
      setProductData((prevData) => ({ ...prevData, imageUrl: data.urls }));
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файлов");
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
          tgAdmin:
          <input type="text" name="tgAdmin" value={productData.tgAdmin} onChange={handleChange} placeholder="юзернейм" />
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



        <label>
        anal:
          <input type="number" name="anal" value={productData.anal} onChange={handleChange} />
        </label>
        <label>
        domination:
          <input type="number" name="domination" value={productData.domination} onChange={handleChange} />
        </label>
        <label>
        bondage:
          <input type="number" name="bondage" value={productData.bondage} onChange={handleChange} />
        </label>
        <label>
        massage:
          <input type="number" name="massage" value={productData.massage} onChange={handleChange} />
        </label>
        <label>
        gmg:
          <input type="number" name="gmg" value={productData.gmg} onChange={handleChange} />
        </label>
        <label>
        svyazivanie:
          <input type="number" name="svyazivanie" value={productData.svyazivanie} onChange={handleChange} />
        </label>
        <label>
        mgm:
          <input type="number" name="mgm" value={productData.mgm} onChange={handleChange} />
        </label>
        <label>
        rolePlaying:
          <input type="number" name="rolePlaying" value={productData.rolePlaying} onChange={handleChange} />
        </label>
        <br />

        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          multiple // Поддержка множественной загрузки файлов
        />
        <br />
        {/* {productData.imageUrl && (
          <div>
            {productData.imageUrl.map((url, index) => (
              <img
               crossOrigin="anonymous"
                key={index}
                src={`${config.baseURL}${productData.imageUrl}`}
                alt={`Uploaded ${index}`}
                className={styles.uploadedImage}
              />
            ))}
          </div>
        )} */}
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : id ? "Обновить модель" : "Добавить модель"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
