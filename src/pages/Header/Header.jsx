import React, {  useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import logo from './img/logo.png'
import './Header.css'
import s from './Header.module.scss'
import tgwhite from './img/tgwhite.png';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [tgManager, setTgManager] = useState('');

  const handleNavClick = () => setExpanded(false);

  const navLinkStyles = path => ({
    fontWeight: 'bold',
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/card/6694e9ad166628e0d24a261e`);
        const { data } = response;
        setTgManager(data.tgManager);
        
      } catch (error) {
        console.error("Ошибка при получении данных модели:", error);
      }
    };

    fetchData();

    
  }, []);

  const goToHomePage = () => {
    navigate('/?page=1');
    setExpanded(false); // закрываем меню навигации после перехода
  };
  const handleClickAdmin = () => {
    window.open(`${tgManager}`, '_blank');
  };


  return (
    <>
  
      <Navbar
        // fixed="top"
        collapseOnSelect
        expand="lg"
        variant="dark"
        expanded={expanded}
      >
        <Container>
          <Navbar.Brand className="fs-1 linkLogo" as={Link} to="/?page=1" onClick={goToHomePage}>
            <img src={logo} alt="logo" className={s.logo}/>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav activeKey={location.pathname}>
              <Nav.Link
                as={Link}
                to="/"
                onClick={handleNavClick}
                style={navLinkStyles('/')}
              >
                Главная
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/reviews"
                onClick={handleNavClick}
                style={navLinkStyles('/reviews')}
              >
                О нас
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/health"
                onClick={handleNavClick}
                style={navLinkStyles('/health')}
              >
                Health +
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/feedback"
                onClick={handleNavClick}
                style={navLinkStyles('/feedback')}
              >
                Отзывы
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/address"
                onClick={handleNavClick}
                style={navLinkStyles('/address')}
              >
                Адрес
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cashback"
                onClick={handleNavClick}
                style={navLinkStyles('/cashback')}
              >
                Возврат средств
              </Nav.Link>
              <div onClick={handleClickAdmin} className={s.tgbox}>
                <img
                  src={tgwhite}
                  alt="tg"
                  className={s.telegramLink}
                />
                Администрация                
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
