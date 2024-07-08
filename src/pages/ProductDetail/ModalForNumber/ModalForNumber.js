
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function Example({ show, onHide }) {
    const handleClose = () => onHide();
  
    return (
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title>Ooops...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Контакты станут доступны после заказа
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default Example;