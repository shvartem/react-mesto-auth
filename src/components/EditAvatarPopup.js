import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const profileAvatarRef = React.createRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSetIsLoading(true);

    props.onUpdateAvatar({
      avatar: profileAvatarRef.current.value,
    });
  }

  React.useEffect(() => {
    profileAvatarRef.current.value = '';
  }, [profileAvatarRef, props.isOpen]);

  return (
    <PopupWithForm
      name="change-user-avatar"
      title="Обновить аватар"
      ariaLabel="Сохранить новый аватар"
      buttonText="Сохранить"
      buttonIsLoadingText="Сохранение"
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={profileAvatarRef}
        id="profile-avatar"
        name="profile_avatar"
        className="form__item form__item_name_change-avatar"
        placeholder="Ссылка на новый аватар"
        required
      />
      <span className="profile-avatar-error form__item-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
