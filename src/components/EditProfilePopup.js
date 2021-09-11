import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [userInfo, setUserInfo] = React.useState({
    username: '',
    job: '',
  });

  function handleChangeUserInfo(evt) {
    setUserInfo({
      ...userInfo,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSetIsLoading(true);

    props.onUpdateUser({
      name: userInfo.username,
      about: userInfo.job,
    });
  }

  React.useEffect(() => {
    setUserInfo({
      username: currentUser.name,
      job: currentUser.about,
    });
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редaктировать профиль"
      ariaLabel="Сохранить профиль"
      buttonText="Сохранить"
      buttonIsLoadingText="Сохранение"
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="username-input"
        name="username"
        className="form__item form__item_name_username"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={userInfo.username || ''}
        onChange={handleChangeUserInfo}
        required
      />
      <span className="username-input-error form__item-error"></span>
      <input
        type="text"
        id="job-input"
        name="job"
        className="form__item form__item_name_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={userInfo.job || ''}
        onChange={handleChangeUserInfo}
        required
      />
      <span className="job-input-error form__item-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
