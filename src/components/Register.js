import React, { useState, useEffect } from 'react';
import * as auth from '../utils/auth';

function Register(props) {
  const {
    isAuthPopupOpen, setIsAuthPopupOpen, successRegister, onRegister, setCurrentRoute, history,
  } = props;

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  function handleChangeRegisterData(evt) {
    const { name, value } = evt.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    auth.register(registerData)
      .then((data) => {
        setIsAuthPopupOpen(true);
        onRegister(true);

        setRegisterData({
          email: '',
          password: '',
        });
      })
      .catch((err) => {
        onRegister(false);
        setIsAuthPopupOpen(true);

        console.error(err);
      });
  }

  // эффект для перенаправления на страницу с авторизацией
  // после удачной регистрации и закрытия попапа InfoToolTip

  useEffect(() => {
    if (successRegister && !isAuthPopupOpen) history.push('/signin');
  }, [successRegister, isAuthPopupOpen, history]);

  useEffect(() => {
    setCurrentRoute('/signup');
  }, []);

  return (
    <div className="sign__container">
      <form action="/sign-up" className="form" onSubmit={handleSubmit}>
        <h3 className="form__title form__title_place_sign">Регистрация</h3>
        <fieldset className="form__input-container form__input-container">
          <input
            type="email"
            className="form__item form__item_place_sign"
            placeholder="Email"
            name="email"
            value={registerData.email || ''}
            onChange={handleChangeRegisterData}
          />

          <input
            type="password"
            className="form__item form__item_place_sign"
            placeholder="Пароль"
            name="password"
            value={registerData.password || ''}
            onChange={handleChangeRegisterData}
          />
        </fieldset>

        <button type="submit" className="form__submit form__button_place_sign">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__registred">
        Уже зарегистрированы?
        {' '}
        <a href="/sign-in" rel="noreferrer" className="sign__login-link">
          Войти
        </a>
      </p>
    </div>
  );
}

export default Register;
