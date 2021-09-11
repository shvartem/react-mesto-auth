function Register(props) {
  return (
    <div className="sign__container">
      <form action="/sign-up" className="form">
        <h3 className="form__title form__title_place_sign">Регистрация</h3>
        <fieldset className="form__input-container form__input-container">
          <input
            type="email"
            className="form__item form__item_place_sign"
            placeholder="Email"
          />

          <input
            type="password"
            className="form__item form__item_place_sign"
            placeholder="Пароль"
          />
        </fieldset>

        <button className="form__submit form__button_place_sign">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__registred">
        Уже зарегистрированы?{' '}
        <a href="/sign-in" rel="noreferrer" className="sign__login-link">
          Войти
        </a>
      </p>
    </div>
  );
}

export default Register;
