import React from 'react';
import successfulAuthImage from '../images/successful-auth.svg';
import failedAuthImage from '../images/failed-auth.svg';

function InfoToolTip(props) {
  const { name, isOpen, loggedIn, onClose } = props;

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={onClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть окно"
        ></button>
        <img
          src={loggedIn ? successfulAuthImage : failedAuthImage}
          alt=""
          className="popup__auth-image"
        />
        <p className="popup__auth-result">
          {loggedIn
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
}

export default InfoToolTip;
