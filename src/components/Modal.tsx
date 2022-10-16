import React from 'react';
import './Modal.css';

interface ModalProps {
  setIsOpen: (open: boolean) => void;
  img: string;
}

const Modal: React.FC<ModalProps> = ({ setIsOpen, img }) => {
  return (
    <>
      <div className={'darkBG'} onClick={() => setIsOpen(false)}>
        <div className={'centered'}>
          <div className={'modal'}>
            <img src={img} alt="cover" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
