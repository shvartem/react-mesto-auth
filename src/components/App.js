import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';

import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ESC_KEYCODE } from '../utils/constants';
import DeleteCardPopup from './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch } from 'react-router';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';

function App() {
  // стейты пользователя и карточек
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCurrentCards] = React.useState([]);

  // стейты логина
  const [loggedIn, setLoggedIn] = React.useState(false);

  // стейты открытия попапов и отправок форм
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] =
    React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] =
    React.useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupLoading, setDeleteCardPopupIsLoading] =
    React.useState(false);

  // стейт выбранной карточки
  const [selectedCard, setSelectedCard] = React.useState(null);

  // функция открытия попапа добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // функция открытия попапа смены аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // функция открытия попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // функция открытия попапа удаления карточка
  function handleDeleteClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard({ ...card });
  }

  // функция открытия попапа просмотра полного изображения карточки
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({ ...card });
  }

  // функция закрытия всех попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeleteCardPopupOpen(false);

    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  // функция закрытия закрытия попапа по клику на оверлей или кнопку закрытия
  function handleClosePopup(evt) {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close')
    ) {
      closeAllPopups();
    }
  }

  // функция обработки изменения иформации о пользователе
  function handleUpdateUser(userInfo) {
    api
      .patchUserInfoToServer(userInfo)
      .then((user) => {
        setCurrentUser(user);

        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsEditProfilePopupLoading(false);
      });
  }

  // функция обработки изменения аватара
  function handleUpdateAvatar(avatar) {
    api
      .patchUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);

        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsEditAvatarPopupLoading(false);
      });
  }

  // функция обработки добавления новой карточки
  function handleAddPlaceSubmit(card) {
    api
      .postNewCardToServer(card)
      .then((newCard) => {
        currentCards.pop();
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsAddPlacePopupLoading(false);
      });
  }

  // функция обработки добавления и удаления лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    isLiked
      ? api
          .deleteLikeCards(card._id)
          .then((newCard) => {
            setCurrentCards((cards) =>
              cards.map((card) => (card._id === newCard._id ? newCard : card))
            );
          })
          .catch(console.log)
      : api
          .putLikeCards(card._id)
          .then((newCard) => {
            setCurrentCards((cards) =>
              cards.map((card) => (card._id === newCard._id ? newCard : card))
            );
          })
          .catch(console.log);
  }

  // функция обработки удаления карточки
  function handleDeleteCard(card) {
    api
      .deleteCardOnServer(card._id)
      .then(() => {
        setCurrentCards(currentCards.filter((el) => el._id !== card._id));
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setDeleteCardPopupIsLoading(false);
      });
  }

  // эффект запроса и установки данных пользователя
  React.useEffect(() => {
    api
      .getUserInfoFromServer()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(console.log);
  }, []);

  // эффект запроса и установки всех карточек
  React.useEffect(() => {
    api
      .getInitialCardsFromServer()
      .then((cards) => {
        setCurrentCards(cards);
      })
      .catch(console.log);
  }, []);

  // эффект закрытия попапа по нажатию ESC
  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === ESC_KEYCODE) closeAllPopups();
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header />
            <Switch>
              {/* <Route path="/add-place">
                <AddPlacePopup
                  isLoading={isAddPlacePopupLoading}
                  onSetIsLoading={setIsAddPlacePopupLoading}
                  isOpen={isAddPlacePopupOpen}
                  onClose={handleClosePopup}
                  onAddPlace={handleAddPlaceSubmit}
                />
              </Route>

              <Route path="/edit-avatar">
                <EditAvatarPopup
                  isLoading={isEditAvatarPopupLoading}
                  onSetIsLoading={setIsEditAvatarPopupLoading}
                  isOpen={isEditAvatarPopupOpen}
                  onClose={handleClosePopup}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              </Route>

              <Route path="/delete-card">
                <DeleteCardPopup
                  isLoading={isDeleteCardPopupLoading}
                  onSetIsLoading={setDeleteCardPopupIsLoading}
                  isOpen={isDeleteCardPopupOpen}
                  onClose={handleClosePopup}
                  onDeleteCard={handleDeleteCard}
                  card={selectedCard}
                />
              </Route>

              <Route path="/edit-profile">
                <EditProfilePopup
                  isLoading={isEditProfilePopupLoading}
                  onSetIsLoading={setIsEditProfilePopupLoading}
                  isOpen={isEditProfilePopupOpen}
                  onClose={handleClosePopup}
                  onUpdateUser={handleUpdateUser}
                />
              </Route>

              <Route path="/image">
                <ImagePopup
                  isOpen={isImagePopupOpen}
                  card={selectedCard}
                  onClose={handleClosePopup}
                />
              </Route> */}

              <Route path="/sign-in">
                <Login />
              </Route>

              <Route path="/sign-up">
                <Register />
              </Route>

              <ProtectedRoute
                path="/"
                component={Main}
                loggedIn={loggedIn}
                cards={currentCards}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
              />

              <Footer />
            </Switch>

            {/* <Main
              cards={currentCards}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
            /> */}

            {/* <Footer /> */}

            <AddPlacePopup
              isLoading={isAddPlacePopupLoading}
              onSetIsLoading={setIsAddPlacePopupLoading}
              isOpen={isAddPlacePopupOpen}
              onClose={handleClosePopup}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isLoading={isEditAvatarPopupLoading}
              onSetIsLoading={setIsEditAvatarPopupLoading}
              isOpen={isEditAvatarPopupOpen}
              onClose={handleClosePopup}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <DeleteCardPopup
              isLoading={isDeleteCardPopupLoading}
              onSetIsLoading={setDeleteCardPopupIsLoading}
              isOpen={isDeleteCardPopupOpen}
              onClose={handleClosePopup}
              onDeleteCard={handleDeleteCard}
              card={selectedCard}
            />

            <EditProfilePopup
              isLoading={isEditProfilePopupLoading}
              onSetIsLoading={setIsEditProfilePopupLoading}
              isOpen={isEditProfilePopupOpen}
              onClose={handleClosePopup}
              onUpdateUser={handleUpdateUser}
            />

            <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={handleClosePopup}
            />

            <InfoToolTip onClose={handleClosePopup} />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
