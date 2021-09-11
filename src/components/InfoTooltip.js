import React from 'react';
import successfulAuthImage from '../images/successful-auth.svg';
import failedAuthImage from '../images/failed-auth.svg';

function InfoToolTip(props) {
  const { onClose } = props;
  return (
    <div className={`popup popup_opened`} onMouseDown={onClose}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть окно"
        ></button>
        <img src={successfulAuthImage} alt="" className="popup__auth-image" />
        <p className="popup__auth-result">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}

export default InfoToolTip;
