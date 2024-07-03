import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import styles from './Question.module.scss';

const Question = () => {
  return (
    <div className={styles['accordion-container']}>
      <h1>Часто задаваемые вопросы</h1>
      <Accordion data-bs-theme="dark">
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Если я стану постоянным клиентом агентства, какие преимущества у
            меня будут?
          </Accordion.Header>
          <Accordion.Body>
            Для наших постоянных клиентов, в агентстве действует гибкая система
            скидок, различные бонусы и эксклюзивные предложения. Статус
            постоянного клиента дается после 3 заказов любых услуг агентства.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Не хочу раскрывать свое имя, могу ли я остаться инкогнито?
          </Accordion.Header>
          <Accordion.Body>
            Всем клиентам, обратившимся в наше агентство, мы априори
            предоставляем 100% конфиденциальность личности. Так что вы можете не
            переживать об этом и всецело заняться подбором модели.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Могу ли я пригласить сразу нескольких моделей?
          </Accordion.Header>
          <Accordion.Body>
            Желание клиента - закон. Вы можете пригласить любое количество
            моделей, которые нужны для вашего мероприятия или другого важного
            повода.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Возврат оплаты</Accordion.Header>
          <Accordion.Body>
            Возврат оплаты (полной стоимости или предоплаты) возможен, если до
            начала встречи остается более суток. Возврат осуществляется тем же
            способом, каким была произведена оплата.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Как гарантировать безопасность встречи?
          </Accordion.Header>
          <Accordion.Body>
            Мы обеспечиваем конфиденциальность и безопасность встречи. Все наши
            модели проходят проверку на здоровье и не имеют проблем с законом.
            Мы также рекомендуем вам оставаться в безопасном месте и не сообщать
            личную информацию.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Question;
