/*    Переменные    */

// Переменные: объект с настройками селекторов

// const config = {
//   formSelector: ".form",
//   inputSelector: ".form__item",
//   submitButtonSelector: ".form__submit",
//   submitButtonTextCreating: "Создание...",
//   submitButtonTextSaving: "Сохранение...",
//   submitButtonTextDeleting: "Удаление...",
//   inactiveButtonClass: "form__submit_disabled",
//   inputErrorClass: "form__item_type_error",
//   errorClass: "form__item-error_active",
// };

// Переменные: код кнопки ESC

const ESC_KEYCODE = 'Escape';

// Переменные: редактирование профиля

// const profileName = document.querySelector(".profile__name");
// const profileJob = document.querySelector(".profile__job");

// const changeAvatar = document.querySelector(".profile__change-avatar");
// const userAvatar = changeAvatar.querySelector(".profile__avatar");
// const popupChangeAvatar = document.querySelector(
//   ".popup_type_change-user-avatar"
// );
// const formAvatarElement = popupChangeAvatar.querySelector(config.formSelector);

// const buttonEditProfile = document.querySelector(".profile__edit-button");

// const popupEditProfile = document.querySelector(".popup_type_edit-profile");
// const formProfileElement = popupEditProfile.querySelector(config.formSelector);
// const nameInput = formProfileElement.querySelector(".form__item_name_username");
// const jobInput = formProfileElement.querySelector(".form__item_name_job");

// Переменные: открытие формы добавления карточки

// const buttonAddCard = document.querySelector(".profile__add-button");
// const popupAddCard = document.querySelector(".popup_type_add-card");
// const formCardElement = popupAddCard.querySelector(config.formSelector);

// Переменные: токен и ID пользователя

const myToken = 'f2403b1e-b069-4c41-a72d-caa156ab74c7';
const myId = '553193e6af6a1a8f2737e6f2';
const baseApiUrl = 'https://nomoreparties.co/v1/cohort-26';

// Экспорт переменных

export {
  // config,
  ESC_KEYCODE,
  // profileName,
  // profileJob,
  // changeAvatar,
  // userAvatar,
  // formAvatarElement,
  // buttonEditProfile,
  // formProfileElement,
  // nameInput,
  // jobInput,
  // buttonAddCard,
  // formCardElement,
  myToken,
  myId,
  baseApiUrl,
};
