import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const BadgePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>🎉 Welcome!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You're logged in — let's celebrate!</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Let’s go!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BadgePopup;