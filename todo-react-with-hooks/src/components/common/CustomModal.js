import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'


const CustomModal = ({ isActive, children, title, handleClose }) => {


  return (
    <Modal show={isActive} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

CustomModal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default CustomModal;
