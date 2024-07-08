import styles from './Contacts.module.scss';

export const Contacts = () => {
  return (
    <>
      <div className={styles['health-container']}>
        <h1>Дорогие клиенты!</h1>

        <p>
          Рады сообщить вам, что офис нашего агентства находится в самом сердце
          Москва-сити, в прекрасной башне Федерации Восток.
        </p>
        <p>
          Здесь вы найдете не только удобную парковку, но и уютное пространство,
          где сможете ознакомиться с нашим каталогом и обсудить все вопросы,
          которые вас интересуют.
        </p>
        <p>
          Мы с нетерпением ждем вашего визита и готовы предоставить вам
          высочайший уровень сервиса!
        </p><iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.496203368007!2d37.53786350000001!3d55.74988200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bdc1a3c70b7%3A0xb088e2039fc10a96!2z0JTQtdC70L7QstC-0Lkg0YbQtdC90YLRgCDQkdCw0YjQvdGPINCk0LXQtNC10YDQsNGG0LjRjy3QktC-0YHRgtC-0Lo!5e0!3m2!1sru!2sua!4v1720430695680!5m2!1sru!2sua"
        width="600"
        height="450"
        title="Местоположение офиса"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </div>
      
    </>
  );
};
