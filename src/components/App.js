import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';

import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';

import api from '../utils/Api';
import { ESC_KEYCODE } from '../utils/constants';

import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();

  // стейты пользователя и карточек
  const [currentUser, setCurrentUser] = useState({});
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentCards, setCurrentCards] = useState([]);

  // стейты логина
  const [loggedIn, setLoggedIn] = useState(false);

  // стейты открытия попапов и отправок форм
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isDeleteCardPopupLoading, setDeleteCardPopupIsLoading] = useState(false);

  const [currentRoute, setCurrentRoute] = useState('');
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);

  // стейт выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null);

  function handleSignOut(evt) {
    evt.preventDefault();
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      history.push('/signin');

      setLoggedIn(false);
    }
  }

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

    setIsAuthPopupOpen(false);
  }

  // функция закрытия закрытия попапа по клику на оверлей или кнопку закрытия
  function handleClosePopup(evt) {
    if (
      evt.target.classList.contains('popup')
      || evt.target.classList.contains('popup__close')
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
      .catch(console.error)
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
      .catch(console.error)
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
      .catch(console.error)
      .finally(() => {
        setIsAddPlacePopupLoading(false);
      });
  }

  // функция обновления лайков в массиве карточек
  function updateLikes(cards, newCard) {
    return cards.map(
      (cardsItem) => (cardsItem._id === newCard._id
        ? newCard
        : cardsItem),
    );
  }

  // функция обработки добавления и удаления лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // eslint-disable-next-line no-unused-expressions
    isLiked
      ? api
        .deleteLikeCards(card._id)
        .then((newCard) => {
          setCurrentCards(
            (cards) => updateLikes(cards, newCard),
          );
        })
        .catch(console.error)
      : api
        .putLikeCards(card._id)
        .then((newCard) => {
          setCurrentCards(
            (cards) => updateLikes(cards, newCard),
          );
        })
        .catch(console.error);
  }

  // функция обработки удаления карточки
  function handleDeleteCard(card) {
    api
      .deleteCardOnServer(card._id)
      .then(() => {
        setCurrentCards(currentCards.filter((el) => el._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setDeleteCardPopupIsLoading(false);
      });
  }

  useEffect(() => {
    function handleTokenCheck() {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');

        auth.checkToken(token).then((data) => {
          if (data) {
            setCurrentEmail(data.data.email);
            setLoggedIn(true);
            history.push('/');
          }
        });
      }
    }

    handleTokenCheck();
  }, []);

  // эффект запроса и установки данных пользователя
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfoFromServer()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  // эффект запроса и установки всех карточек
  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCardsFromServer()
        .then((cards) => {
          setCurrentCards(cards);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  // эффект закрытия попапа по нажатию ESC
  useEffect(() => {
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
            <Header
              loggedIn={loggedIn}
              email={currentEmail}
              onSignOut={handleSignOut}
              currentRoute={currentRoute}
            />
            <Switch>
              <Route path="/sign-in">
                <Login
                  onLogin={setLoggedIn}
                  loggedIn={loggedIn}
                  setEmail={setCurrentEmail}
                  setCurrentRoute={setCurrentRoute}
                  history={history}
                />
              </Route>

              <Route path="/sign-up">
                <Register
                  setIsAuthPopupOpen={setIsAuthPopupOpen}
                  onRegister={setSuccessRegister}
                  setCurrentRoute={setCurrentRoute}
                  history={history}
                />
                <InfoToolTip
                  name="info-tool-tip"
                  isOpen={isAuthPopupOpen}
                  onClose={handleClosePopup}
                  onSuccessRegister={successRegister}
                />
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

            </Switch>

            {loggedIn && <Footer />}

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
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
