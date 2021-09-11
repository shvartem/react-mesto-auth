import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { name, link, likes, owner: cardOwner } = props.card;

  const isOwn = cardOwner._id === currentUser._id;
  const isLiked = likes.some((user) => user._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          type="button"
          className="card__delete"
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div
        className="card__image"
        style={{ backgroundImage: `url(${link})` }}
        onClick={handleClick}
      ></div>
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={`card__like ${isLiked ? 'card__like_active' : ''}`}
            aria-label="Поставить лайк!"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-count">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
