import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWrapper } from './Modal.styled';

const Modal = ({ onCloseModal, src, name }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={closeByBackdrop}>
      <ModalWrapper>
        <img src={src} alt={name} />
      </ModalWrapper>
    </Overlay>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Modal;
