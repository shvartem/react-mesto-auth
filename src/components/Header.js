function Header(props) {
  return (
    <header className="header section page__header">
      <a
        href="https://google.com"
        target="_blank"
        className="header__logo"
        aria-label="Логотип &laquo;Место. Россия&raquo;"
        rel="noreferrer"
      ></a>
      {props.loggedIn ? (
        ''
      ) : (
        <a href="/sign-up" rel="noreferrer" className="header__register-link">
          Регистрация
        </a>
      )}
    </header>
  );
}

export default Header;
